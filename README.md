# IPL-GPT

IPL-GPT is a basic AI-powered chatbot built with Next.js. It uses OpenAI's API to provide a Retrieval-Augmented Generation (RAG) experience, leveraging IPL-related data from Wikipedia.

## Features

- **Next.js Framework**: Fast and modern React-based framework.
- **AI-Powered Chatbot**: Uses OpenAI's API for intelligent responses.
- **RAG Architecture**: Combines Wikipedia IPL data with AI for accurate and contextual answers.

## Prerequisites

To run this project, ensure you have the following:

- Node.js installed on your system.
- An OpenAI API key.

## Getting Started

Follow these steps to set up and run the project:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/ipl-gpt.git
    cd ipl-gpt
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the root directory and add your OpenAI API key:
    ```env
    ASTRA_DB_NAMESPACE="Your key"
    ASTRA_DB_COLLECTION="Your key"
    ASTRA_DB_API_ENDPOINT="Your key"
    ASTRA_DB_APPLICATION_TOKEN="Your key"
    OPENAI_API_KEY="Your key"
    ```

4. **Run the Development Server**:
    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.



Feel free to contribute and enhance the project!
