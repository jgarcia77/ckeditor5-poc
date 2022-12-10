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
            addComment(data) {
                console.log('Chronological => adapter.addComment', data);
                return Promise.resolve();
            },
            updateComment(data) {
                console.log('Chronological => adapter.updateComment', data);
                return Promise.resolve();
            },
            removeComment(data) {
                console.log('Chronological => adapter.removeComment', data);
                return Promise.resolve();
            },
            getCommentThread(data) {
                console.log('Chronological => adapter.getCommentThread', data );
                return Promise.resolve();
            }
        };
    }
}