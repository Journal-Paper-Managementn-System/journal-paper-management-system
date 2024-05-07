import { createContext, useContext, useEffect, useState } from "react";
import Auth from "../services/authService";
import Article from '../services/articleService';
import Loading from "../utils/Loading";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState(sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken"));

    // const [userList, setUserList] = useState([{}]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    /**
     * Stores the access token in either local storage or session storage based on the checkbox value.
     * @param {string} accessToken - The access token to be stored.
     * @param {boolean} [checkbox=false] - Indicates whether to store the token in local storage (true) or session storage (false).
     */
    const storeToken = (accessToken, checkbox = false) => {
        if (checkbox) {
            localStorage.setItem("accessToken", accessToken);
        } else {
            sessionStorage.setItem("accessToken", accessToken);
        }
        setToken(accessToken);
        setIsLoggedIn(true);
    };

    /**
     * Retrieves the user data from the server.
     * @returns {Promise<Object>} A promise that resolves to the user data.
     */
    const getUser = async () => {
        setLoading(true);
        const user = await Auth.getUser(token);
        setIsLoggedIn(user.success);
        if (user.success) {
            setUser(user.data);
            setLoading(false);
            return user;
        }
        setLoading(false);
    };

    /**
     * Fetches the user list from the server.
     * 
     * @returns {Promise} A promise that resolves to the response data.
     */
    // const getUserList = async () => {
    //     if (isLoggedIn && user.isEditor) {
    //         const responseData = await Auth.getUserList(token);
    //         setUserList(responseData.data);
    //         return responseData;
    //     }
    // };

    useEffect(() => {
        getUser().then(() => setLoading(false));
    }, [token]);

    return (
        <AuthContext.Provider value={{
            storeToken,
            isLoggedIn,
            user,
            getUser,
            token,
            setIsLoggedIn,
        }}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};