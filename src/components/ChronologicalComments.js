import React, { useState, useEffect, useRef } from 'react';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';
import { ChronCommentsContext } from 'ckeditor5-custom-build/build/ckeditor';
import { ChronCommentsContextPlugin } from '../plugins/CommentsContextPlugins';
import { useCommentingContext } from './CommentsProvider';
import { ADD_COMMENT, UPDATE_COMMENT, REMOVE_COMMENT } from '../hooks/useCommentThreads';

ChronCommentsContext.builtinPlugins = [...ChronCommentsContext.builtinPlugins, ChronCommentsContextPlugin];

const currentUser = 'u1';

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
            isFromAdapter: true
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
        if (commentAction) {
            debugger;
            switch (commentAction.type) {
                case ADD_COMMENT:
                    if (commentsRepository.hasCommentThread(commentAction.data.threadId)) {
                        addComment(commentAction.data);
                    } else {
                        addNewCommentThread(commentAction.data);
                    }
                    break;
                case UPDATE_COMMENT:
                    updateComment(commentAction.data);
                    break;
                case REMOVE_COMMENT:
                    removeComment(commentAction.data);
                    break;
                default:
                    break;
            };

            clearCommentAction();
        }
    }, [commentAction, clearCommentAction, commentsRepository]);

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

                    for ( const commentThread of commentThreads ) {
                        commentsRepository.addCommentThread({ ...commentThread, isFromAdapter: true });
                    }

                    setCommentsRepository(commentsRepository);
                }} />
            <div ref={commentsPanelRef}></div>
        </>
    );
};

export default ChronologicalComments;