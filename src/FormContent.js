import CommentsProvider from "./components/CommentsProvider";
import CommentEditor from "./components/CommentEditor";

const FormContent = () => {
    return (
        <CommentsProvider>
            <CommentEditor />
        </CommentsProvider>
    );
};

export default FormContent;