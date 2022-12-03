import CommentsProvider from "./components/CommentsProvider";
import CommentEditor from "./components/CommentEditor";

const FormContent = () => {
    return (
        <CommentsProvider>
            <h3>Editor One</h3>
            <CommentEditor />
            <h3>Editor Two</h3>
            <CommentEditor />
        </CommentsProvider>
    );
};

export default FormContent;