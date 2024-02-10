# Budget Prompter Backend

Welcome to the Budget Prompter Backend! This part of the application serves as the server-side logic for managing budget prompts, interacting with OpenAI's GPT-3.5, handling API connections with Express, and interfacing with MongoDB for database functionality.

## Prerequisites

- Node.js (v20.10.0) - [Install Node.js](https://nodejs.org/)
- MongoDB (running on port 27017) - [Follow Steps Below]

## Getting Started

1. Clone the backend repository:

    ```bash
    git clone https://github.com/your-username/budget-prompter-backend.git
    ```

2. Navigate to the backend directory:

    ```bash
    cd budget-tracker-backend
    ```

4. Install dependencies:

    ```bash
    npm install
    # OR using Yarn
    yarn install
    ```

5. Update OpenAI API key:

   - Locate the `index.js` file in the project.
   - Find the section where the OpenAI API key is required.
   - Replace `YOUR_OPENAI_API_KEY` with your actual OpenAI API key.
     If you don't have a key, you can generate one using the docs here [Generate OpenAI API Key](https://platform.openai.com/docs/quickstart?context=python)

6. Start the backend server:

    ```bash
    node index.js
    # OR using Yarn
    yarn node index.js
    ```

## Connecting MongoDB Compass to Node.js Backend

To connect MongoDB Compass to your Node.js backend, follow these steps:

### 1. Install MongoDB Compass:

If you haven't already installed MongoDB Compass, download and install it from the [official MongoDB website](https://www.mongodb.com/try/download/compass).

### 2. Find MongoDB Connection String:

Create a new Database and Collection in MongoDB. Once you do this:
1. Replace **databaseName** variable with your created DataBase name (in db.js)
2. Replace **uri** variable with your connection string (in db.js)
3. Replace **collectionName** variable with your collection name (in index.js)


## Usage

1. The backend server manages API connections using Express.
2. It interfaces with OpenAI's GPT-3.5 to process budget-related prompts.
3. MongoDB is utilized for database functionalities such as storing and retrieving budget plans.


## Contact

For any queries or support regarding the backend part of this project, feel free to contact [Siddharth Vijayasankar] at [sidvijay2004@gmail.com].
