// /api/UserInterest.js
import {chatSession} from './GeminiAiModal';


const cleanUpResponse = (response) => {
    // Remove unnecessary markdown symbols and extra whitespace
    return response
      .replace(/^\s*##\s*/gm, '') // Remove markdown headers (##)
      .replace(/^\s*\*\*\*\s*/gm, '') // Remove markdown bold symbols (****)
      .replace(/^\s*\*\*\s*/gm, '') // Remove markdown bold symbols (**)
      .replace(/\*\*\*/g, '') // Remove remaining bold symbols
      .replace(/^\s*\*\s*/gm, '') // Remove markdown bullet points (*)
      .replace(/\s+$/, '') // Trim trailing whitespace
      .replace(/^\s+/g, ''); // Trim leading whitespace
  };

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { conversation } = req.body;
  
    // Validate request data
    if (!conversation || typeof conversation !== 'string') {
      return res.status(400).json({ error: 'Conversation history is required' });
    }
  
    const Context = `
        You are an AI assistant that analyzes user conversations to determine whether the user has a stronger interest in frontend or backend development.

        The conversation history provided below represents a user's interaction, discussing various technologies, tasks, and preferences.

        Your task is to:
        1. Analyze the user's discussion of technologies, frameworks, and their coding focus.
        2. Determine whether the user shows more interest in frontend development (e.g., UI/UX, HTML, CSS, JavaScript frameworks) or backend development (e.g., databases, APIs, server-side logic, etc.).
        3. If the user shows interest in both, provide a balanced response and indicate that the user is comfortable with both areas.

        Please provide answer only either frontend or backend or default.

        **User Conversation History:**
        ${conversation}
    `;
    try {
        // Send the user message along with conversation history and resume info
        const aiResult = await chatSession.sendMessage(
          Context
          // Send conversation as a string with resume info
        );
        
        // Extract the response text
        const responseText = await aiResult.response.text();
        console.log(responseText);
        const finalresponse=cleanUpResponse(responseText);
        // Respond with the AI-generated text
        return res.status(200).json({ interest: finalresponse });
      } catch (error) {
        console.error('Error in API:', error);
        return res.status(500).json({ error: 'Failed to process the chat message' });
    }

  }
  