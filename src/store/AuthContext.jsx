import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import Auth from "../services/authService";
import Article from '../services/articleService';
import Journal from '../services/journalService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState(sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken"));
    const [articleData, setArticleData] = useState([]);
    const [journalData, setJournalData] = useState([]);
    const [userList, setUserList] = useState([{}]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    /**
     * Retrieves the list of articles for a given journal.
     *
     * @param {string} journalId - The ID of the journal.
     * @returns {Promise} A promise that resolves to the response from the server.
     */
    const getArticles = async (journalId) => {
        const response = await Article.getArticleList(journalId);
        return response;
    }

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
        const user = await Auth.getUser(token);
        setIsLoggedIn(user.success);
        if (user.success) {
            setUser(user.data);
            return user;
        }
    };

    /**
     * Retrieves journal article data.
     * @returns {Promise<Object>} The response data from the API.
     */
    const getArticleData = async () => {
        const responseData = await Article.getArticle(token);
        setArticleData(responseData);
        return responseData;
    }

    /**
     * Fetches the user list from the server.
     * 
     * @returns {Promise} A promise that resolves to the response data.
     */
    const getUserList = async () => {
        if (isLoggedIn && user.isEditor) {
            const responseData = await Auth.getUserList(token);
            setUserList(responseData.data);
            return responseData;
        }
    }

    /**
     * Fetches journal data from the server.
     * @returns {Promise<Object>} The response data from the server.
     */
    const getJournalData = async () => {
        const responseData = await Journal.getJournalList();
        setJournalData(responseData.data);
        return responseData;
    }

    useEffect(() => {
        getJournalData();
        getUserList();
    }, [])

    useLayoutEffect(() => {
        if (token) {
            getUser();
            getArticleData();
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{
            storeToken,
            isLoggedIn,
            user,
            articleData,
            getArticleData,
            journalData,
            getUser,
            getArticles,
            getJournalData,
            userList,
            token,
            setIsLoggedIn,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};