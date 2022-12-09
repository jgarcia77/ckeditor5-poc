import React, { useState, useEffect, useRef } from 'react';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';
import { ChronCommentsContext } from 'ckeditor5-custom-build/build/ckeditor';
import { ChronCommentsContextPlugin, commentThreads } from '../plugins/CommentsContextPlugins';

ChronCommentsContext.builtinPlugins = [...ChronCommentsContext.builtinPlugins, ChronCommentsContextPlugin];

const ChronologicalComments = ({ providerIsReady }) => {
    const commentsPanelRef = useRef();
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        if (!isLayoutReady) {
            setIsLayoutReady(true);
        }
    }, [isLayoutReady]);

    return (
        <>
            <CKEditorContext
                isLayoutReady={isLayoutReady && providerIsReady}
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
            
                    commentsRepository.on( 'addCommentThread', (evt, data) => {
                        const thread = commentsRepository.getCommentThread(data.threadId);

                        if (!thread.isAttached) {
                            thread.attachTo(commentsPanelRef.current);
                        }
                    }, { priority: 'lowest' } );

                    for ( const commentThread of commentThreads ) {
                        commentsRepository.addCommentThread(commentThread);
                    }
                }} />
            <div ref={commentsPanelRef}></div>
        </>
    );
};

export default ChronologicalComments;