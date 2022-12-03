import React, { useState, useEffect, useRef } from 'react';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';
import { Context } from 'ckeditor5-custom-build/build/ckeditor';
import CommentingContext from '../plugins/CommentingContext';

console.log('Context', Context.builtinPlugins);

Context.builtinPlugins.push(CommentingContext);

const CommentsContext = React.createContext({});

const CommentsProvider = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);
    const sideBarRef = useRef();

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
        }
    }, [isMounted]);

    return (
        <CommentsContext.Provider value={null}>
            <CKEditorContext
                isLayoutReady={isMounted}
                config={{
                    licenseKey: 'SsCD/VMf4oJy+RRwL7IFxIQAmjOs3z/I9a5AF6B4lDUGTo2392iE',
                    extraPlugins: [
                        CommentingContext
                    ],
                    sidebar: {
                        container: sideBarRef.current
                    },}}
                context={Context} 
                onReady={(context) => {
                    console.log('context has CommentsRepository', context.plugins.has('CommentsRepository'));
                    console.log('context has AnnotationsUIs', context.plugins.has('AnnotationsUIs'));
                    console.log('context has Comments', context.plugins.has('Comments'));
                    console.log('context has Users', context.plugins.has('Users'));
            }}>
                <div className="comment-content">{isMounted ? children: <></>}</div>
                <div id="sidebar" ref={sideBarRef}></div>
            </CKEditorContext>
        </CommentsContext.Provider>
    )
};

export default CommentsProvider;