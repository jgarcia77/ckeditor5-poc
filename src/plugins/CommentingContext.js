import { ContextPlugin } from 'ckeditor5-custom-build/build/ckeditor';

export default class CommentingContext extends ContextPlugin {
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