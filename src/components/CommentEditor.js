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

const CommentEditor = ({ id }) => {
    return (
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
            onReady={(editor) => {} }
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
    );
}

export default CommentEditor;