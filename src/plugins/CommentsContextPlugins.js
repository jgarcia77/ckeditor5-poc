import { ContextPlugin } from 'ckeditor5-custom-build/build/ckeditor';

export const commentsContextPlugins = Object.freeze({
    InlineCommentsContextPlugin: 'InlineCommentsContextPlugin',
    ChronCommentsContextPlugin: 'ChronCommentsContextPlugin',
    FieldCommentsContextPlugin: 'FieldCommentsContextPlugin'
});

export class CommentsContextPlugin extends ContextPlugin {
    init() {
        const users = this.context.plugins.get( 'Users' );

        for(let user in this.users) {
            users.addUser(this.users[user]);
        }

        users.defineMe(this.currentUser);

        const commentsRepository = this.context.plugins.get('CommentsRepository');

        this.registerRepository(this.Name, commentsRepository);
    }
};

export class InlineCommentsContextPlugin extends CommentsContextPlugin {
    get Name() {
        return commentsContextPlugins.InlineCommentsContextPlugin
    }

    init() {
        super.init();

        const commentsRepository = this.context.plugins.get('CommentsRepository');

        commentsRepository.adapter = {
            addComment: this.commentingService.addComment.bind(this),
            updateComment: this.commentingService.updateComment.bind(this),
            removeComment: this.commentingService.removeComment.bind(this),
            getCommentThread: this.commentingService.getCommentThread.bind(this)
        };
    }
}

export class ChronCommentsContextPlugin extends CommentsContextPlugin {
    get Name() {
        return commentsContextPlugins.ChronCommentsContextPlugin
    }

    init() {
        super.init();

        const commentsRepository = this.context.plugins.get('CommentsRepository');

        commentsRepository.adapter = {
            addComment(data) {
                console.log(this.Name, 'adapter.addComment', data);
                return Promise.resolve();
            },
            updateComment(data) {
                console.log(this.Name, 'adapter.updateComment', data);
                return Promise.resolve();
            },
            removeComment(data) {
                console.log(this.Name, 'adapter.removeComment', data);
                return Promise.resolve();
            },
            getCommentThread(data) {
                console.log(this.Name, 'adapter.getCommentThread', data );
                return Promise.resolve();
            }
        };
    }
}