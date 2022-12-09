import { useState, useEffect, useCallback } from 'react';
import { commentsContextPlugins, CommentsContextPlugin  } from '../plugins/CommentsContextPlugins';
import useUsers from './useUsers';

const useCommentsRegistry = () => {
    const [inlineCommentsRepository, setInlineCommentsRepository] = useState();
    const [chronCommentsRepository, setChronCommentsRepository] = useState();
    const users = useUsers();

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

    useEffect(() => {
        CommentsContextPlugin.prototype.registerRepository = registerRepository;
    }, [registerRepository]);

    useEffect(() => {
        if (users) {
            CommentsContextPlugin.prototype.users = users;
        }
    }, [users]);

    const openNewInlineCommentThread = useCallback(() => {
        inlineCommentsRepository.openNewCommentThread();
    }, [inlineCommentsRepository]);

    const openNewFieldCommentThread = useCallback(() => {
        
    }, []);

    return {
        usersLoaded: !!users,
        openNewInlineCommentThread,
        openNewFieldCommentThread
    };
};

export default useCommentsRegistry;