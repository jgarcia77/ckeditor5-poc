import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';
import { ChronCommentsContext } from 'ckeditor5-custom-build/build/ckeditor';
import { ChronCommentsContextPlugin } from '../plugins/CommentsContextPlugins';
import { useCommentingContext } from './CommentsProvider';
import { 
    selectCommentToAdd, 
    resetAddCommentAction,
    selectCommentToUpdate,
    resetUpdateCommentAction,
    selectCommentToRemove,
    resetRemoveCommentAction
} from '../redux/chronological';
import { selectThreads } from '../redux/threads';

ChronCommentsContext.builtinPlugins = [...ChronCommentsContext.builtinPlugins, ChronCommentsContextPlugin];

const currentUser = 'u1';

const ChronologicalComments = () => {
    const dispatch = useDispatch();
    const { dataIsReady } = useCommentingContext();
    const commentsPanelRef = useRef();
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [commentsRepository, setCommentsRepository] = useState();
    const commentToAdd = useSelector(selectCommentToAdd);
    const commentToUpdate = useSelector(selectCommentToUpdate);
    const commentToRemove = useSelector(selectCommentToRemove);
    const threads = useSelector(selectThreads);

    useEffect(() => {
        if (!isLayoutReady) {
            setIsLayoutReady(true);
        }
    }, [isLayoutReady]);

    const addNewCommentThread = (data) => {
        const newCommentThread = {
            threadId: data.threadId,
            comments: [
                {
                    commentId: data.commentId,
                    authorId: currentUser,
                    content: data.content,
                    createdAt: new Date(),
                    attributes: data.attributes
                }
            ],
            isFromAdapter: false
        };

        commentsRepository.addCommentThread(newCommentThread);
    };

    const addComment = (data) => {
        const commentThread = commentsRepository.getCommentThread(data.threadId);
        const comment = {
            commentId: data.commentId,
            authorId: currentUser,
            content: data.content,
            createdAt: new Date(),
            attributes: data.attributes
        };
        
        commentThread.addComment(comment);
    };

    const updateComment = (data) => {
        const commentThread = commentsRepository.getCommentThread(data.threadId);
        const comment = commentThread.getComment(data.commentId);
        comment.update(data);
    };

    const removeComment = (data) => {
        const commentThread = commentsRepository.getCommentThread(data.threadId);
        const comment = commentThread.getComment(data.commentId);
        comment.remove(data);
    };

    useEffect(() => {
        if (!commentToAdd) {
            return;
        }

        if (commentsRepository.hasCommentThread(commentToAdd.threadId)) {
            addComment(commentToAdd);
        } else {
            addNewCommentThread(commentToAdd);
        }

        dispatch(resetAddCommentAction());
    }, [commentToAdd]);

    useEffect(() => {
        if (!commentToUpdate) {
            return;
        }

        updateComment(commentToUpdate);

        dispatch(resetUpdateCommentAction());
    }, [commentToUpdate]);

    useEffect(() => {
        if (!commentToRemove) {
            return;
        }

        removeComment(commentToRemove);

        dispatch(resetRemoveCommentAction());
    }, [commentToRemove]);

    return (
        <>
            <CKEditorContext
                isLayoutReady={isLayoutReady && dataIsReady}
                config={{
                        licenseKey: 'SsCD/VMf4oJy+RRwL7IFxIQAmjOs3z/I9a5AF6B4lDUGTo2392iE',
                        sidebar: {
                            container: commentsPanelRef.current,
                            preventScrollOutOfView: true
                        },
                        collaboration: {
                            channelId: 'chronological-channel'
                        }
                    }}
                context={ChronCommentsContext} 
                onReady={(context) => {
                    const commentsRepository = context.plugins.get( 'CommentsRepository' );
            
                    commentsRepository.on( 'addCommentThread', (evt, data) => {
                        const thread = commentsRepository.getCommentThread(data.threadId);

                        if (!thread.isAttached) {
                            thread.attachTo(commentsPanelRef.current);
                        }
                    }, { priority: 'lowest' } );

                    for ( const commentThread of threads.data ) {
                        commentsRepository.addCommentThread({ ...commentThread, isFromAdapter: true });
                    }

                    setCommentsRepository(commentsRepository);
                }} />
            <div ref={commentsPanelRef}></div>
        </>
    );
};

export default ChronologicalComments;