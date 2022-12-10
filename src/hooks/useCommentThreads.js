import { useEffect, useState, useCallback } from 'react';
import { getCommentThreads } from "../apis/commentThreadAPI";

const currentUser = 'u1';

const useCommentThreads = () => {
    const [commentThreads, setCommentThreads] = useState();

    useEffect(() => {
        const fetchCommentThreads = async () => {
            const commentThreads = await getCommentThreads();
            setCommentThreads(commentThreads);
        };

        fetchCommentThreads();
    }, []);

    return {
        commentThreads
    };
};

export default useCommentThreads;