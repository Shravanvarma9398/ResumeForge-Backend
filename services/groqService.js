require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyzeResume = async (resumeText) => {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
Analyze this resume.

Return:
1. Resume Score out of 100
2. Strengths
3. Weaknesses
4. Improvement Suggestions

Resume:
${resumeText}
        `,
      },
    ],
    model: "llama-3.1-8b-instant",
  });

  return completion.choices[0].message.content;
};

module.exports = analyzeResume;