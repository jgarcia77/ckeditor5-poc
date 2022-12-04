import React, { useState, useEffect } from 'react';
import ChronologicalComments from './ChronologicalComments';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';
import { CommentsContext } from 'ckeditor5-custom-build/build/ckeditor';
import { CommentsAdapter, InlineCommentsAdapter } from '../plugins/CommentingAdapters';

CommentsContext.builtinPlugins = [...CommentsContext.builtinPlugins, InlineCommentsAdapter];

const CommentingContext = React.createContext({});

const CommentsProvider = ({ children }) => {
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [inlineCommentsRepository, setInlineCommentsRepository] = useState();

    const registerRepository = (commentsRepository) => {
        // const thread1 = commentsRepository.getCommentThread('thread-1');
        // const comment1 = thread1.getComment('comment-1');
        // comment1.update({ content: 'Testing 1,2,3', isFromAdapter: true });
        // thread1.addComment({
        //     commentId: 'comment-3',
        //     content: '<p>this is a new comment</p>',
        //     authorId: 'u1',
        //     createdAt: new Date( '12/4/2020 08:17:01' ),
        //     attributes: {},
        //     isFromAdapter: true
        // });
        // const comment2 = thread1.getComment('comment-2');
        // comment2.remove({ isFromAdapter: true });
        // thread1.remove();
        setInlineCommentsRepository(commentsRepository);
    };

    useEffect(() => {
        if (!isLayoutReady) {
            CommentsAdapter.prototype.registerRepository = registerRepository;
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