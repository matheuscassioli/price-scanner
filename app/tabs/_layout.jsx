import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="ListTasks" options={{ title: "Tarefas" }} />
        </Tabs>
    );
}