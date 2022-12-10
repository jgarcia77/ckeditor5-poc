import React, { useState, useEffect, useContext } from 'react';
import useContextPlugins from '../hooks/useContextPlugins';
import ChronologicalComments from './ChronologicalComments';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';
import { CommentsContext } from 'ckeditor5-custom-build/build/ckeditor';
import { InlineCommentsContextPlugin } from '../plugins/CommentsContextPlugins';

CommentsContext.builtinPlugins = [...CommentsContext.builtinPlugins, InlineCommentsContextPlugin];

const CommentingContext = React.createContext({});

const CommentsProvider = ({ children }) => {
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const {
        pluginsAreReady,
    } = useContextPlugins();

    useEffect(() => {
        if (!isLayoutReady && pluginsAreReady) {
            setIsLayoutReady(true);
        }
    }, [isLayoutReady, pluginsAreReady]);

    return (
        <CommentingContext.Provider value={{
            pluginsAreReady
        }}>
            <section className="comment-content">
                <CKEditorContext
                    isLayoutReady={isLayoutReady}
                    config={{
                            licenseKey: 'SsCD/VMf4oJy+RRwL7IFxIQAmjOs3z/I9a5AF6B4lDUGTo2392iE'
                        }}
                    context={CommentsContext}>
                    {isLayoutReady ? children : <></>}
                </CKEditorContext>
            </section>
            <section className="right-panel">
                <ChronologicalComments />
            </section>
        </CommentingContext.Provider>
    )
};

export const useCommentingContext = () => {
    const context = useContext(CommentingContext);
    return context;
};

export default CommentsProvider;