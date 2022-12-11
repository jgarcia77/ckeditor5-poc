import React, { useState, useEffect, useRef } from 'react';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';
import { FieldCommentsContext } from 'ckeditor5-custom-build/build/ckeditor';
import { FieldCommentsContextPlugin } from '../plugins/CommentsContextPlugins';
import { useCommentingContext } from './CommentsProvider';
import { v4 as uuidv4 } from 'uuid';

FieldCommentsContext.builtinPlugins = [...FieldCommentsContext.builtinPlugins, FieldCommentsContextPlugin];

const currentUser = 'u1';

const FieldComment = ({ id, children }) => {
    const fieldRef = useRef();
    const commentsPanelRef = useRef();
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [commentsRepository, setCommentsRepository] = useState();
    const { pluginsAreReady } = useCommentingContext();

    useEffect(() => {
        if (!isLayoutReady) {
            setIsLayoutReady(true);
        }
    }, [isLayoutReady]);

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