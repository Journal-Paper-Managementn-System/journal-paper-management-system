import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import journalService from "../services/journalService";
import articleService from "../services/articleService";
import Loading from "../utils/Loading";

export const JournalContext = createContext();

const JournalProvider = ({ children }) => {
    const { user, isLoggedIn } = useAuth();
    const [journalData, setJournalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [acceptedArticles, setAcceptedArticles] = useState([]);

    /**
     * Retrieves journal articles for the current user.
     * @returns {Promise<void>} A Promise that resolves when the articles are retrieved.
     */
    const getJournalArticles = async (journalData) => {
        if (journalData.length === 0) return;
        const journal = journalData.find((journal) => journal.editorId === user._id);
        if (journal !== undefined) {
            const response = await articleService.getArticleList(journal._id);
            if (response.success) {
                setArticles(response.data);
                setAcceptedArticles(response.data.filter(article => article.finalStatus === 'accepted'));
                return response.data;
            }
        }
    }

    /**
     * Fetche the list of journals from the server.
     * @returns {Promise<Object>} The response data from the server.
     */
    const getJournalData = async () => {
        const responseData = await journalService.getJournalList();
        setJournalData(responseData.data);
        if (isLoggedIn && user.isEditor) await getJournalArticles(responseData.data);
        return responseData;
    }

    useEffect(() => {
        getJournalData().then(() => setLoading(false));
    }, []);

    return (
        <JournalContext.Provider value={{
            getJournalArticles,
            getJournalData,
            journalData,
            articles,
            setArticles,
            acceptedArticles,
        }}>
            {loading ? <Loading /> : children}
        </JournalContext.Provider>
    );
};

export const useJournal = () => {
    return useContext(JournalContext);
};

export default JournalProvider;