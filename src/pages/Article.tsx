import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchArticleByID} from "../api.ts";
import formatDate from "../utils/formatDate.tsx";

const Article = () => {
    interface Article {
        title: string;
        date: string;
        content: string;
    }

    const { id } = useParams<{ id: string }>();
    const articleID = id ? parseInt(id) : NaN;

    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        fetchArticleByID(articleID).then((articles) => {
            if (Array.isArray(articles)) {
                setArticle(articles[0]);
            } else {
                setArticle(articles);
            }
        }).catch(console.error);
    }, [articleID]);

    if (isNaN(articleID) || !article) {
        return <p>No article found</p>;
    }

    return (
        <div className="flex flex-col items-center w-full min-h-screen">
            <h1 className="py-4">{article.title}</h1>
            <h2 className="font-semibold text-xl pb-4">{formatDate(article.date)}</h2>
            <p className="w-9/12 mx-auto">{article.content}</p>
            <div className="mt-auto mb-8">
                <Link to="/" className="flex justify-center items-center border-2 w-fit border-gray-300 rounded-md px-6 py-2">Back to Home</Link>
            </div>
        </div>
    )
}

export default Article;