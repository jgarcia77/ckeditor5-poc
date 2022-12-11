import CommentsProvider from "./components/CommentsProvider";
import InlineCommentEditor from "./components/InlineCommentEditor";
import FieldComment from "./components/FieldComment";

const editor1Data =
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

const editor2Data = `
    <h1>Happy Holidays</h1>
    <p>
        <comment-start name="thread-3"></comment-start>
        Feel free to respond
        <comment-end name="thread-3"></comment-end>
    </p>
`;

const FormContent = () => {
    return (
        <CommentsProvider>
            <FieldComment id="field-1">
                <h3>Editor One</h3>
            </FieldComment>
            
            <InlineCommentEditor id="editor-01" initialData={editor1Data} />

            <br />
            <hr />
            <br />

            <FieldComment id="field-2">
                <h3>Editor Two</h3>
            </FieldComment>
            
            <InlineCommentEditor id="editor-02" initialData={editor2Data} />
        </CommentsProvider>
    );
};

export default FormContent;