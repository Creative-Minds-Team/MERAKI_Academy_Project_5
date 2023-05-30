const axios = require('axios');

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.OPENAI_API_KEY2;
    const chat =async (req, res) => {
    const {input} =await req.body
        console.log('input:',input);
        if (!API_KEY) {
          res.status(500).json({
            success: false,
            message: 'API key is missing',
          });
          return;
        }
        if (!input) {
          res.status(500).json({
            success: false,
            message: 'input is missing',
          });
          return;
        }
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  };


  const data = {
    'model': 'gpt-3.5-turbo',
    'messages': [
      { "role": 'user',
       "content": input
       }
    ]
  };

  axios.post(API_URL, data, { headers })
    .then(response => {
      res.status(201).json({
        success: true,
        message: "successfully",
        result: response.data.choices[0].message.content
      });
    })
    .catch(error => {
      console.error('API request failed:', API_URL)
      res.status(500).json({message:'API request failed',error:error});
    });
};


module.exports = {
   chat
  };
