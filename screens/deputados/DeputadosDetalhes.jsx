import React, { useEffect, useState } from 'react'
import { Card, Text } from 'react-native-paper'
import apiDeputados from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';

const DeputadosDetalhes = ({ navigation, route }) => {
    const [deputados, setDeputados] = useState({})
    
    useEffect(()=> {
        const id = route.params.id
        apiDeputados.get(`/deputados/${id}`).then(resultado => {
         setDeputados(resultado.data.dados)
        })
        },[])
        

    return (
        <>
        <ScrollView>
            <View> 
            <Card mode="outlined"
                style={{ margin: 10 }}
            >
                <Card.Cover source={{ uri: deputados.ultimoStatus.urlFoto }} style={{ height: 350 }} />
                <Card.Content>
                    <Text variant="titleLarge" style={{
                        marginBottom: 5,
                        fontSize: 13
                    }}>
                    </Text>
                    <Text variant="bodyMedium" style={{ fontSize: 20 }}><strong>{deputados.nomeCivil}</strong></Text> <br></br>
                </Card.Content>
                </Card>
                </View>
            </ScrollView>           
        </>
    )
}

export default DeputadosDetalhes