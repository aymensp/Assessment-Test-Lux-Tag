import './App.css';
import {useState , Component} from 'react'
import { render } from "react-dom";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import {
  DraftailEditor,
  createEditorStateFromRaw,
  serialiseEditorStateToRaw
} from "draftail";
class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onEditorStateChange = (editorState) => {
    // console.log(editorState)
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState } = this.state;
    console.log(editorState.getBlockTree());
    return (
      <div className="editor">
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          
        />
         {JSON.stringify(serialiseEditorStateToRaw(editorState))}

      </div>
    );
  }
}


function App() {

  const [text,setText]=useState("");
  console.log(text)
  return (
<div >
<EditorContainer/>

<div className='input'>
<input onChange={(event)=>setText(event.target.value)} value={text} type="text"></input>
</div>
<div className='right'>

<div class="iphone">
<div className="i">
</div>
<div className="b">
</div>
<div className='text'>
{text}
</div>
</div>
</div>
</div>
  );
}

export default App;
