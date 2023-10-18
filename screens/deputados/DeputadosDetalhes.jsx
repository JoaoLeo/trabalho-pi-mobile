import React, { useState } from 'react'
import { Card, Text } from 'react-native-paper'
import apiDeputados from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native';

const DeputadosDetalhes = ({ navigation, route }) => {
    const [deputados, setDeputados] = useState({})
    useFocusEffect(
        React.useCallback(() => {
            const id = route.params.id
            apiDeputados.get(`/deputados/${id}`).then(resultado => {
                setDeputados(resultado.data.dados);
            })
        }, [])
    );
    return (
        <>
        <ScrollView>
            <Card mode="outlined"
                style={{ margin: 10 }}
            >
                <Card.Cover source={{ uri: deputados.urlFoto }} style={{ height: 350 }} />
                <Card.Content>
                    <Text variant="titleLarge" style={{
                        marginBottom: 5,
                        fontSize: 13
                    }}>
                    </Text>
                    <Text variant="bodyMedium" style={{ fontSize: 20 }}><strong>{deputados.nomeCivil}</strong></Text> <br></br>
                </Card.Content>
                </Card>
            </ScrollView>
        </>
    )
}

export default DeputadosDetalhes