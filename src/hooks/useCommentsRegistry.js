import { useState, useEffect, useCallback } from 'react';
import { commentsContextPlugins, CommentsContextPlugin, InlineCommentsContextPlugin, ChronCommentsContextPlugin  } from '../plugins/CommentsContextPlugins';
import useUsers from './useUsers';
import useCommentThreads from './useCommentThreads';

const currentUser = 'u1';

const useCommentsRegistry = () => {
    const [inlineCommentsRepository, setInlineCommentsRepository] = useState();
    const [chronCommentsRepository, setChronCommentsRepository] = useState();
    const users = useUsers();
    const { commentThreads, addCommentOrThread, updateCommentOrThread, removeCommentOnly, commentAction, clearCommentAction } = useCommentThreads();

    const registerRepository = useCallback((name, commentsRepository) => {
        switch (name) {
            case commentsContextPlugins.InlineCommentsContextPlugin:
                setInlineCommentsRepository(commentsRepository);
                break;
            case commentsContextPlugins.ChronCommentsContextPlugin:
                setChronCommentsRepository(commentsRepository);
                break;
            default:
                break;
        };

        setInlineCommentsRepository(commentsRepository);
    }, []);

    const getCommentThread = useCallback(async (data) => {
        const thread = commentThreads.find(item => item.threadId === data.threadId);
        return thread;
    }, [commentThreads]);

    const addComment = async (data) => {
        addCommentOrThread(data);
    };

    const updateComment = async (data) => {
        debugger;
        console.log('updateComment', data);
        updateCommentOrThread(data);
    };

    const removeComment = async (data) => {
        debugger;
        console.log('removeComment', data);
        removeCommentOnly(data);
    };

    useEffect(() => {
        CommentsContextPlugin.prototype.currentUser = currentUser;
        CommentsContextPlugin.prototype.registerRepository = registerRepository;
    }, [registerRepository]);

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
    }, [commentThreads]);

    const openNewInlineCommentThread = useCallback(() => {
        inlineCommentsRepository.openNewCommentThread();
    }, [inlineCommentsRepository]);

    const openNewFieldCommentThread = useCallback(() => {
        
    }, []);

    return {
        dataIsReady: !!users && !!commentThreads,
        commentThreads,
        getCommentThread,
        openNewInlineCommentThread,
        openNewFieldCommentThread,
        commentAction, 
        clearCommentAction
    };
};

export default useCommentsRegistry;