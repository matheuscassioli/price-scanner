import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { colors } from "../../theme/colors";
import { TasksProvider } from "../../contexts/TasksContext/TasksContext";

export default function TabsLayout() {
    return (
        <TasksProvider>
            <Tabs
                screenOptions={{
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontWeight: '600',
                    },
                    tabBarStyle: {
                        backgroundColor: colors.background,
                        borderTopWidth: 0,
                        paddingBottom: 2,
                        marginBottom: 0,
                        paddingTop: 2,
                        height: 50,
                    },
                    tabBarActiveTintColor: colors.white,
                    tabBarInactiveTintColor: colors.inactive
                }}
            >

                <Tabs.Screen
                    name="ListTasks"
                    options={{
                        headerShown: false,
                        title: 'Home',
                        tabBarIcon: ({ color }) =>
                            <FontAwesome
                                size={25}
                                name="home"
                                color={color} />,
                    }} />

                <Tabs.Screen
                    name="DashBoard"
                    options={{
                        headerShown: false,
                        title: 'Dashboard',
                        tabBarIcon: ({ color }) =>
                            <FontAwesome
                                size={25}
                                name="dashboard"
                                color={color} />,
                    }} />
            </Tabs >
        </TasksProvider>

    );
}