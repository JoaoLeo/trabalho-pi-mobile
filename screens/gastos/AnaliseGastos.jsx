import React, { useEffect, useState } from 'react'
import apiLocalidades from '../../services/apiLocalidades';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import { View, Alert, ScrollView } from 'react-native';
import { Divider, Button, Text, DataTable } from 'react-native-paper';
import apiDeputados from '../../services/api';

const AnaliseGastos = () => {
  const options = [
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
  ]
  const meses = [
      {value:'1', label: '1'}, {value:'2', label: '2'}, {value:'3', label: '3'}, {value:'4', label: '4'},
      {value:'5', label: '5'}, {value:'6', label: '6'}, {value:'7', label: '7'}, {value:'8', label: '8'},
      {value:'9', label: '9'}, {value:'10', label: '10'}, {value:'11', label: '11'}, {value:'12', label: '12'},
    
  ]
  const [ufs, setUfs] = useState([]);
  const [mes1, setMes1] = useState("")
  const [mes2, setMes2] = useState("")
  const [ano1, setAno1] = useState("")
  const [ano2, setAno2] = useState("")
  const [uf, setUf] = useState("")
  const [error, setError] = useState(false)
  const [msgErro, setMsgErro] = useState("")
  const [data, setData] = useState(false)
  const [valorTotalMes1Ano1, setValorTotalMes1Ano1] = useState(0)
  const [valorTotalMes2Ano2, setValorTotalMes2Ano2] = useState(0)

   useEffect(() =>{
    apiLocalidades.get('localidades/estados?orderBy=nome').then(res =>{
      setUfs(res.data)
    })
  },[])

  function calculaAno(lista,mes,ano,qualAno){
    let aux = 0
    console.log(lista, mes, ano, qualAno);
  
    lista.forEach(l =>{     
      apiDeputados.get(`/deputados/${l.id}/despesas?mes=${mes}&ano=${ano}`).then(res =>{
       res.data.dados.forEach(d =>{
          aux += d.valorLiquido
       })
       if(qualAno)
          setValorTotalMes1Ano1(aux)
        else
        setValorTotalMes2Ano2(aux)
      })
    })
    
  }

  function criarAnaliseDeDados(){
    console.log(mes1, ano1, mes2, ano2, uf);
    const lista = []
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth(); // Retorna um valor entre 0 e 11, onde 0 representa janeiro e 11 representa dezembro
    const anoAtual = dataAtual.getFullYear(); // Retorna o ano com quatro dígitos

    if((ano1 == anoAtual || ano2 == anoAtual) && (mes1 >= mesAtual + 1|| mes2 >= mesAtual + 1)){
      setError(true)
      setMsgErro("Data inválida")
      setData(false)
      return;
    }
    apiDeputados.get("/deputados?&itens=5&siglaUf="+ uf).then(async res =>{  
      const lista = res.data.dados        
      setData(true)
        await calculaAno(lista, mes1, ano1,true);
        await calculaAno(lista, mes2, ano2,false);
      });     
   }
  return (
    <>

   <View style={{margin: 10}}>
   <ScrollView> 

   <Text variant="titleMedium"> Selecione abaixo um estado e duas datas para analisar os gastos totais desse estado nas datas inseridas e a diferença entre eles</Text>
  <Picker
   selectedValue={mes1}
  onValueChange={(itemValue) => setMes1(itemValue)}>
  
  <Picker.Item label="Selecione o mês 1" value="" />

  {meses.map(m =>(
    <Picker.Item key={m.label} label={m.label} value={m.value} />
      ))}
    </Picker>
    <Divider />
    <Picker
    selectedValue={ano1}
    onValueChange={(itemValue) => setAno1(itemValue)}>
  
  <Picker.Item label="Selecione o ano 1" value="" />

  {options.map(o =>(
    <Picker.Item key={o.label} label={o.label} value={o.value} />
      ))}
    </Picker>

    <Picker
    selectedValue={mes2}
  onValueChange={(itemValue) => setMes2(itemValue)}>
  
  <Picker.Item label="Selecione o mês 2" value="" />

  {meses.map(m =>(
    <Picker.Item key={m.label} label={m.label} value={m.value} />
      ))}
    </Picker>
    <Divider />
    <Picker
    selectedValue={ano2}
    onValueChange={(itemValue) => setAno2(itemValue)}>
  
  <Picker.Item label="Selecione o ano 2" value="" />

  {options.map(o =>(
    <Picker.Item key={o.label} label={o.label} value={o.value} />
      ))}
    </Picker>
<Divider/>
<Picker
 selectedValue={uf}
  onValueChange={(itemValue) => setUf(itemValue)}>
  
  <Picker.Item label="Selecione o estado" value="" />

  {ufs.map(uf =>(
    <Picker.Item label={uf.sigla} key={uf.id} value={uf.sigla} />
      ))}
    </Picker>
    <Button buttonColor="#198754"  mode="contained" onPress={criarAnaliseDeDados} > Enviar </Button>



   { error &&
    <Text variant="titleMedium" style={{color: 'red'}}> { msgErro}</Text>}

    { data && 

    
      <DataTable style={{backgroundColor: 'white'}}>
      <DataTable.Header>
        <DataTable.Title><Text style={{fontWeight: 'bold'}}> Gasto total em {mes1}/{ano1} no estado do {uf.toUpperCase()}</Text></DataTable.Title>
        <DataTable.Title><Text style={{fontWeight: 'bold'}}>Gasto total em {mes2}/{ano2} no estado do {uf.toUpperCase()}</Text></DataTable.Title>
        <DataTable.Title><Text style={{fontWeight: 'bold'}}>Diferença</Text></DataTable.Title>
      </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell> 
          <Text style={{fontWeight: 'bold'}}>
            {valorTotalMes1Ano1.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })}
        </Text>
        </DataTable.Cell>
        
          <DataTable.Cell>
          <Text style={{fontWeight: 'bold'}}>
            {valorTotalMes2Ano2.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })}
        </Text>
        </DataTable.Cell>
          <DataTable.Cell >
          <Text style={{fontWeight: 'bold'}}>
            {(valorTotalMes1Ano1 - valorTotalMes2Ano2).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })}
        </Text>
        </DataTable.Cell>
        </DataTable.Row>
    </DataTable>
    }
    </ScrollView>
      </View>

    </>
  )
}

export default AnaliseGastos