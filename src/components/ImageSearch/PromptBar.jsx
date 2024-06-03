// src/components/PromptBar.jsx
import React, { useContext, useState } from 'react';
import './PromptBar.css'; // Create this file for styling
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';


 
const PromptBar = ({ onSend }) => {
  const [input, setInput] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const {onSent} =  useContext(Context)


  const handleSend = () => {
    // Check if there is text input or an image
    if (input.trim() || imageBase64) {
        // Send the input and image
        onSent(input, imageBase64);

        // Clear the input and image state
        setInput('');
        setImageBase64('');
    }
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

   {/* <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text"  placeholder='Enter a prompt here'/>
            <div>
              <img src={assets.gallery_icon} alt="" onClick={handleImageSearch} />
              <img src={assets.mic_icon} alt="" />
              {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
            </div>
          </div >
          <p className='disclaimer'>Perman. may display inaccurate info, including about people, so double-check its responses.<a href=''> Your privacy and Perman. Apps.</a></p>
        </div> */}

  return (
    <div className="main-bottom">
      <div className="search-box">

     
      <input
        type="text"
        placeholder="Enter a prompt here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="prompt-bar-icons">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="imageUpload"
        />
        <label htmlFor="imageUpload">
          <img src={assets.gallery_icon} alt="Gallery Icon" />
        </label>
        <img src={assets.mic_icon} alt="Mic Icon" />
        {input ? <img onClick={() => handleSend()} src={assets.send_icon} alt="" /> : null}
        </div>
      </div>
    </div>
  );
};

export default PromptBar;
