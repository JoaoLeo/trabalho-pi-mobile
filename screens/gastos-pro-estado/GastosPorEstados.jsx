import React, { useEffect, useState } from 'react'
import apiDeputados from '../../services/api';
import { Avatar, Button, Card, Divider, IconButton, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import apiLocalidades from '../../services/apiLocalidades';
import { ScrollView, View } from 'react-native';

const GastosPorEstados = ({ navigation }) => {

  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [alert, setAlert] = useState(false);
  const [top10, setTop10] = useState([])
  const [ufs, setUfs] = useState([]);
  const [mes1, setMes1] = useState("")
  const [ano1, setAno1] = useState("")
  const [uf, setUf] = useState("")
  const [error, setError] = useState(false)
  const [msgErro, setMsgErro] = useState("")
  const [data, setData] = useState(false)
  const [carregando, setCarregando] = useState(false)

  const options = [
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
  ]
  const meses = [
    { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' },
    { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '7', label: '7' }, { value: '8', label: '8' },
    { value: '9', label: '9' }, { value: '10', label: '10' }, { value: '11', label: '11' }, { value: '12', label: '12' },

  ]
  useEffect(() => {
    apiLocalidades.get('localidades/estados?orderBy=nome').then(res => {
      setUfs(res.data)
    })
  }, [])
  async function gastosEstados() {
    setCarregando(true);
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth(); // Retorna um valor entre 0 e 11, onde 0 representa janeiro e 11 representa dezembro
    const anoAtual = dataAtual.getFullYear(); // Retorna o ano com quatro dígitos
    if (!uf) {
      console.log('erro 1');
      setEstadoSelecionado('');
      setAlert(true);
      return;
    }
    if ((ano1 == anoAtual) && (mes1 > mesAtual + 1)) {
      console.log('erro 2');
      setEstadoSelecionado('')
      setAlert(true)
      return;
    }
    const despesasPorDeputado = {};
    try {
      const responseDeputados = await apiDeputados.get(`/deputados?siglaUf=${uf}&itens=10`);
      const lista = responseDeputados.data.dados;

      for (const deputado of lista) {
        const idDeputado = deputado.id;

        const responseDespesas = await apiDeputados.get(`/deputados/${idDeputado}/despesas`, {
          params: {
            ano: ano1,
            mes: mes1,
          },
        });
        const despesasDeputado = responseDespesas.data.dados;
        despesasPorDeputado[idDeputado] = despesasDeputado.reduce((total, despesa) => total + despesa.valorLiquido, 0);
      }

      const top10DeputadosIds = Object.keys(despesasPorDeputado)
        .sort((a, b) => despesasPorDeputado[b] - despesasPorDeputado[a])
        .slice(0, 10);

      const top10Deputados = top10DeputadosIds.map(idDeputado => lista.find(deputado => deputado.id === parseInt(idDeputado)));
      setTop10(top10Deputados)
      setAlert(false);
    } catch (error) {
      console.error('Erro ao obter dados dos deputados:', error);
    }
    setCarregando(false);
  }
  return (
    <>
      <View style={{ margin: 10 }}>
        <ScrollView>
          <Text variant="titleMedium"> Selecione um estado, um mês e um ano para obter o ranking dos deputados que tiveram os maiores gastos no período</Text>
          <Picker
            selectedValue={mes1}
            onValueChange={(itemValue) => setMes1(itemValue)}>

            <Picker.Item label="Selecione o mês 1" value="" />

            {meses.map(m => (
              <Picker.Item key={m.label} label={m.label} value={m.value} />
            ))}
          </Picker>
          <Divider />
          <Picker
            selectedValue={ano1}
            onValueChange={(itemValue) => setAno1(itemValue)}>

            <Picker.Item label="Selecione o ano 1" value="" />

            {options.map(o => (
              <Picker.Item key={o.label} label={o.label} value={o.value} />
            ))}
          </Picker>
          <Divider />
          <Picker
            selectedValue={uf}
            onValueChange={(itemValue) => setUf(itemValue)}>

            <Picker.Item label="Selecione o estado" value="" />

            {ufs.map(uf => (
              <Picker.Item label={uf.sigla} key={uf.id} value={uf.sigla} />
            ))}
          </Picker>
          <Button buttonColor="#198754" mode="contained" onPress={gastosEstados} > Enviar </Button>
          {  carregando &&
    <Text variant="titleMedium" style={{color: 'yellow'}}> Carregando os dados por favor aguarde </Text>}

    {
            !alert && <Text> Deputados do {uf} que mais gastaram em {mes1}/{ano1} </Text> }
          {
            !alert &&
            top10.map((d, i) => (
              <>
                <ScrollView key={i}>
                  <Card
                    mode="outlined"
                    style={{
                      margin: 5,
                      borderRadius: 10,
                      borderColor: "#198754"
                    }} >
                    <Card.Title
                      key={d.id}
                      title={d.nome}
                      subtitle={`Partido: ${d.siglaPartido}`}
                      titleStyle={{ fontWeight: 'bold', paddingLeft: 30 }}
                      subtitleStyle={{ fontWeight: 'bold', paddingLeft: 30 }}
                      left={() => <Avatar.Image size={70} source={{ uri: d.urlFoto }} />}
                      leftStyle={{
                        marginLeft: -10, color: 'red',
                        borderColor: "#198754"
                      }}
   />
                  </Card>
                </ScrollView>
              </>
            ))
          }

          {
            alert &&
            <>
              <Text variant="titleMedium" style={{ color: 'red' }}> Aviso!</Text>
              <Divider />
              <Text variant="titleSmall" style={{ color: 'red' }}>
                Selecione dados válidos! (O mês e ano não podem exceder a data atual e o estado deve estar selecionado)
              </Text>
            </>
          }
        </ScrollView>
      </View>
    </>
  )
}

export default GastosPorEstados