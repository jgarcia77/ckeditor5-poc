import { ContextPlugin } from 'ckeditor5-custom-build/build/ckeditor';

export class CommentsContextPlugin extends ContextPlugin {
    init() {
        const users = this.context.plugins.get( 'Users' );

        for(let user in this.users) {
            users.addUser(this.users[user]);
        }

        users.defineMe(this.currentUser);
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
            getCommentThread: this.commentingService.getCommentThread
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
            removeComment: this.commentingService.removeComment
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
            removeComment: this.commentingService.removeComment
        };
    }
}