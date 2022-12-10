import { useEffect, useCallback } from 'react';
import { CommentsContextPlugin, InlineCommentsContextPlugin  } from '../plugins/CommentsContextPlugins';
import useUsers from './useUsers';
import useCommentThreads from './useCommentThreads';

const currentUser = 'u1';

const useCommentsRegistry = () => {
    const users = useUsers();
    const { commentThreads, addCommentOrThread, updateCommentOrThread, removeCommentOnly, commentAction, clearCommentAction } = useCommentThreads();

    const getCommentThread = useCallback(async (data) => {
        const thread = commentThreads.find(item => item.threadId === data.threadId);
        return thread;
    }, [commentThreads]);

    const addComment = async (data) => {
        debugger;
        addCommentOrThread(data);
    };

    const updateComment = useCallback(async (data) => {
        console.log('updateComment', data);
        updateCommentOrThread(data);
    }, [updateCommentOrThread]);

    const removeComment = useCallback(async (data) => {
        console.log('removeComment', data);
        removeCommentOnly(data);
    }, [removeCommentOnly]);

    useEffect(() => {
        CommentsContextPlugin.prototype.currentUser = currentUser;
    }, []);

    useEffect(() => {
        if (users) {
            CommentsContextPlugin.prototype.users = users;
        }
    }, [users]);

    useEffect(() => {
        if (commentThreads) {
            InlineCommentsContextPlugin.prototype.commentingService = {
                getCommentThread,
                addComment,
                updateComment,
                removeComment
            };
        }
    }, [commentThreads, getCommentThread, updateComment, removeComment]);

    return {
        dataIsReady: !!users && !!commentThreads,
        commentThreads,
        getCommentThread,
        commentAction, 
        clearCommentAction
    };
};

export default useCommentsRegistry;