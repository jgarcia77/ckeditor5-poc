import { useState, useEffect, useCallback } from 'react';
import { commentsContextPlugins, CommentsContextPlugin  } from '../plugins/CommentsContextPlugins';

const useCommentsRegistry = (isLayoutReady) => {
    const [inlineCommentsRepository, setInlineCommentsRepository] = useState();
    const [chronCommentsRepository, setChronCommentsRepository] = useState();

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
        if (!isLayoutReady) {
            CommentsContextPlugin.prototype.registerRepository = registerRepository;
        }
    }, [isLayoutReady, registerRepository]);

    const openNewInlineCommentThread = useCallback(() => {
        inlineCommentsRepository.openNewCommentThread();
    }, [inlineCommentsRepository]);

    const openNewFieldCommentThread = useCallback(() => {
        
    }, []);

    return {
        openNewInlineCommentThread,
        openNewFieldCommentThread
    };
};

export default useCommentsRegistry;