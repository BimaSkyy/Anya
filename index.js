const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/cai', async (req, res) => {
  const text = req.query.text.replace(/\s/g, '+');

  const data = {
    external_id: "ZVUK_CGjEymmyNInVX-0LzsvfnacOEQMIn7fxBZlQkU",
    message: text,
  };

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch('https://api.apigratis.site/cai/send_message', options);
    const responseData = await response.json();
    const result = responseData.result.replies.map(reply => reply.text).join('\n');

    res.json({ data: { teks: result } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});