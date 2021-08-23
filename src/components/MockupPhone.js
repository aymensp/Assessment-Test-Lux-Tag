import React from 'react'
import './MockupPhone.css';
import { useSelector } from 'react-redux';
import { selectHtml} from '../features/appSlice';

function MockupPhone( ) {

  const html = useSelector(selectHtml);

    return (
        <div className="iphone">
        <div className="microphone">
        </div>
        <div className="cam">
        </div>
        <div className='display-text-phone'>
        <p className='title'>Text</p>
        <div  dangerouslySetInnerHTML={{__html: html}}>
        </div>
        </div>      
      </div>
    
    )
}

export default MockupPhone
