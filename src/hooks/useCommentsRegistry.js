import { useState, useCallback } from 'react';
import { commentsContextPlugins  } from '../plugins/CommentsContextPlugins';

const useCommentsRegistry = () => {
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

    return {
        registerRepository
    };
};

export default useCommentsRegistry;