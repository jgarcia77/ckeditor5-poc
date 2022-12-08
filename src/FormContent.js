import CommentsProvider from "./components/CommentsProvider";
import CommentEditor from "./components/CommentEditor";

const FormContent = () => {
    return (
        <CommentsProvider>
            <h3>Editor One</h3>
            <CommentEditor id="editor-01" />

            {/* <h3>Editor Two</h3>
            <CommentEditor id="editor-02" /> */}
        </CommentsProvider>
    );
};

export default FormContent;