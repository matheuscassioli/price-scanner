// app/index.jsx
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import Login from "./Login.jsx";
import { Slot } from "expo-router";

export default function Index() {
    const { authUser } = useContext(AuthContext);

    if (!authUser) {
        return <Login />;
    }

    return <Slot />;
}
