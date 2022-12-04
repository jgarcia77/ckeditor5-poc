import { ContextPlugin } from 'ckeditor5-custom-build/build/ckeditor';

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
]

class CommentsAdapter extends ContextPlugin {
    init() {
        const users = this.context.plugins.get( 'Users' );

        users.addUser( {
            id: 'u1',
            name: 'Josue Garcia',
            initials: 'JG',
            isAnonymous: false
        } );

        users.defineMe( 'u1' );

        const commentsRepository = this.context.plugins.get('CommentsRepository');

        // Load the comment threads data.
        for ( const commentThread of commentThreads ) {
            commentsRepository.addCommentThread( commentThread );
        }

        commentsRepository.adapter = {
            addComment(data) {
                console.log('addComment', data);
                return Promise.resolve();
            },
            updateComment(data) {
                console.log('updateComment', data);
                return Promise.resolve();
            },
            removeComment(data) {
                console.log('removeComment', data);
                return Promise.resolve();
            },
            getCommentThread(data) {
                console.log( 'Getting comment thread', data );
                return Promise.resolve();
            }
        };
    }
};

export class InlineCommentsAdapter extends CommentsAdapter {
    get Name() {
        return 'InlineCommentsAdapter'
    }
}

export class ChronCommentsAdapter extends ContextPlugin {
    init() {
        const users = this.context.plugins.get( 'Users' );

        users.addUser( {
            id: 'u1',
            name: 'Josue Garcia',
            initials: 'JG',
            isAnonymous: false
        } );

        users.defineMe( 'u1' );
    }
}