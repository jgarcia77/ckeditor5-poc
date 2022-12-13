import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';
import { ChronCommentsContext } from 'ckeditor5-custom-build/build/ckeditor';
import { ChronCommentsContextPlugin } from '../plugins/CommentsContextPlugins';
import { useCommentingContext } from './CommentsProvider';
import { 
    selectChronCommentToAdd, 
    resetAddChronComment,
    selectChronCommentToUpdate,
    resetUpdateChronComment,
    selectChronCommentToRemove,
    resetRemoveChronComment
} from '../redux/chronological';
import { selectThreads } from '../redux/threads';

ChronCommentsContext.builtinPlugins = [...ChronCommentsContext.builtinPlugins, ChronCommentsContextPlugin];

const currentUser = 'u1';

const ChronologicalComments = () => {
    const dispatch = useDispatch();
    const { pluginsAreReady } = useCommentingContext();
    const commentsPanelRef = useRef();
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [commentsRepository, setCommentsRepository] = useState();
    const commentToAdd = useSelector(selectChronCommentToAdd);
    const commentToUpdate = useSelector(selectChronCommentToUpdate);
    const commentToRemove = useSelector(selectChronCommentToRemove);
    const threads = useSelector(selectThreads);

    useEffect(() => {
        if (!isLayoutReady) {
            setIsLayoutReady(true);
        }
    }, [isLayoutReady]);

    const addNewCommentThread = (data) => {
        const lastComment = commentsPanelRef.current.querySelector('.ck-sidebar-item:last-child');
        const target = lastComment ?? commentsPanelRef.current;
        const newCommentThread = {
            threadId: data.threadId,
            comments: [
                {
                    channelId: data.channelId,
                    commentId: data.commentId,
                    authorId: currentUser,
                    content: data.content,
                    createdAt: new Date(),
                    attributes: data.attributes
                }
            ],
            target,
            isFromAdapter: true
        };

        commentsRepository.addCommentThread(newCommentThread);
    };

    const addComment = (data) => {
        const commentThread = commentsRepository.getCommentThread(data.threadId);
        const comment = {
            channelId: data.channelId,
            commentId: data.commentId,
            authorId: currentUser,
            content: data.content,
            createdAt: new Date(),
            attributes: data.attributes,
            isFromAdapter: true
        };
        
        commentThread.addComment(comment);
    };

    const updateComment = (data) => {
        const commentThread = commentsRepository.getCommentThread(data.threadId);
        const comment = commentThread.getComment(data.commentId);
        comment.update({ ...data, isFromAdapter: true });
    };

    const removeComment = (data) => {
        const commentThread = commentsRepository.getCommentThread(data.threadId);
        const comment = commentThread.getComment(data.commentId);
        comment.remove({ ...data, isFromAdapter: true });
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

        dispatch(resetAddChronComment());
    }, [commentToAdd]);

    useEffect(() => {
        if (!commentToUpdate) {
            return;
        }

        updateComment(commentToUpdate);

        dispatch(resetUpdateChronComment());
    }, [commentToUpdate]);

    useEffect(() => {
        if (!commentToRemove) {
            return;
        }

        removeComment(commentToRemove);

        dispatch(resetRemoveChronComment());
    }, [commentToRemove]);

    return (
        <>
            <CKEditorContext
                isLayoutReady={isLayoutReady && pluginsAreReady}
                config={{
                        licenseKey: 'SsCD/VMf4oJy+RRwL7IFxIQAmjOs3z/I9a5AF6B4lDUGTo2392iE',
                        sidebar: {
                            container: commentsPanelRef.current,
                            preventScrollOutOfView: true
                        }
                    }}
                context={ChronCommentsContext} 
                onReady={(context) => {
                    const commentsRepository = context.plugins.get( 'CommentsRepository' );

                    const lastComment = commentsPanelRef.current.querySelector('.ck-sidebar-item:last-child');
                    const target = lastComment ?? commentsPanelRef.current;

                    for ( const commentThread of threads.data ) {
                        commentsRepository.addCommentThread({ 
                            ...commentThread,
                            target,
                            isFromAdapter: true 
                        });
                    }

                    setCommentsRepository(commentsRepository);
                }} />
            <div ref={commentsPanelRef} />
        </>
    );
};

export default ChronologicalComments;