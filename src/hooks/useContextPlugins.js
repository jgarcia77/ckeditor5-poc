import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CommentsContextPlugin, InlineCommentsContextPlugin  } from '../plugins/CommentsContextPlugins';
import useUsers from './useUsers';
import useThreads from './useThreads';
import { addChronComment, updateChronComment, removeChronComment } from '../redux/chronological';

const currentUser = 'u1';

const useContextPlugins = () => {
    const dispatch = useDispatch();

    const users = useUsers();
    const threads = useThreads();

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
                getCommentThread: async (data) => {
                    const thread = threads.data.find(item => item.threadId === data.threadId);
                    return thread;
                },
                addComment: async (data) => {
                    dispatch(addChronComment(data));
                },
                updateComment: async (data) => {
                    dispatch(updateChronComment(data));
                },
                removeComment: async (data) => {
                    dispatch(removeChronComment(data));
                }
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [threads.isFulfilled]);

    return {
        pluginsAreReady: users.isFulfilled && !!threads.isFulfilled,
    };
};

export default useContextPlugins;