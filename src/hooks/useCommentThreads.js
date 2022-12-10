import { useEffect, useState, useCallback } from 'react';
import { getCommentThreads } from "../apis/commentThreadAPI";

const currentUser = 'u1';
export const ADD_COMMENT_THREAD = 'ADD_COMMENT_THREAD';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

const useCommentThreads = () => {
    const [commentThreads, setCommentThreads] = useState();
    const [commentAction, setCommentAction] = useState();

    useEffect(() => {
        const fetchCommentThreads = async () => {
            const commentThreads = await getCommentThreads();
            setCommentThreads(commentThreads);
        };

        fetchCommentThreads();
    }, []);

    const addCommentOrThread = (data) => {
        setCommentAction({
            type: ADD_COMMENT,
            data
        });
    };

    const updateCommentOrThread = useCallback((data) => {
        setCommentAction({
            type: UPDATE_COMMENT,
            data
        });
    }, []);

    const removeCommentOnly = useCallback((data) => {
        setCommentAction({
            type: REMOVE_COMMENT,
            data
        });
    }, []);

    const clearCommentAction = useCallback(() => setCommentAction(null), []);

    return {
        commentThreads,
        addCommentOrThread,
        updateCommentOrThread,
        removeCommentOnly,
        commentAction,
        clearCommentAction
    };
};

export default useCommentThreads;