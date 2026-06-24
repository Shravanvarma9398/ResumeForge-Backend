require("dotenv").config();

const analyzeResume = require("./services/groqService");

async function test() {
  const result = await analyzeResume(`
Name: Shravan Varma

Skills:
React
Node.js
MongoDB

Projects:
IdeaHub
Weather App
`);

  console.log(result);
}

test();