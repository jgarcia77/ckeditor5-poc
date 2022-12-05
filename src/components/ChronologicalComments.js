import React, { useState, useEffect, useRef } from 'react';
import { ChronCommentsContext } from 'ckeditor5-custom-build/build/ckeditor';
import { ChronCommentsContextPlugin, commentThreads } from '../plugins/CommentsContextPlugins';

ChronCommentsContext.builtinPlugins = [...ChronCommentsContext.builtinPlugins, ChronCommentsContextPlugin];

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
            // const annotations = context.plugins.get( 'Annotations' );
            
            commentsRepository.on( 'addCommentThread', (evt, data) => {
                const thread = commentsRepository.getCommentThread(data.threadId);

                if (!thread.isAttached) {
                    thread.attachTo(commentsPanelRef.current);
                }

                // const threadView = commentsRepository._threadToController.get( thread ).view;
                // const annotation = annotations.getByInnerView( threadView );

                // annotation.focusableElements.add(commentsPanelRef.current);
            }, { priority: 'low' } );

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