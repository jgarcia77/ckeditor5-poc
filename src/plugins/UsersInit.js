export default class UsersInit {
    static get requires() {
        return [ 'Users' ];
    }

    constructor( editor ) {
        this.editor = editor;
    }

    init() {
        const users = this.editor.plugins.get( 'Users' );

        users.addUser( {
            id: 'u1',
            name: 'Josue Garcia',
            initials: 'JG',
            isAnonymous: false
        } );

        users.defineMe( 'u1' );
    }
}