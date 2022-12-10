import React, { useState, useEffect, useRef } from 'react';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';
import { ChronCommentsContext } from 'ckeditor5-custom-build/build/ckeditor';
import { ChronCommentsContextPlugin } from '../plugins/CommentsContextPlugins';
import { useCommentingContext } from './CommentsProvider';
import { ADD_COMMENT_THREAD, ADD_COMMENT, UPDATE_COMMENT, REMOVE_COMMENT } from '../hooks/useCommentThreads';

ChronCommentsContext.builtinPlugins = [...ChronCommentsContext.builtinPlugins, ChronCommentsContextPlugin];

const ChronologicalComments = () => {
    const { dataIsReady, commentThreads, commentAction, clearCommentAction } = useCommentingContext();
    const commentsPanelRef = useRef();
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [commentsRepository, setCommentsRepository] = useState();

    useEffect(() => {
        if (!isLayoutReady) {
            setIsLayoutReady(true);
        }
    }, [isLayoutReady]);

    useEffect(() => {
        if (commentsRepository) {
            for ( const commentThread of commentThreads ) {
                if (!commentsRepository.hasCommentThread(commentThread.threadId)) {
                    commentsRepository.addCommentThread({ ...commentThread, isFromAdapter: true });
                }
            }
        }
    }, [commentThreads, commentsRepository]);

    useEffect(() => {
        if (commentAction) {
            debugger;
            switch (commentAction.type) {
                case ADD_COMMENT_THREAD:
                    commentsRepository.addCommentThread({ ...commentAction.data, isFromAdapter: true });
                    break;
                case ADD_COMMENT:
                    const commentThread = commentsRepository.getCommentThread(commentAction.data.threadId);
                    commentThread.addComment(commentAction.data.comment);
                    break;
                case UPDATE_COMMENT:
                    const commentThreadToUpdate = commentsRepository.getCommentThread(commentAction.data.threadId);
                    const commentToUpdate = commentThreadToUpdate.getComment(commentAction.data.commentId);
                    commentToUpdate.update(commentAction.data);
                    break;
                case REMOVE_COMMENT:
                    const commentThreadToRemove = commentsRepository.getCommentThread(commentAction.data.threadId);
                    const commentToRemove = commentThreadToRemove.getComment(commentAction.data.commentId);
                    commentToRemove.remove(commentAction.data);
                    break;
                default:
                    break;
            };

            clearCommentAction();
        }
    }, [commentAction]);

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

                    setCommentsRepository(commentsRepository);
                }} />
            <div ref={commentsPanelRef}></div>
        </>
    );
};

export default ChronologicalComments;