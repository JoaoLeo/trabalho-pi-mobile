import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import apiDeputados from '../../services/api';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { ScrollView } from 'react-native';

const Deputados = ({ navigation }) => {
  const [deputados, setDeputados] = useState([])
  useEffect(()=> {
    apiDeputados.get(`/deputados`).then(resultado => {
     setDeputados(resultado.data.dados)
    })
    },[])
  return (
    <>
    <ScrollView>
      {deputados.map(item => (
        <Card 
        mode="outlined" 
        key={item.id}
        style={{
          margin: 8,
          borderRadius: 10,
          borderColor:"#198754"
        }}>
          <Card.Title style={{
            margin: 10
          }}
            title={item.nome}
            subtitle={item.siglaUf}
            titleStyle={{ fontWeight: 'bold', paddingLeft: 30}}
            subtitleStyle={{ fontWeight: 'bold', paddingLeft: 30}}
            left={() => <Avatar.Image size={70} source={{ uri: item.urlFoto }} />}
            leftStyle={{marginLeft: -10,color: 'red',
              borderColor:"#198754"}}
            right={(props) => <IconButton {...props} icon="chevron-right-circle-outline" onPress={() => navigation.push('Detalhes-deputados', { id: item.id })} />}
          />
        </Card>
      ))}
      </ScrollView>
    </>
  )
}

export default Deputados