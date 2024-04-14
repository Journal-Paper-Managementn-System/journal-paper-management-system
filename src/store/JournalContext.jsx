import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import journalService from "../services/journalService";
import articleService from "../services/articleService";

export const JournalContext = createContext();

const JournalProvider = ({ children }) => {
    const { user } = useAuth();

    /**
     * Retrieves journal articles for the current user.
     * @returns {Promise<void>} A Promise that resolves when the articles are retrieved.
     */
    const getJournalArticles = async () => {
        const response = await journalService.getJournalList();
        if (response.success) {
            const journalData = response.data;
            if (journalData.length === 0) return;
            const journal = journalData.find((journal) => journal.editorId === user._id);
            if (journal !== undefined) {
                const response = await articleService.getArticleList(journal._id);
                if (response.success) {
                    return response.data;
                }
            }
        }
    }

    return (
        <JournalContext.Provider value={{
            getJournalArticles
        }}>
            {children}
        </JournalContext.Provider>
    );
};

export const useJournal = () => {
    return useContext(JournalContext);
};

export default JournalProvider;