import { ContextPlugin } from 'ckeditor5-custom-build/build/ckeditor';

class CommentsAdapter extends ContextPlugin {
    init() {
        console.log('I am the', this.Name);
        const users = this.context.plugins.get( 'Users' );

        users.addUser( {
            id: 'u1',
            name: 'Josue Garcia',
            initials: 'JG',
            isAnonymous: false
        } );

        users.defineMe( 'u1' );

        const commentsRepository = this.context.plugins.get('CommentsRepository');

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