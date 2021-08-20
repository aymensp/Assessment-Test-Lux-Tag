import './App.css';
import { useState ,useEffect } from 'react'
import { EditorState } from "draft-js";
import { useDispatch } from 'react-redux';
import { Editor } from "react-draft-wysiwyg";
import { useSelector } from 'react-redux';
import {
  serialiseEditorStateToRaw
} from "draftail";
import { selectEditor, setEditor } from './features/appSlice';
function EditorContainer() {

  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  useEffect(() => {
    dispatch(setEditor({
      editor: serialiseEditorStateToRaw(editorState)
    }))
  }, [editorState])
  return (
    <div >
      <Editor
        editorState={editorState}
        onEditorStateChange={(editorState) => {
          setEditorState(editorState);
        }}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </div>
  );
}



function App() {

  const editor = useSelector(selectEditor);
  console.log(editor?.blocks[0])

  return (
    <div className='App'>
      <div className='input'>
        {/* <input onChange={(event) => setText(event.target.value)} value={text} type="text"></input> */}
        <EditorContainer />
      </div>
        <div className="iphone">
          <div className="microphone">
          </div>
          <div className="cam">
          </div>
          <div className='textt'>
          {editor?.blocks.map((block) => {
             
             return (<div key={block?.key}> 
                     <span > {block?.text} </span>
                    </div>)
         })}
          </div>
        </div>  
    </div>
  );
}

export default App;
