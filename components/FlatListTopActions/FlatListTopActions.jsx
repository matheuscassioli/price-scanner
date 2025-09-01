import React, { useContext } from 'react'
import { TasksContext } from '../../contexts/TasksContext/TasksContext'
import { StyleSheet, Text } from 'react-native'

const FlatListTopActions = () => {
    const { sumTasksValues } = useContext(TasksContext)
    return (
        <Text style={styles.totalContainer}>TOTAL: &nbsp;&nbsp;&nbsp;
            <Text style={styles.totalContainerValue}>
                {sumTasksValues.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
        </Text>
    )
}

export default FlatListTopActions

const styles = StyleSheet.create({
    totalContainer: {
        color: 'white',
        paddingHorizontal: 40,
        paddingTop: 20,
        fontWeight: 700,
    },
    totalContainerValue: {
        color: 'green',
        fontSize: 16
    }
})