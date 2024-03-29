import { ContextPlugin } from 'ckeditor5-custom-build/build/ckeditor';

export class CommentsContextPlugin extends ContextPlugin {
    init() {
        const users = this.context.plugins.get( 'Users' );

        for(let user in this.users) {
            users.addUser(this.users[user]);
        }

        users.defineMe(this.currentUser.id);
    }
};

export class InlineCommentsContextPlugin extends CommentsContextPlugin {
    init() {
        super.init();

        const commentsRepository = this.context.plugins.get('CommentsRepository');

        commentsRepository.adapter = {
            addComment: this.commentingService.addComment,
            updateComment: this.commentingService.updateComment,
            removeComment: this.commentingService.removeComment,
            getCommentThread: this.commentingService.getCommentThread,
            removeCommentThread: (data) => {
                console.log("Remove comment thread inline");
                console.log(data);
                return Promise.resolve();
            }
        };
    }
}

export class ChronCommentsContextPlugin extends CommentsContextPlugin {
    init() {
        super.init();

        const commentsRepository = this.context.plugins.get('CommentsRepository');

        commentsRepository.adapter = {
            addComment: this.commentingService.addComment,
            updateComment: this.commentingService.updateComment,
            removeComment: this.commentingService.removeComment,
            removeCommentThread: this.commentingService.removeCommentThread
        };
    }
}

export class FieldCommentsContextPlugin extends CommentsContextPlugin {
    init() {
        super.init();

        const commentsRepository = this.context.plugins.get('CommentsRepository');

        commentsRepository.adapter = {
            addComment: this.commentingService.addComment,
            updateComment: this.commentingService.updateComment,
            removeComment: this.commentingService.removeComment,
            removeCommentThread: this.commentingService.removeCommentThread
        };
    }
}