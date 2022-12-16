import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
    CommentsContextPlugin, 
    InlineCommentsContextPlugin, 
    ChronCommentsContextPlugin,
    FieldCommentsContextPlugin
} from '../plugins/CommentsContextPlugins';
import useUsers from './useUsers';
import useCommentThreads from './useCommentThreads';
import { addChronComment, updateChronComment, removeChronComment } from '../redux/chronological';
import { addInlineComment, updateInlineComment, removeInlineComment, removeInlineCommentThread } from '../redux/inline';
import { addFieldComment, updateFieldComment, removeFieldComment, removeFieldCommentThread } from '../redux/field';
import { getCurrentUser } from '../common/getCurrentUser';
import { channels } from '../common/channels-constant';

const currentUser = getCurrentUser();

const useContextPlugins = () => {
    const dispatch = useDispatch();

    const users = useUsers();
    const threads = useCommentThreads();

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
                    return threads.lookup[data.threadId];
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

            ChronCommentsContextPlugin.prototype.commentingService = {
                addComment: async (data) => {
                    dispatch(addInlineComment({
                        threadId: data.threadId,
                        commentId: data.commentId,
                        content: data.content,
                        attributes: data.attributes
                    }));
                    dispatch(addFieldComment({
                        threadId: data.threadId,
                        commentId: data.commentId,
                        content: data.content,
                        attributes: data.attributes
                    }));
                },
                updateComment: async (data) => {
                    dispatch(updateInlineComment({
                        threadId: data.threadId,
                        commentId: data.commentId,
                        content: data.content,
                        attributes: data.attributes
                    }));
                    dispatch(updateFieldComment({
                        threadId: data.threadId,
                        commentId: data.commentId,
                        content: data.content,
                        attributes: data.attributes
                    }));
                },
                removeComment: async (data) => {
                    dispatch(removeInlineComment({
                        threadId: data.threadId,
                        commentId: data.commentId
                    }));
                    dispatch(removeFieldComment({
                        threadId: data.threadId,
                        commentId: data.commentId
                    }));
                },
                removeCommentThread: async (data) => {
                    if (data.threadId.startsWith(channels.INLINE)) {
                        dispatch(removeInlineCommentThread({
                            threadId: data.threadId
                        }));
                    } else {
                        dispatch(removeFieldCommentThread({
                            threadId: data.threadId
                        }));
                    }  
                }
            };

            FieldCommentsContextPlugin.prototype.commentingService = {
                addComment: async (data) => {
                    dispatch(addChronComment(data));
                },
                updateComment: async (data) => {
                    dispatch(updateChronComment(data));
                },
                removeComment: async (data) => {
                    dispatch(removeChronComment(data));
                },
                removeCommentThread: async (data) => {
                    
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