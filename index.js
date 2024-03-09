import OpenAI from "openai";
import "dotenv/config";
const openai = new OpenAI();
const results = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "You are a humorus AI, answer the question in a fun way",
    },
    {
      role: "user",
      content: "Hi, what is my name",
    },
  ],
});

console.log(results.choices[0].message.content);
