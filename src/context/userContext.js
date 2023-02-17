import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { Spinner } from "../components/spinner";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const userLogged = onAuthStateChanged(FirebaseAuth, (user) => {
            setUser(user)
        })

        return userLogged
    }, [])
    
    if (user === false) {
        return (
            <Spinner />
        )
    }

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);
