import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CommentsContextPlugin, InlineCommentsContextPlugin  } from '../plugins/CommentsContextPlugins';
import useUsers from './useUsers';
import useThreads from './useThreads';
import { addCommentAction, updateCommentAction, removeCommentAction } from '../redux/chronological';

const currentUser = 'u1';

const useContextPlugins = () => {
    const dispatch = useDispatch();

    const users = useUsers();
    const threads = useThreads();

    const getCommentThread = async (data) => {
        const thread = threads.data.find(item => item.threadId === data.threadId);
        return thread;
    };

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
        pluginsAreReady: users.isFulfilled && !!threads.isFulfilled,
    };
};

export default useContextPlugins;