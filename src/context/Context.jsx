import { createContext, useState } from "react"
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const  [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [imageBase64, setImageBase64] = useState('');

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false)
    }
    
    const onSent = async (text, imageBase64) => {
        // Reset state
        setResultData("");
        setLoading(true);
        setShowResult(true);
    
        // Determine the prompt to use
        const prompt = `${text.trim()} ${imageBase64 ? `**image:${imageBase64}**` : ""}`;
        if (text.trim() && !imageBase64) {
            setPrevPrompts(prev => [...prev, text]);
        }
        setRecentPrompt(prompt);
    
        // Fetch response
        let response = await run(prompt, imageBase64);
    
        // Format response
        const responseArray = response.split("**");
        let formattedResponse = responseArray.map((part, index) => 
            index % 2 === 1 ? `<b>${part}</b>` : part
        ).join("");
    
        formattedResponse = formattedResponse.split("*").join("<br>");
        const responseWords = formattedResponse.split(" ");
    
        // Display words with delay
        responseWords.forEach((word, index) => {
            delayPara(index, word + " ");
        });
    
        // Finalize state
        setLoading(false);
        setInput("");
        setImageBase64("");

        console.log("Prompt:", prompt);

    };
    

    const intialState = {
        user: null
    }

    

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        intialState,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;