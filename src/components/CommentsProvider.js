import React, { useState, useEffect } from 'react';
import ChronologicalComments from './ChronologicalComments';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';
import { CommentsContext } from 'ckeditor5-custom-build/build/ckeditor';
import { InlineCommentsAdapter } from '../plugins/CommentingAdapters';

CommentsContext.builtinPlugins = [...CommentsContext.builtinPlugins, InlineCommentsAdapter];

const CommentingContext = React.createContext({});

const CommentsProvider = ({ children }) => {
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        if (!isLayoutReady) {
            setIsLayoutReady(true);
        }
    }, [isLayoutReady]);

    return (
        <CommentingContext.Provider value={null}>
            <section className="comment-content">
                <CKEditorContext
                    isLayoutReady={isLayoutReady}
                    config={{
                            licenseKey: 'SsCD/VMf4oJy+RRwL7IFxIQAmjOs3z/I9a5AF6B4lDUGTo2392iE',
                        }}
                    context={CommentsContext} 
                    onReady={(context) => {
                        // console.log('context has CommentsRepository', context.plugins.has('CommentsRepository'));
                        // console.log('context has AnnotationsUIs', context.plugins.has('AnnotationsUIs'));
                        // console.log('context has Comments', context.plugins.has('Comments'));
                        // console.log('context has Users', context.plugins.has('Users'));
                }}>
                    {isLayoutReady ? children : <></>}
                </CKEditorContext>
            </section>
            <section className="right-panel">
                <ChronologicalComments />
            </section>
        </CommentingContext.Provider>
    )
};

export default CommentsProvider;