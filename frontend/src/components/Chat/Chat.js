import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Chat.css";
import axios from "axios";


import { useSelector } from "react-redux";
const Chat = () => {
  const state = useSelector((state) => {
    return {
      language: state.auth.language
    };
  });
 const [input, setContent] = useState("");
  const [output, setOutput] = useState("");
  // const [apiKey, setApiKey] = useState(process.env.OPENAI_API_KEY2);
  
  const ChatNow = async () => {
    console.log(input);
    // const apiKey = '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'
    // console.log('API_KEY:',apiKey);
    // const requset = {
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "user",
    //       content: content,
    //     },
    //   ],

    //   temperature: 0.7,
    //   max_tokens: 200,
    // };
   
    await axios
      .post  (`http://localhost:5000/chat/`,{input})
      .then((result) => {
        console.log(result);
        setOutput(result.data.result)
      })
      .catch((err) => {
        console.log(err.message);
        setOutput(err.message)
      });
  };
  
  return (
    <div className="main-container">
      <p className="main-title">{state.language=="ar"?"سأكون سعيد باستجابتي لاي سؤال":"Good Day, Ask Me Please! "}</p>
      <div className="main-content">
        <input
          className="word-input"
          type="search"
          placeholder=
          {state.language=="ar"?"قم بالسؤال عن الصيانة  ":"Inquire about services & maintenance"}
          onChange={(e)=>{
const value=e.target.value
setContent(value)
          }}
        ></input>
        <Button size="sm" className="submit-btn" onClick={ChatNow}>
          {"  "}
          {state.language=="ar"?"تأكيد":"Submit"}
        </Button>
        <Button size="sm" className="submit-btn" onClick={()=>{
            setOutput('')
        }}>
          {"  "}
          {state.language=="ar"?"الغاء":"Clear"}
        </Button>
      </div>
      <div className="reply-content " style={{ overflow: "auto" }}>
        <div style={{ maxHeight: "100%"}}>{output}</div>
      </div>
    </div>
  );
};

export default Chat;
