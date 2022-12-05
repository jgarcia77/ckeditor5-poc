import { ContextPlugin } from 'ckeditor5-custom-build/build/ckeditor';

export const commentsContextPlugins = Object.freeze({
    InlineCommentsContextPlugin: 'InlineCommentsContextPlugin',
    ChronCommentsContextPlugin: 'ChronCommentsContextPlugin',
    FieldCommentsContextPlugin: 'FieldCommentsContextPlugin'
});

export const commentThreads = [
    {
        threadId: 'thread-1',
        comments: [
            {
                commentId: 'comment-1',
                authorId: 'u1',
                content: '<p>Are we sure we want to use a made-up disorder name?</p>',
                createdAt: new Date( '09/20/2018 14:21:53' ),
                attributes: {}
            },
            {
                commentId: 'comment-2',
                authorId: 'u1',
                content: '<p>Why not?</p>',
                createdAt: new Date( '09/21/2018 08:17:01' ),
                attributes: {}
            }
        ]
    }
];

export class CommentsContextPlugin extends ContextPlugin {
    init() {
        const users = this.context.plugins.get( 'Users' );

        users.addUser({
            id: 'u1',
            name: 'Josue Garcia',
            initials: 'JG',
            isAnonymous: false
        });

        users.defineMe( 'u1' );

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

        // Load the comment threads data.
        for ( const commentThread of commentThreads ) {
            commentsRepository.addCommentThread( commentThread );
        }

        commentsRepository.adapter = {
            addComment(data) {
                console.log('adapter.addComment', data);
                return Promise.resolve();
            },
            updateComment(data) {
                console.log('adapter.updateComment', data);
                return Promise.resolve();
            },
            removeComment(data) {
                console.log('adapter.removeComment', data);
                return Promise.resolve();
            },
            getCommentThread(data) {
                console.log( 'adapter.getCommentThread', data );
                return Promise.resolve();
            }
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
                console.log('adapter.addComment', data);
                return Promise.resolve();
            },
            updateComment(data) {
                console.log('adapter.updateComment', data);
                return Promise.resolve();
            },
            removeComment(data) {
                console.log('adapter.removeComment', data);
                return Promise.resolve();
            },
            getCommentThread(data) {
                console.log( 'adapter.getCommentThread', data );
                return Promise.resolve();
            }
        };
    }
}