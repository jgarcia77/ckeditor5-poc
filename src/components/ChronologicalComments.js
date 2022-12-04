import React, { useState, useEffect, useRef } from 'react';
import { ChronCommentsContext } from 'ckeditor5-custom-build/build/ckeditor';
import { ChronCommentsAdapter, commentThreads } from '../plugins/CommentingAdapters';

ChronCommentsContext.builtinPlugins = [...ChronCommentsContext.builtinPlugins, ChronCommentsAdapter];

const ChronologicalComments = () => {
    const commentsPanelRef = useRef();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const initContext = async () => {
            const context = await ChronCommentsContext.create({
                licenseKey: 'SsCD/VMf4oJy+RRwL7IFxIQAmjOs3z/I9a5AF6B4lDUGTo2392iE',
                sidebar: {
                    container: commentsPanelRef.current
                }
            });

            const commentsRepository = context.plugins.get( 'CommentsRepository' );
            
            commentsRepository.on( 'addCommentThread', ( evt, data ) => {
                handleCommentThread( commentsRepository.getCommentThread( data.threadId ) );
            }, { priority: 'low' } );

            function handleCommentThread( thread ) {
                if (!thread.isAttached) {
                    thread.attachTo(commentsPanelRef.current);
                }
            }

            for ( const commentThread of commentThreads ) {
                commentsRepository.addCommentThread(commentThread);
            }
        };

        if (!mounted) {
            setMounted(true);
        }

        if (mounted) {
            initContext();
        }
    }, [mounted]);

    return (
        <div ref={commentsPanelRef}></div>
    );
};

export default ChronologicalComments;