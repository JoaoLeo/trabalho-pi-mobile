import React, { useEffect, useState } from 'react'
import { Card, Text } from 'react-native-paper'
import apiDeputados from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import email from 'react-native-email'

const DeputadosDetalhes = ({ navigation, route }) => {
    const [deputados, setDeputados] = useState({})
    
    handleEmail = (emailDeputado, assunto, msg) => {
        const to = [emailDeputado] // string or array of email addresses
        email(to, {
            subject: assunto,
            body: msg,
            checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
        }).catch(console.error)
    }

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
               
                <Card.Content>
                    <Text variant="titleLarge" style={{
                        marginBottom: 5,
                        fontSize: 13
                    }}>
                    </Text>
                    <Text variant="bodyMedium" style={{ fontSize: 20 }}>{deputados.nomeCivil}</Text> 
                </Card.Content>
                </Card>
                </View>
            </ScrollView>           
        </>
    )
}

export default DeputadosDetalhes