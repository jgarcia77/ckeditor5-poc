import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CommentsContextPlugin, InlineCommentsContextPlugin  } from '../plugins/CommentsContextPlugins';
import useUsers from './useUsers';
import useCommentThreads from './useCommentThreads';
import { addCommentAction, updateCommentAction, removeCommentAction } from '../redux/chronological';

const currentUser = 'u1';

const useCommentAdapters = () => {
    const dispatch = useDispatch();

    const users = useUsers();
    const threads = useCommentThreads();

    const getCommentThread = useCallback(async (data) => {
        const thread = threads.data.find(item => item.threadId === data.threadId);
        return thread;
    }, [threads.data]);

    const addComment = async (data) => {
        dispatch(addCommentAction(data));
    };

    const updateComment = async (data) => {
        dispatch(updateCommentAction(data));
    };

    const removeComment = async (data) => {
        dispatch(removeCommentAction(data));
    };

    useEffect(() => {
        CommentsContextPlugin.prototype.currentUser = currentUser;
    }, []);

    useEffect(() => {
        if (users.isFulfilled) {
            CommentsContextPlugin.prototype.users = users.data;
        }
    }, [users.isFulfilled]);

    useEffect(() => {
        if (threads.isFulfilled) {
            InlineCommentsContextPlugin.prototype.commentingService = {
                getCommentThread,
                addComment,
                updateComment,
                removeComment
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [threads.isFulfilled]);

    return {
        dataIsReady: users.isFulfilled && !!threads.isFulfilled,
        getCommentThread,
    };
};

export default useCommentAdapters;