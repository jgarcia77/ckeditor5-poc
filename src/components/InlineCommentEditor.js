import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';
import { v4 as uuidv4 } from 'uuid';
import { 
    selectInlineCommentToAdd, 
    resetAddInlineComment,
    selectInlineCommentToUpdate,
    resetUpdateInlineComment,
    selectInlineCommentToRemove,
    resetRemoveInlineComment,
    selectInlineCommentThreadToRemove,
    resetRemoveInlineCommentThread
} from '../redux/inline';

const currentUser = 'u1';

const InlineCommentEditor = ({ id, initialData }) => {
    const dispatch = useDispatch();
    const buttonRef = useRef();
    const [editor, setEditor] = useState();
    const [commentsRepository, setCommentsRepository] = useState();
    const commentToAdd = useSelector(selectInlineCommentToAdd);
    const commentToUpdate = useSelector(selectInlineCommentToUpdate);
    const commentToRemove = useSelector(selectInlineCommentToRemove);
    const commentThreadToRemove = useSelector(selectInlineCommentThreadToRemove);

    const handleOpenNewCommentThread = () => {
        editor.focus();
        editor.execute('addCommentThread', { threadId: uuidv4() });
    }

    const handleSelectionChange = () => {
        // eslint-disable-next-line
        const selection = document.getSelection();
        // console.log(selection);
    };

    useEffect(() => {
        document.addEventListener('selectionchange', handleSelectionChange);

        return () => document.removeEventListener(handleSelectionChange);
    }, []);

    useEffect(() => {
        if (!commentToAdd) {
            return;
        }

        if (commentsRepository.hasCommentThread(commentToAdd.threadId)) {
            const commentThread = commentsRepository.getCommentThread(commentToAdd.threadId);

            if (commentThread.channelId === id) {
                const comment = {
                    commentId: commentToAdd.commentId,
                    authorId: currentUser,
                    content: commentToAdd.content,
                    createdAt: new Date(),
                    attributes: commentToAdd.attributes,
                    isFromAdapter: true
                };
                
                commentThread.addComment(comment);
                editor.focus();
                commentsRepository.setActiveCommentThread(commentToAdd.threadId);

                dispatch(resetAddInlineComment());
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

        if (commentThread.channelId === id) {
            const comment = commentThread.getComment(commentToUpdate.commentId);
            comment.update({ ...commentToUpdate, isFromAdapter: true });

            editor.focus();
                commentsRepository.setActiveCommentThread(commentToUpdate.threadId);

            dispatch(resetUpdateInlineComment());
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

        if (commentThread.channelId === id) {
            const comment = commentThread.getComment(commentToRemove.commentId);
            comment.remove({ ...commentToRemove, isFromAdapter: true });

            dispatch(resetRemoveInlineComment());
        }
    }, [commentToRemove]);

    useEffect(() => {
        if (!commentThreadToRemove) {
            return;
        }

        if (!commentsRepository.hasCommentThread(commentThreadToRemove.threadId)) {
            return;
        }

        const commentThread = commentsRepository.getCommentThread(commentThreadToRemove.threadId);

        if (commentThread.channelId === id) {
            commentThread.remove({ isFromAdapter: true });
            dispatch(resetRemoveInlineCommentThread());
        }

    }, [commentThreadToRemove]);

    return (
        <>
            <div>
                <button onClick={handleOpenNewCommentThread} ref={buttonRef}>Open New Comment Thread</button>
            </div>
            <CKEditor 
                id={id}
                data={initialData}
                editor={ClassicEditor} 
                config={{
                    toolbar: {
                        items: ['comment']
                    },
                    collaboration: {
                        channelId: id
                    }
                }}
                onReady={(editor) => {
                    const commentsRepository = editor.plugins.get( 'CommentsRepository' );
                    setEditor(editor);
                    setCommentsRepository(commentsRepository);
                }}
                onChange={(event, editor) => {
                    const commentsRepository = editor.plugins.get( 'CommentsRepository' );
                    const allThreads = commentsRepository.getCommentThreads( {
                        skipNotAttached: false,
                        skipEmpty: true,
                        toJSON: true
                    } );
                    const attachedThreads = commentsRepository.getCommentThreads( {
                        skipNotAttached: true,
                        skipEmpty: true,
                        toJSON: true
                    } );
                    
                    console.log('allThreads', allThreads);
                    console.log('attachedThreads', attachedThreads);
                    console.log('data', editor.getData());
                }} />
        </>
    );
}

export default InlineCommentEditor;