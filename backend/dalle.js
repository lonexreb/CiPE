const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const cors = require('cors'); // Import the cors package

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const openai = new OpenAI({
  apiKey: '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',
});

// Endpoint to handle OpenAI function
app.post('/openai/image', async (req, res) => {
  const userData = req.body; // User data received from the client (React app)

  try {
    const response = await openai.createImage({
        model: "dall-e-3",
        prompt: "a white siamese cat. I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:",
        n: 1,
        size: "256x256",
      });
      image_url = response.data.data[0].url;
    res.json({ image_url }); // Sending the result back to the client (React app)
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: 'An error occurred' }); // Handle error cases
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
