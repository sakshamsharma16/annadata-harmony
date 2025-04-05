
/**
 * Service for integrating with Google's Gemini API
 */
interface GeminiResponse {
  text: string;
  images?: string[];
  error?: string;
}

export async function sendMessageToGemini(message: string): Promise<GeminiResponse> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("Gemini API key is missing. Please check your .env file.");
      return {
        text: "I'm having trouble connecting to my services. Please make sure the API key is configured correctly.",
        error: "API_KEY_MISSING"
      };
    }
    
    const baseUrl = import.meta.env.VITE_GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta";
    const url = `${baseUrl}/models/gemini-pro:generateContent?key=${apiKey}`;
    
    console.log('Sending request to Gemini API...');
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
          topP: 0.8,
          topK: 40
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });
    
    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini API error:", data.error);
      return {
        text: "Sorry, I encountered an error while processing your request.",
        error: data.error.message || "UNKNOWN_ERROR"
      };
    }
    
    console.log('Received response from Gemini API:', data);
    
    // Extract the response text from Gemini API response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                 "Sorry, I couldn't generate a response at this time.";
    
    return { text };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { 
      text: "Sorry, there was an error connecting to my services. Please try again later.",
      error: error instanceof Error ? error.message : "UNKNOWN_ERROR"
    };
  }
}

// Add a function to check if the API key is configured correctly
export async function checkGeminiAPIKey(): Promise<boolean> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("Gemini API key is missing. Please check your .env file.");
    return false;
  }
  
  try {
    const response = await sendMessageToGemini("Hello");
    return !response.error;
  } catch (error) {
    return false;
  }
}
