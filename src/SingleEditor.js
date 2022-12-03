import { useEffect, useState, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';
import CKE from 'ckeditor5-custom-build/build/ckeditor';
import UsersInit from './plugins/UsersInit';

console.log('CKE', CKE);

function SingleComponent() {
  const sideBarRef = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  return (
    <main>
        <div className="content">
          {mounted && <CKEditor editor={ClassicEditor}
            config={{
              licenseKey: 'SsCD/VMf4oJy+RRwL7IFxIQAmjOs3z/I9a5AF6B4lDUGTo2392iE',
              extraPlugins: [
                UsersInit
              ],
              sidebar: {
                container: sideBarRef.current
              },
            }}
            onReady={ editor => {
              console.log('onReady', editor);
              editor.plugins.get( 'AnnotationsUIs' ).switchTo( 'inline' );
            } } />}
          
          <hr />

          {mounted && <CKEditor editor={ClassicEditor}
            config={{
              licenseKey: 'SsCD/VMf4oJy+RRwL7IFxIQAmjOs3z/I9a5AF6B4lDUGTo2392iE',
              extraPlugins: [
                UsersInit
              ],
              sidebar: {
                container: sideBarRef.current
              },
            }}
            onReady={ editor => {
              console.log('onReady', editor);
              editor.plugins.get( 'AnnotationsUIs' ).switchTo( 'inline' );
            } } />}
          </div>
        <div id="sidebar" ref={sideBarRef}></div>
    </main>
  );
}

export default SingleComponent;
