import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import Auth from "../services/authService";
import JournalArticle from '../services/journalAService';
import Journal from '../services/journalService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState(sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken"));
    const [journalAData, setJournalAData] = useState([]);
    const [journalData, setJournalData] = useState([]);
    const [userList, setUserList] = useState([{}]);

    const getArticles = async (journalId) => {
        const response = await JournalArticle.getArticleList(journalId);
        return response;
    }

    const storeToken = (accessToken, checkbox = false) => {
        if (checkbox) {
            localStorage.setItem("accessToken", accessToken);
        } else {
            sessionStorage.setItem("accessToken", accessToken);
        }
        setToken(accessToken);
    };

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        sessionStorage.removeItem("accessToken") || localStorage.removeItem("accessToken");
        setToken("");
    };

    const getUser = async () => {
        const user = await Auth.getUser(token);
        if (user.success) setUser(user.data);
        return user;
    };

    const getJournalAData = async () => {
        const responseData = await JournalArticle.getJournalArticle(token);
        setJournalAData(responseData);
        return responseData;
    }

    const getUserList = async () => {
        if (isLoggedIn) {
            const responseData = await Auth.getUserList(token);
            setUserList(responseData.data);
            return responseData;
        }
    }

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
            getJournalAData();
        }
    }, [token,]);

    return (
        <AuthContext.Provider value={{
            storeToken,
            isLoggedIn,
            user,
            LogoutUser,
            journalAData,
            getJournalAData,
            journalData,
            getUser,
            getArticles,
            getJournalData,
            userList,
            token,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};