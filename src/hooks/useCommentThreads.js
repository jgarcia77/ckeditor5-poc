import { useEffect, useState } from 'react';
import { getCommentThreads } from "../apis/commentThreadAPI";

const useCommentThreads = () => {
    const [commentThreads, setCommentThreads] = useState();

    useEffect(() => {
        const fetchCommentThreads = async () => {
            const commentThreads = await getCommentThreads();
            setCommentThreads(commentThreads);
        };

        fetchCommentThreads();
    }, []);

    return commentThreads;
};

export default useCommentThreads;