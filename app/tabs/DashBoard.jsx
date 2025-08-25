import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from "react-native";
import { colors } from "../../theme/colors";
import { StyleSheet } from "react-native";
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import CustomAnimatedNumbers from '../../components/CustomAnimatedNumbers/CustomAnimatedNumbers'
import AnimatedNumbers from 'react-native-animated-numbers';

export default function DashBoard() {
    const { tasks } = useContext(TasksContext)

    const [allValuesAnimated, setAllValuesAnimated] = useState({
        totalValue: '0',
        totalTasks: '0',
    });

    useEffect(() => {
        loadTasks()
    }, [tasks]);

    const loadTasks = () => {
        const sumTasksValues = tasks.reduce((acc, item) => {
            const valueStr = String(item?.value);
            const val = Number(valueStr.replace(',', '.'));
            if (isNaN(val)) return acc;
            return acc + val;
        }, 0);

        setTimeout(() => {
            setAllValuesAnimated({
                totalValue: Number(sumTasksValues.toFixed(2)),
                totalTasks: tasks.length,
            });
        }, 300);
    }

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
                    <CustomAnimatedNumbers
                        value={allValuesAnimated.totalValue}
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: colors.white,
                            textAlign: 'right',
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