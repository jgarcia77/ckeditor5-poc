import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';
import { FieldCommentsContext } from 'ckeditor5-custom-build/build/ckeditor';
import { FieldCommentsContextPlugin } from '../plugins/CommentsContextPlugins';
import { useCommentingContext } from './CommentsProvider';
import { v4 as uuidv4 } from 'uuid';
import { 
    selectFieldCommentToAdd, 
    resetAddFieldComment,
    selectFieldCommentToUpdate,
    resetUpdateFieldComment,
    selectFieldCommentToRemove,
    resetRemoveFieldComment,
    selectFieldCommentThreadToRemove,
    resetRemoveFieldCommentThread
} from '../redux/field';

FieldCommentsContext.builtinPlugins = [...FieldCommentsContext.builtinPlugins, FieldCommentsContextPlugin];

const currentUser = 'u1';

const FieldComment = ({ id, children }) => {
    const fieldRef = useRef();
    const commentsPanelRef = useRef();
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [commentsRepository, setCommentsRepository] = useState();
    const { pluginsAreReady } = useCommentingContext();
    const commentToAdd = useSelector(selectFieldCommentToAdd);
    const commentToUpdate = useSelector(selectFieldCommentToUpdate);
    const commentToRemove = useSelector(selectFieldCommentToRemove);
    const commentThreadToRemove = useSelector(selectFieldCommentThreadToRemove);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLayoutReady) {
            setIsLayoutReady(true);
        }
    }, [isLayoutReady]);

    useEffect(() => {
        if (!commentToAdd) {
            return;
        }

        if (commentsRepository.hasCommentThread(commentToAdd.threadId)) {
            const commentThread = commentsRepository.getCommentThread(commentToAdd.threadId);

            if (commentThread.channelId === 'fields-channel') {
                const comment = {
                    commentId: commentToAdd.commentId,
                    authorId: currentUser,
                    content: commentToAdd.content,
                    createdAt: new Date(),
                    attributes: commentToAdd.attributes,
                    isFromAdapter: true
                };
                
                commentThread.addComment(comment);
                commentsRepository.setActiveCommentThread(commentToAdd.threadId);

                dispatch(resetAddFieldComment());
            }
        }
    }, [commentToAdd]);

    useEffect(() => {
        if (!commentToUpdate) {
            return;
        }

        if (!commentsRepository.hasCommentThread(commentToUpdate.threadId)) {
            return;
        }

        const commentThread = commentsRepository.getCommentThread(commentToUpdate.threadId);

        if (commentThread.channelId === 'fields-channel') {
            const comment = commentThread.getComment(commentToUpdate.commentId);
            comment.update({ ...commentToUpdate, isFromAdapter: true });

            commentsRepository.setActiveCommentThread(commentToUpdate.threadId);

            dispatch(resetUpdateFieldComment());
        }
    }, [commentToUpdate]);

    useEffect(() => {
        if (!commentToRemove) {
            return;
        }

        if (!commentsRepository.hasCommentThread(commentToRemove.threadId)) {
            return;
        }

        const commentThread = commentsRepository.getCommentThread(commentToRemove.threadId);

        if (commentThread.channelId === 'fields-channel') {
            const comment = commentThread.getComment(commentToRemove.commentId);
            comment.remove({ ...commentToRemove, isFromAdapter: true });

            dispatch(resetRemoveFieldComment());
        }
    }, [commentToRemove]);

    useEffect(() => {
        if (!commentThreadToRemove) {
            return;
        }

        if (!commentsRepository.hasCommentThread(commentThreadToRemove.threadId)) {
            return;
        }

        debugger;

        const commentThread = commentsRepository.getCommentThread(commentThreadToRemove.threadId);

        if (commentThread.channelId === 'fields-channel') {
            commentThread.remove({ isFromAdapter: true });
            dispatch(resetRemoveFieldCommentThread());
        }

    }, [commentThreadToRemove]);

    const handleOpenNewCommentThread = () => {
        commentsRepository.openNewCommentThread({
            channelId: 'fields-channel',
            threadId: uuidv4(),
            target: fieldRef.current
        });
    }

    return (
        <>
            <CKEditorContext
                isLayoutReady={isLayoutReady && pluginsAreReady}
                config={{
                        licenseKey: 'SsCD/VMf4oJy+RRwL7IFxIQAmjOs3z/I9a5AF6B4lDUGTo2392iE',
                        sidebar: {
                            container: commentsPanelRef.current,
                            preventScrollOutOfView: true
                        },
                        collaboration: {
                            channelId: 'fields-channel'
                        }
                    }}
                context={FieldCommentsContext} 
                onReady={(context) => {
                    const commentsRepository = context.plugins.get( 'CommentsRepository' );
            
                    commentsRepository.on( 'addCommentThread', (evt, data) => {
                        const thread = commentsRepository.getCommentThread(data.threadId);

                        if (!thread.isAttached) {
                            thread.attachTo(fieldRef.current);
                        }
                    }, { priority: 'lowest' } );

                    // for ( const commentThread of threads.data ) {
                    //     commentsRepository.addCommentThread({ ...commentThread, isFromAdapter: true });
                    // }

                    setCommentsRepository(commentsRepository);
                }} />
            <div id={id} ref={fieldRef} tabIndex="-1" className="field-comment">
                <div className="field-label">
                    {children}
                </div>
                <button className="add-comment" onClick={handleOpenNewCommentThread}>+</button>
                <div className="field-comment-panel" ref={commentsPanelRef}></div>
            </div>
        </>
    );
};

export default FieldComment;