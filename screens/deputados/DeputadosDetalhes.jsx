import React, { useEffect, useState } from 'react'
import { Card, Text, DataTable, Button, TextInput, Avatar } from 'react-native-paper'
import apiDeputados from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import email from 'react-native-email'
import { Formik } from 'formik';
const DeputadosDetalhes = ({ navigation, route }) => {
  const [deputados, setDeputados] = useState({})
  const [despesas, setDespesas] = useState([])
  const [orgaos, setOrgaos] = useState([])
  const emailDep = route.params?.email || ""
  const foto = route.params?.foto || ""

  handleEmail = (dados) => {
    console.log(dados);
    const to = [emailDep] // string or array of email addresses
    email(to, {
      subject: dados.assunto,
      body: dados.mensagem,
      checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
    }).catch(console.error)
  }

  useEffect(() => {
    const id = route.params.id
    apiDeputados.get(`/deputados/${id}`).then(resultado => {
      setDeputados(resultado.data.dados)
    })
    apiDeputados.get(`/deputados/${id}/despesas?itens=5`).then(resultado => {
      setDespesas(resultado.data.dados)
    })
    apiDeputados.get(`/deputados/${id}/orgaos?itens=5`).then(resultado => {
      setOrgaos(resultado.data.dados)
    })
  }, [])


  return (
    <>
      <ScrollView style={{ margin: 10 }}>
        <View>
          <Card mode='outlined' style={{ margin: 10 }}>
            <Card.Content >
              <Card.Cover
                source={{ uri: foto }} style={{ height: 400 }}
              />
              <Text
                variant="titleLarge" style={{
                  marginTop: 5 ,
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#74c474'
                }}
              >{deputados.nomeCivil}</Text>
              <Text
                variant="titleLarge" style={{
                  marginTop: 1,
                  fontSize: 14,
                  color: '#74c474'
                }}
              >{deputados.municipioNascimento}</Text>
            </Card.Content>
          </Card>
        </View>
        <Card mode='outlined' style={{ margin: 10 }}>
          <Card.Content>
            <Text style={{ fontSize: 15 }}> Enviar email para: {emailDep} </Text>
            <Formik
              initialValues={{ assunto: '', mensagem: `` }}
              onSubmit={values => handleEmail(values)}
            >
              {({ values, handleChange, handleSubmit, }) => (
                <View>
                  <TextInput style={{
                    marginTop: 5
                  }}
                    label="Assunto"
                    mode='outlined'
                    value={values.assunto}
                    onChangeText={handleChange("assunto")}
                  />
                  <TextInput style={{
                    marginTop: 5
                  }}
                    label="Mensagem"
                    mode='outlined'
                    value={values.mensagem}
                    onChangeText={handleChange("mensagem")}
                  />
                  <Button style={{ margin: 5 }} mode="contained" buttonColor='#198754' onPress={handleSubmit}> Enviar Email </Button>
                </View>
              )}
            </Formik>
          </Card.Content>
        </Card>
        <DataTable style={{ margin: 5 }}>
          <Text variant="titleLarge"> Despesas </Text>
          <DataTable.Header>
            <DataTable.Title>Ano</DataTable.Title>
            <DataTable.Title>Tipo</DataTable.Title>
            <DataTable.Title>Valor</DataTable.Title>
          </DataTable.Header>

          {despesas.map((d, i) => (
            <DataTable.Row key={i}>
              <DataTable.Cell>{d.ano}</DataTable.Cell>
              <DataTable.Cell>{d.tipoDespesa}</DataTable.Cell>
              <DataTable.Cell>{d.valorDocumento.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>

        <DataTable style={{ margin: 5 }}>
          <Text variant="titleLarge"> Orgãos </Text>
          <DataTable.Header>
            <DataTable.Title>Orgão</DataTable.Title>
            <DataTable.Title>Sigla</DataTable.Title>
            <DataTable.Title>Título</DataTable.Title>
          </DataTable.Header>

          {orgaos.map((d, i) => (
            <DataTable.Row key={i}>
              <DataTable.Cell>{d.nomeOrgao}</DataTable.Cell>
              <DataTable.Cell>{d.siglaOrgao}</DataTable.Cell>
              <DataTable.Cell>{d.titulo}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </>
  )
}

export default DeputadosDetalhes