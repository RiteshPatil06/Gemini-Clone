import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import PromptBar from '../ImageSearch/PromptBar'
// import { auth } from '../../firebase/Firebase'
// import { Link } from 'react-router-dom'


const Main = () => {

  const {onSent,newChat, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)

  const [showDropdown, setShowDropdown] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSend = (input, imageBase64) => {
    console.log('Input:', input);
    console.log('Image Base64:', imageBase64);
    // Handle the input and imageBase64 data
  };


  const handleCardClick = (prompt) => {
    setInput(prompt)
    onSent(prompt)
  }


  const handleUserIconClick = () => {
    setShowDropdown(!showDropdown)
    if (!showDropdown) {
      <img src={assets.user_icon} alt="" onClick={handleUserIconClick} 
         />
    } else {
       return null
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
  }

  return (
    <div className='main'>
      <div  className="nav" >
        <p onClick={() => newChat() }>Perman.</p>
        {showDropdown ? null : (
          <img src={assets.user_icon} alt="" onClick={handleUserIconClick} 
         /> 
        )}
        
        {showDropdown && (
          <div className="flex flex-col w-full max-w-sm py-5 space-y-2 text-center bg-gray-200 rounded-lg absolute top-0 right-10 mt-10 ">
            <h1 className="text-xl  font-semibold">Sign in to your account</h1>
	           <a className="text-sm " href="/" previewlistener="true">Or start your free trial</a>
            <form onSubmit={handleLogin}>
            <div className="flex flex-col">
              <label>Username:</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} 
              className="rounded-md m-auto " />
              <br />
              <label>Password:  </label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
              className="-mt-1 m-auto rounded-md border-gray-400 "/>
              <br />
              <button onClick={handleUserIconClick} type="submit"
              className=" w-20 m-auto font-semibold rounded bg-violet-600 text-gray-50">Login</button>
            </div>
            </form>
          </div>
        )} 
      </div>
      <div className="main-container">

        {!showResult ? 
        <>
        <div className="greet">
          <p><span>Hello, {!username ? 'Dev' : username} .</span></p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card" onClick={() => handleCardClick('Suggest beautiful places to see on an upcoming road trip.')}>
            <p>Suggest beautiful places to see on an upcoming road trip.</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card" onClick={() => handleCardClick('Briefly summarize this concept: urban planning.')}>
            <p>Briefly summarize this concept: urban planning.</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card" onClick={() => handleCardClick('Brainstorm team bonding activities for our work retreat.')}>
            <p>Brainstorm team bonding activities for our work retreat.</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card" onClick={() => handleCardClick('Improve the readability of the following code.')}>
            <p>Improve the readability of the following code.</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
        </>  
        : <div className='result'>
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading ? 
           <div className="loader">
              <hr  />
              <hr />
              <hr />
           </div>
           :   <p dangerouslySetInnerHTML={{__html:resultData}}></p>
          }
          </div>
        </div>
        }
        <div>
        <PromptBar onSend={handleSend} /></div>

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
      </div>
    </div>
  )
}

export default Main
