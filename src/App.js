import './App.css';
import React, { useState, useEffect } from 'react'
import { EditorState } from "draft-js";
import { useDispatch } from 'react-redux';
import { Editor } from "react-draft-wysiwyg";
import { useSelector } from 'react-redux';
import { serialiseEditorStateToRaw } from "draftail";
import { selectEditor, setEditor } from './features/appSlice';

function EditorContainer() {

  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  useEffect(() => {
    dispatch(setEditor({
      editor: serialiseEditorStateToRaw(editorState)
    }))
  }, [editorState, dispatch])
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
  // console.log(editor?.blocks[0].text.substring(editor?.blocks[0].inlineStyleRanges[0]?.offset,editor?.blocks[0].inlineStyleRanges[0].offset+editor?.blocks[0].inlineStyleRanges[0].length))
  console.log(editor?.blocks[0])

  //   const text = document.getElementsByClassName('public-DraftEditor-content')
  //   const shapesArrHCSpread = [...(text )];
  // // add the text node to the newly created div

  // const hamma = React.createElement(shapesArrHCSpread[0]);
  const type = {
    h1: "header-one",
    p: "unstyled",
    h2: "header-two"
  }

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

            return (<div key={block?.key} style={block?.data}>



              <span > {block?.text.substring(0, block?.inlineStyleRanges[0]?.offset)} </span>
              {block?.inlineStyleRanges.map((offset) => {
                return (
                  <span style={{
                    fontSize: offset?.style.substring(9, 11) + "px",
                    fontStyle: offset?.style,
                    textDecoration: offset?.style,
                    fontWeight: offset?.style,
                    fontFamily: offset?.style.substring(10, 17)
                  }}>
                    {block?.text.substring(offset.offset, offset.lenght)}</span>
                )
              })}

            </div>)
          })}
        </div>
      </div>
    </div>
  )
}

export default App;
