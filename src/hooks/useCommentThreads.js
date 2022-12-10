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

    const addCommentOrThread = useCallback((data) => {
        const commentThread = commentThreads.find(thread => thread.threadId === data.threadId);

        if (commentThread) {
            const newComment = {
                commentId: data.commentId,
                authorId: currentUser,
                content: data.content,
                createdAt: new Date(),
                attributes: data.attributes
            };

            setCommentAction({
                type: ADD_COMMENT,
                data: {
                    threadId: data.threadId,
                    comment: newComment
                }
            });
        } else {
            const newCommentThread = {
                threadId: data.threadId,
                comments: [
                    {
                        commentId: data.commentId,
                        authorId: currentUser,
                        content: data.content,
                        createdAt: new Date(),
                        attributes: data.attributes
                    }
                ]
            };

            setCommentAction({
                type: ADD_COMMENT_THREAD,
                data: newCommentThread
            });
        };
    }, [commentThreads]);

    const updateCommentOrThread = useCallback((data) => {
        setCommentAction({
            type: UPDATE_COMMENT,
            data
        });
    }, [commentThreads]);

    const removeCommentOnly = useCallback((data) => {
        setCommentAction({
            type: REMOVE_COMMENT,
            data
        });
    }, [commentThreads]);

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