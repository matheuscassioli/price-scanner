import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext/AuthContext"
import { Pressable, StyleSheet, View, FlatList } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GradientBackground } from "./GradientBackground";
import { colors } from "../theme/colors";
import { Text } from "react-native";

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
    return <GradientBackground style={{ backgroundColor: "yellow" }}>
        <View style={{ backgroundColor: "yellow" }}>
            <ExitButton />

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
    tasksContainer: {
        height: 300,
        width: '100%',
        backgroundColor: 'red',
        zIndex: -1
    },
});

const ExitButton = () => {
    const { loginOrLogoutUser } = useContext(AuthContext)

    return <Pressable
        style={styles.exitButton}
        onPress={() => loginOrLogoutUser(false)}>
        <Icon name="logout" size={24} color={colors.white} />
    </Pressable>
}

const Item = ({ taskContent }) => (
    <View>
        <Text >{taskContent}</Text>
    </View>
);