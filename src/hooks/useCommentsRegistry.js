import { useState, useEffect, useCallback } from 'react';
import { commentsContextPlugins, CommentsContextPlugin, InlineCommentsContextPlugin  } from '../plugins/CommentsContextPlugins';
import useUsers from './useUsers';
import useCommentThreads from './useCommentThreads';

const useCommentsRegistry = () => {
    const [inlineCommentsRepository, setInlineCommentsRepository] = useState();
    const [chronCommentsRepository, setChronCommentsRepository] = useState();
    const users = useUsers();
    const commentThreads = useCommentThreads();

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

    const getCommentThread = async (data) => {
        const thread = commentThreads.find(item => item.threadId === data.threadId);
        return thread;
    };

    useEffect(() => {
        CommentsContextPlugin.prototype.currentUser = 'u1';
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
                getCommentThread
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
        openNewInlineCommentThread,
        openNewFieldCommentThread
    };
};

export default useCommentsRegistry;