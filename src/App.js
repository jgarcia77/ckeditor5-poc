import './App.css';
import { useEffect, useState, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Editor } from 'ckeditor5-custom-build/build/ckeditor';
import UsersInit from './plugins/UsersInit';

function App() {
  const sideBarRef = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          CKEditor POC
        </p>
      </header>
      <main>
        <div className="content">
          {mounted && <CKEditor editor={Editor}
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
              editor.plugins.get( 'AnnotationsUIs' ).switchTo( 'wideSidebar' );
            } } />}
          </div>
        <div id="sidebar" ref={sideBarRef}></div>
      </main>
    </div>
  );
}

export default App;
