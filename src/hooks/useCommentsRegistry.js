import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CommentsContextPlugin, InlineCommentsContextPlugin  } from '../plugins/CommentsContextPlugins';
import useUsers from './useUsers';
import useCommentThreads from './useCommentThreads';
import { addCommentAction, updateCommentAction, removeCommentAction } from '../redux/chronological';

const currentUser = 'u1';

const useCommentsRegistry = () => {
    const dispatch = useDispatch();

    const users = useUsers();
    const { commentThreads } = useCommentThreads();

    const getCommentThread = useCallback(async (data) => {
        const thread = commentThreads.find(item => item.threadId === data.threadId);
        return thread;
    }, [commentThreads]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentThreads]);

    return {
        dataIsReady: !!users && !!commentThreads,
        commentThreads,
        getCommentThread,
    };
};

export default useCommentsRegistry;