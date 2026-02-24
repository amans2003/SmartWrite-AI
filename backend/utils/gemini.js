const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const key = process.env.GEMINI_API_KEY;
if (!key || key === "YOUR_GEMINI_API_KEY_HERE") {
  console.warn("WARNING: GEMINI_API_KEY is not set or is still the placeholder.");
} else {
  console.log(`Gemini API Key loaded: ${key.substring(0, 4)}...${key.substring(key.length - 4)}`);
}

const genAI = new GoogleGenerativeAI(key);

const generateRewrittenText = async (text, tone, context, length) => {
  // Use models revealed as available in this environment
  const modelNames = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-1.5-flash"];
  let lastError = null;

  for (const modelName of modelNames) {
    try {
      console.log(`Attempting to generate content with model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
        You are a professional communication assistant.
        Target Tone: ${tone}
        Context: ${context}
        Desired Length: ${length}
        
        Original Message:
        "${text}"
        
        Please rewrite this message to be professional and effective, maintaining the target tone and context.
        If it's an email, include a subject line at the top starting with "Subject: ".
        Provide ONLY the rewritten message and subject line.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const textResponse = response.text();

      if (!textResponse) {
        throw new Error("Empty response from AI");
      }

      return textResponse;
    } catch (error) {
      console.error(`Error with model ${modelName}:`, error.message);
      lastError = error;

      // Continue to next model if 404 (Not Found) or 429 (Quota Exceeded)
      const isRecoverable = error.message.includes("404") ||
        error.message.includes("not found") ||
        error.message.includes("429") ||
        error.message.includes("quota");

      if (isRecoverable && modelName !== modelNames[modelNames.length - 1]) {
        console.log(`Model ${modelName} failed with recoverable error, trying next...`);
        continue;
      }

      // If NOT recoverable or it's our last attempt, throw
      throw error;
    }
  }

  throw lastError || new Error("All models failed to generate content.");
};

module.exports = { generateRewrittenText };
