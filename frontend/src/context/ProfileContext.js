import { createContext, useContext, useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import useAxios from "../utils/useAxios";

const ProfileContext = createContext();

export default ProfileContext;

export const ProfileProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);

    const { user } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(null);

    const api = useAxios();
    const fetchData = async () => {
        try {
            const response = await api.get(`/username/${user.user_id}`);
            const x = response.data.response.perfil;
            console.log("Request was made: ", x);
            setUserProfile(x);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (currentUser !== user) {
            setCurrentUser(user);
            fetchData();
        }
    }, [user, currentUser]);

    const contextData = {
        userProfile,
    };

    return (
        <ProfileContext.Provider value={contextData}>
            {children}
        </ProfileContext.Provider>
    );
};
