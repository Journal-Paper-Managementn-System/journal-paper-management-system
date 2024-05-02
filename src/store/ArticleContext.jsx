import { createContext, useContext, useEffect, useState } from "react";
import Loading from "../utils/Loading";
import { useAuth } from "./AuthContext";
import articleService from "../services/articleService";

export const ArticleContext = createContext();

const ArticleProvider = ({ children }) => {
    const [articleData, setArticleData] = useState([]);
    const { isLoggedIn, token } = useAuth();
    const [loading, setLoading] = useState(true);

    /**
     * Retrieves journal article data.
     * @returns {Promise<Object>} The response data from the API.
     */
    const getArticleData = async () => {
        if (!isLoggedIn) return;
        const responseData = await articleService.getArticle(token);
        setArticleData(responseData);
        return responseData;
    }

    useEffect(() => {
        getArticleData().then(() => setLoading(false));
    }, []);

    return (
        <ArticleContext.Provider value={{
            articleData,
            getArticleData,
        }}>
            {loading ? <Loading /> : children}
        </ArticleContext.Provider>
    );
};

export const useArticle = () => {
    return useContext(ArticleContext);
};

export default ArticleProvider;