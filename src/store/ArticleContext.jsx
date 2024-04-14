import { createContext, useContext } from "react";

export const ArticleContext = createContext();

const ArticleProvider = ({ children }) => {
    return (
        <ArticleContext.Provider value={{}}>
            {children}
        </ArticleContext.Provider>
    );
};

export const useArticle = () => {
    return useContext(ArticleContext);
};

export default ArticleProvider;