import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';

const initialData =
                `<h2>
                    <comment-start name="thread-1"></comment-start>
                    Bilingual Personality Disorder
                    <comment-end name="thread-1"></comment-end>
                </h2>
                <p>
                    This may be the first time you hear about this made-up disorder but it actually isn’t so far from the truth.
                    As recent studies show, the language you speak has more effects on you than you realize.
                    According to the studies, the language a person speaks affects their cognition,
                    behavior, emotions and hence <strong>their personality</strong>.
                </p>
                <p>
                    <comment-start name="thread-2"></comment-start>This shouldn’t come as a surprise<comment-end name="thread-2"></comment-end>
                    <a href="https://en.wikipedia.org/wiki/Lateralization_of_brain_function">since we already know</a>
                    that different regions of the brain become more active depending on the activity.
                    The structure, information and especially <strong>the culture</strong> of languages varies substantially
                    and the language a person speaks is an essential element of daily life.
                </p>`

const CommentEditor = () => {
    return (
        <CKEditor data={initialData} editor={ClassicEditor} config={{
            toolbar: {
                items: ['comment']
            }
        }}
            onReady={ editor => {
                // editor.plugins.get( 'AnnotationsUIs' ).switchTo( 'inline' );
                // console.log('editor has AnnotationsUIs', editor.plugins.has('AnnotationsUIs'));
                // console.log('editor has CommentsRepository', editor.plugins.has('CommentsRepository'));
                // console.log('editor has Comments', editor.plugins.has('Comments'));
                // console.log('editor has Users', editor.plugins.has('Users'));
            } } />
    );
}

export default CommentEditor;