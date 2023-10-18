import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react'
import apiDeputados from '../../services/api';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { ScrollView } from 'react-native';



const Deputados = ({ navigation }) => {
  const [deputados, setDeputados] = useState([])
  useFocusEffect(
    React.useCallback(() => {
      apiDeputados.get('/deputados').then(resultado => {
        setDeputados(resultado.data.dados);
      })
    }, [])
  );
  return (
    <>
    <ScrollView>
      {deputados.map(item => (
        <Card mode="outlined" style={{
          margin: 8,
          borderRadius: 10,
          backgroundColor: "green"
        }}>
          <Card.Title style={{
            margin: 10
          }}
            title={item.nome}
            subtitle={item.siglaUf}
            left={() => <Avatar.Image size={45} source={{ uri: item.urlFoto }} />}
            right={(props) => <IconButton {...props} icon="chevron-right-circle-outline" onPress={() => navigation.push('Detalhes-deputados', { id: item.id })} />}
          />
        </Card>
      ))}
      </ScrollView>
    </>
  )
}

export default Deputados