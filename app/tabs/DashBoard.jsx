import React, { useEffect, useState } from 'react';
import { View, Text } from "react-native";
import { colors } from "../../theme/colors";
import { StyleSheet } from "react-native";
import AnimatedNumbers from 'react-native-animated-numbers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashBoard() {

    const [allValuesAnimated, setAllValuesAnimated] = useState({
        totalValue: '',
        totalTasks: '',
    });

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const captureTasksStorage = await AsyncStorage.getItem('@listTaks');

            if (captureTasksStorage) {
                const Tasks = JSON.parse(captureTasksStorage);

                const sumTasksValues = Tasks.reduce((acc, item) => {
                    const val = Number(item.value.replace(',', '.'));
                    if (isNaN(val)) return acc;
                    return acc + val;
                }, 0);

                setTimeout(() => {
                    setAllValuesAnimated({
                        totalValue: Number(sumTasksValues.toFixed(2)),
                        totalTasks: Tasks.length,
                    });
                }, 300);
            }
        } catch (e) {
            console.error('Erro ao carregar tarefas:', e);
        }
    };

    return <View style={styles.dashBoardContainer}>
        <View style={styles.row}>
            <View style={styles.dashBoardItem}>
                <Text style={styles.dashBoardItemTitle}>Tarefas</Text>
                <View style={styles.dashBoardItemNumber}>
                    <AnimatedNumbers
                        includeComma
                        animateToNumber={allValuesAnimated['totalTasks']}
                        fontStyle={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: colors.white,
                            textAlign: 'right',
                        }}
                        animationDuration={1500} />
                </View>
            </View>

            <View style={styles.dashBoardItem}>
                <Text style={styles.dashBoardItemTitle}>Valor total</Text>
                <View style={styles.dashBoardItemNumber}>
                    <AnimatedNumbers
                        precision={2}
                        animateToNumber={allValuesAnimated.totalValue}
                        fontStyle={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: colors.white,
                            textAlign: 'right',
                        }}
                        animationDuration={1500}
                        formatValue={(n) => {
                            if (isNaN(n)) return 'R$ 0,00';
                            return new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }).format(n);
                        }}
                    />
                </View>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    dashBoardContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: colors.background,
        gap: 10,

    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    dashBoardItem: {
        flex: 1,
        backgroundColor: 'gray',
        padding: 10,
        gap: 30,
        borderRadius: 4,
        shadowColor: colors.white,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    dashBoardItemTitle: {
        color: colors.white,
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    dashBoardItemNumber: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        display: 'flex',
        alignItems: "flex-end",
    },
});