import React from 'react';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';
import { Context } from 'ckeditor5-custom-build/build/ckeditor';
import UsersInit from '../plugins/UsersInit';

const CommentsContext = React.createContext({});

const CommentsProvider = ({ children }) => {
    return (
        <CommentsContext.Provider value={null}>
            <CKEditorContext config={{
            licenseKey: 'SsCD/VMf4oJy+RRwL7IFxIQAmjOs3z/I9a5AF6B4lDUGTo2392iE',
            extraPlugins: [
              UsersInit
            ],
            sidebar: {
                container: document.getElementById('sidebar')
              },
          }} context={Context} onReady={(context) => {
                console.log(context);
                
                // context.plugins.get( 'AnnotationsUIs' ).switchTo( 'inline' );
                
            }}>
                {children}
            </CKEditorContext>
        </CommentsContext.Provider>
    )
};

export default CommentsProvider;