import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readCommentThreads, selectThreads } from '../redux/threads';

const useThreads = () => {
    const dispatch = useDispatch();
    const threads = useSelector(selectThreads);

    useEffect(() => {
        dispatch(readCommentThreads());
    }, []);

    return threads;
};

export default useThreads;