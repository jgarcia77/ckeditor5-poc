import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';

const CommentEditor = () => {
    return (
        <CKEditor editor={ClassicEditor} config={{
            toolbar: {
                items: ['comment']
            }
        }}
            onReady={ editor => {
                // editor.plugins.get( 'AnnotationsUIs' ).switchTo( 'inline' );
                console.log('editor has AnnotationsUIs', editor.plugins.has('AnnotationsUIs'));
                console.log('editor has CommentsRepository', editor.plugins.has('CommentsRepository'));
                console.log('editor has Comments', editor.plugins.has('Comments'));
                console.log('editor has Users', editor.plugins.has('Users'));
            } } />
    );
}

export default CommentEditor;