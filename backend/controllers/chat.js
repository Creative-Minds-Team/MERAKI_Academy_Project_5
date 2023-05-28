const axios = require('axios');

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.OPENAI_API_KEY2;
console.log(API_KEY);
    const chat =async (req, res) => {
        const {input} =req.body
        console.log(API_KEY);
        if (!API_KEY) {
          res.status(500).json({
            success: false,
            message: 'API key is missing',
          });
          return;
        }
  const headers = {
    'Authorization': `Bearer token ${API_KEY}`,
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
      // console.log(response.data.choices[0].message.content);
      res.status(201).json({
        success: true,
        message: "successfully",
        // result: response
      });
      // res.send(response.data.choices[0].message.content);
    })
    .catch(error => {
      console.error('API request failed:', API_URL)
      res.status(500).send('API request failed');
    });
};


module.exports = {
   chat
  };
