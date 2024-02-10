const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const cors = require('cors'); // Import the cors package

const { MongoClient, ObjectId } = require('mongodb');
const connectToDatabase = require('./db'); // Import the connectToDatabase function


const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const openai = new OpenAI({
  apiKey: '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',
});

// Endpoint to handle OpenAI function
app.post('/openai', async (req, res) => {
  const userData = req.body; // User data received from the client (React app)

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'Act as a financial analyst. ' +
            'I am going to give you some information about me in JSON Format' +
            'The unit for salary and savings Goal is in Dollars and is over a year. The time period is in weeks. The expenses are expenses during this time' +
            'In addition, there is a description field to give more information about me. ' +
            'I want you to analyze all the data and rate how well I has created a budget on the following criteria: ' +
            'Percentage of Salary Saved, How necessary expenses are and if they can be cut down.' + 
            'I want you to take into account any personal data I entered in the description in your evaluation' +
            'Make your response informative, accurate, but do not be afraid to be funny as well!' +

            'For the format of your response. I want the first line to be "Rating Score: " and the score (out of 100%) [Give 1 line space]' +
            'Next Paragraph: I want you to give specific reasoning based on my data why you gave this score [Give 1 line space] ' +
            'Finally, I want you to give specific and actionable advice on what I can do to improve my score'
            ,
        },
        {
          role: 'user',
          content: JSON.stringify(userData), // Sending received user data to OpenAI
        },
      ],
      model: 'gpt-3.5-turbo-1106',
      // response_format: { type: 'json_object' },
    });

    const result = completion.choices[0].message.content;
    res.json({ result }); // Sending the result back to the client (React app)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' }); // Handle error cases
  }
});

// Endpoint to handle OpenAI DALLE function
app.post('/openai/image', async (req, res) => {
const userData = req.body; // User data received from the client (React app)
// Destructure properties from userData
const { salary, savingsGoal, timePeriod, expenses, description} = userData;

console.log('User Description:', userData.description); // Log the description field

// Create a prompt using userData properties
prompt =  `Generate an image for this information about a user: user description: ${description}, `

const numberOfImages = 1;
const imageSize = "1024x1024";

  try {
    const imageGenaration = await openai.images.generate(	
      {
        model: "dall-e-3",
        prompt: prompt,
        n: numberOfImages,
        size: imageSize
      
      });

    // console.log(imageGenaration.data);

    // Extract the URL of the first image
    const image_url = imageGenaration.data[0].url; // Assuming 'url' contains the image URL
    res.json({ image_url: image_url }); // Sending the first URL back to the client (React app)

  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: 'An error occurred' }); // Handle error cases
  }
});

// Endpoint to handle inserting data into the database
app.post('/putData', async (req, res) => {
  try {
    const db = await connectToDatabase(); // Establish database connection

    // Accessing the desired collection
    const collection = db.collection('myCollection'); // Replace with your collection name
    
    // Data received from the client's request body
    const newData = req.body;

    // Insert a single document into the collection
    const insertResult = await collection.insertOne(newData);
    
    console.log('Insertion Result:', insertResult);

    // Check the insert result and respond to the client
    if (insertResult.acknowledged) {
      res.json({ message: 'Data inserted successfully', insertedId: insertResult.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to insert data' });
    }    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Endpoint to retrieve specific data from the database based on user input
app.get('/getData', async (req, res) => {
  try {
    const db = await connectToDatabase(); // Establish database connection

    // Accessing the desired collection
    const collection = db.collection('myCollection'); // Replace with your collection name

    // Extract user input/query from request parameters
    const userQuery = req.query; // Assuming the user provides query parameters in the URL

    console.log('userQuery', userQuery);

    // Find documents that match the user's query parameters
    const result = await collection.find(userQuery).toArray();

    console.log('Query Result:', result);

    // Respond to the client with the retrieved data
    res.json({ data: result }); // Modify the response format as needed
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while retrieving data' });
  }
});

app.delete('/deleteData/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from request parameters

  try {
    const db = await connectToDatabase(); // Establish database connection

    // Accessing the desired collection
    const collection = db.collection('myCollection'); // Replace with your collection name

    // Convert the string ID to an ObjectId
    const objectId = new ObjectId(id);

    // Delete the document with the provided ObjectId
    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Deletion successful' });
      console.log('Deletion successful');
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'An error occurred while deleting data' });
  }
});




app.get('*', (req, res) => {
  res.status(404).send('404: Page not found');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});