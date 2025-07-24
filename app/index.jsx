import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
    const { authUser } = useContext(AuthContext);

    if (!authUser) {
        return <Redirect href="/Login" />;
    }

    return <Redirect href="/tabs/ListTasks" />;
}