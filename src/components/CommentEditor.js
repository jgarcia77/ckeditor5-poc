import { useRef, useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';
import { v4 as uuidv4 } from 'uuid';

const CommentEditor = ({ id, initialData }) => {
    const buttonRef = useRef();
    const [editor, setEditor] = useState();

    const handleOpenNewCommentThread = () => {
        editor.focus();
        editor.execute('addCommentThread', { threadId: uuidv4() });
    }

    const handleSelectionChange = () => {
        const selection = document.getSelection();
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
                    setEditor(editor);
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
                }} />
        </>
    );
}

export default CommentEditor;