import { useRef, useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';

const CommentEditor = ({ id, initialData }) => {
    const buttonRef = useRef();
    const targetComment = useRef();
    const [commentsRepository, setCommentsRepository] = useState();

    const handleOpenNewCommentThread = () => commentsRepository.openNewCommentThread({
        channelId: id,
        threadId: '654654654',
        target: targetComment.current
    });

    const handleSelectionChange = () => {
        const selection = document.getSelection();
        targetComment.current = selection.anchorNode.parentElement;
        console.log(selection);
    };

    useEffect(() => {
        document.addEventListener('selectionchange', handleSelectionChange);

        return () => document.removeEventListener(handleSelectionChange);
    }, []);

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
                    setCommentsRepository(commentsRepository)
                }}
                onChange={(event, editor) => {
                    // const commentsRepository = editor.plugins.get( 'CommentsRepository' );
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
                }} />
        </>
    );
}

export default CommentEditor;