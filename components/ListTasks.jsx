import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext/AuthContext"
import { Pressable, StyleSheet, View, FlatList, TextInput } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GradientBackground } from "./GradientBackground";
import { colors } from "../theme/colors";
import { Text } from "react-native";
import { globalStyles } from "../theme/globals";

const tasks = [
    {
        taskId: 1,
        taskContent: 'comprar ovos'
    },
    {
        taskId: 2,
        taskContent: 'comprar pães'
    },
    {
        taskId: 3,
        taskContent: 'comprar leite'
    }
]

export const ListTasks = () => {

    const [text, setText] = useState('')

    const onChangeText = (e) => {
        console.log(e)
        setText(e)
    }

    const addTask = () => {
        alert(text, 'text')
    }

    return <GradientBackground>
        <View >
            <ExitButton />

            <View style={styles.addTaskContainer}>
                <View style={styles.inputWrapper}>
                    <Text style={[globalStyles.inputContainerLabel]}>Adicione uma tarefa</Text>
                    <TextInput
                        placeholder="Digite a tarefa"
                        style={globalStyles.input}
                        onChangeText={onChangeText}
                        value={text}
                    />
                </View>

                <Pressable style={styles.addButton} onPress={addTask}>
                    <Icon name="plus" size={24} color="white" />
                </Pressable>
            </View>


            <View style={styles.tasksContainer}>
                <FlatList
                    data={tasks}
                    renderItem={({ item }) => <Item taskContent={item.taskContent} />}
                    keyExtractor={(item) => item.taskId.toString()} />
            </View>
        </View>
    </GradientBackground>
}

const styles = StyleSheet.create({
    exitButton: {
        position: 'absolute',
        right: -8,
        top: -8,
    },
    addTaskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    inputWrapper: {
        flex: 1,
        marginRight: 0,
        borderRadius: 8,
        padding: 10,
        elevation: 2, // sombra no Android
        shadowColor: '#000', // sombra no iOS
        shadowOffset: { width: 0, height: 1 },
        background: "red",
        marginLeft: -20
    },
    addButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
});

const Item = ({ taskContent }) => (
    <View>
        <Text >{taskContent}</Text>
    </View>
);

const ExitButton = () => {
    const { loginOrLogoutUser } = useContext(AuthContext)

    return <Pressable
        style={styles.exitButton}
        onPress={() => loginOrLogoutUser(false)}>
        <Icon name="logout" size={24} color={colors.white} />
    </Pressable>
}

