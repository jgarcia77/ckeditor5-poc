import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Editor } from 'ckeditor5-custom-build/build/ckeditor';

console.log('Editornpm ', Editor);

const CommentEditor = () => {
    return (
        <CKEditor editor={Editor} config={{
            toolbar: {
                items: []
            }
        }}
            onReady={ editor => {
              editor.plugins.get( 'AnnotationsUIs' ).switchTo( 'wideSidebar' );
            } } />
    );
}

export default CommentEditor;