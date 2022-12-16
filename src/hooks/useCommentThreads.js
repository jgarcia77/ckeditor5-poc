import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readCommentThreads, commentThreadsSelectors } from '../redux/commentThreads';

const useCommentThreads = () => {
    const dispatch = useDispatch();
    const commentThreads = useSelector(commentThreadsSelectors.selectAll);
    const commentThreadsStates = useSelector(commentThreadsSelectors.selectStates);

    useEffect(() => {
        dispatch(readCommentThreads());
    }, []);

    return {
        ...commentThreadsStates,
        data: commentThreads
    };
};

export default useCommentThreads;