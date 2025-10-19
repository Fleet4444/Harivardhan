
import { GoogleGenAI, Type, Content } from "@google/genai";
import { ChatMessage, CareerQuizResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const careerQuizResultSchema = {
    type: Type.OBJECT,
    properties: {
        suggestedCareers: {
            type: Type.ARRAY,
            description: "A list of suggested career paths.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The job title." },
                    description: { type: Type.STRING, description: "A brief description of this career path." }
                },
                required: ["title", "description"]
            }
        },
        recommendedSkills: {
            type: Type.ARRAY,
            description: "A list of skills recommended for these careers.",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "A specific skill to learn." },
                    reason: { type: Type.STRING, description: "Why this skill is important for the suggested careers." }
                },
                required: ["skill", "reason"]
            }
        },
        ethicalTips: {
            type: Type.ARRAY,
            description: "A list of ethical considerations or responsibilities.",
            items: {
                type: Type.OBJECT,
                properties: {
                    tip: { type: Type.STRING, description: "An ethical tip or responsibility." },
                    explanation: { type: Type.STRING, description: "Why this ethical consideration is important." }
                },
                required: ["tip", "explanation"]
            }
        }
    },
    required: ["suggestedCareers", "recommendedSkills", "ethicalTips"]
};

export const getCareerAdvice = async (answers: string[]): Promise<CareerQuizResult> => {
  try {
    const prompt = `You are a career guidance counselor for SkillConnect, a platform for learning practical, local skills. A user has answered a quiz about their interests. Based on their answers, provide career suggestions, skills to learn, and ethical considerations. The user's answers are: ${answers.join(', ')}. Provide your response in the specified JSON format.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: careerQuizResultSchema,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    return result as CareerQuizResult;

  } catch (error) {
    console.error("Error getting career advice from Gemini:", error);
    throw new Error("Failed to get career advice. Please try again.");
  }
};


export const chatWithAssistant = async (history: ChatMessage[]): Promise<string> => {
  try {
    // FIX: Map the message history to the format expected by the Gemini API
    // and pass it to ai.chats.create to maintain conversation context.
    const geminiHistory: Content[] = history.slice(0, -1).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: geminiHistory,
      config: {
        systemInstruction: "You are a friendly and helpful AI assistant for SkillConnect, a platform for learning practical skills. Your name is 'SkillBot'. Your goal is to help users find courses, understand skills, and get motivated. Keep your answers concise, encouraging, and easy to understand. You can speak in regional languages if asked, but default to English. If you don't know something, say you'll ask the experts at SkillConnect.",
      }
    });

    const userMessage = history[history.length - 1].text;
    
    const response = await chat.sendMessage({ message: userMessage });

    return response.text;
  } catch (error) {
    console.error("Error chatting with assistant:", error);
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
};
