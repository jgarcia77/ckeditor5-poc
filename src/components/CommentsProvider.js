import React, { useState, useEffect } from 'react';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';
import { CommentsContext } from 'ckeditor5-custom-build/build/ckeditor';
import { InlineCommentsAdapter } from '../plugins/CommentingAdapters';

CommentsContext.builtinPlugins = [...CommentsContext.builtinPlugins, InlineCommentsAdapter];

const CommentingContext = React.createContext({});

const CommentsProvider = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
        }
    }, [isMounted]);

    return (
        <CommentingContext.Provider value={null}>
            <section className="comment-content">
                <CKEditorContext
                    isLayoutReady={isMounted}
                    config={{
                            licenseKey: 'SsCD/VMf4oJy+RRwL7IFxIQAmjOs3z/I9a5AF6B4lDUGTo2392iE',
                        }}
                    context={CommentsContext} 
                    onReady={(context) => {
                        console.log('context has CommentsRepository', context.plugins.has('CommentsRepository'));
                        console.log('context has AnnotationsUIs', context.plugins.has('AnnotationsUIs'));
                        console.log('context has Comments', context.plugins.has('Comments'));
                        console.log('context has Users', context.plugins.has('Users'));
                }}>
                    {children}
                </CKEditorContext>
            </section>
            <section className="right-panel">
                Sidebar
            </section>
        </CommentingContext.Provider>
    )
};

export default CommentsProvider;