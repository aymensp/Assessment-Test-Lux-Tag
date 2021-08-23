import React, { useState, useEffect } from 'react'
import { EditorState } from "draft-js";
import { useDispatch } from 'react-redux';
import { Editor } from "react-draft-wysiwyg";
import { serialiseEditorStateToRaw } from "draftail";
import { setEditor, setHtml } from '../features/appSlice';
import { stateToHTML } from 'draft-js-export-html';
import './EditorContainer.css'

function EditorContainer() {

    const dispatch = useDispatch();
    let options = {
        defaultBlockTag: 'div',
        blockStyleFn: (block) => {
            if (block.getData().get('text-align')) {
                return {
                    style: {
                        textAlign: block.getData().get('text-align'),
                    },
                }
            }
        },
        inlineStyleFn: (styles) => {
            let key = 'color-';
            let key2 = 'fontsize-'
            let key1 = 'fontfamily-'
            let color = styles.filter((value) => value.startsWith(key)).first();
            let fontS = styles.filter((value) => value.startsWith(key2)).first();
            let fontF = styles.filter((value) => value.startsWith(key1)).first();
            return {
                element: 'span',
                style: {
                    color: color?.replace(key, ''),
                    fontSize: fontS?.replace(key2, ''),
                    fontFamily: fontF?.replace(key1, '')
                },
            };
        },
    };
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const contentState = editorState.getCurrentContent();
    useEffect(() => {
        dispatch(
            setHtml({
                html: stateToHTML(contentState, options)
            }))
        dispatch(
            setEditor({
                editor: serialiseEditorStateToRaw(editorState)
            }))
    }, [editorState,contentState])

    console.log(serialiseEditorStateToRaw(editorState));  
    return (
        <div className='input'> 
            <Editor
                editorState={editorState}
                onEditorStateChange={(editorState) => {
                    setEditorState(editorState);
                }}
                toolbar={{
                    inline: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                }}
            />
        </div>
    );
}

export default EditorContainer
