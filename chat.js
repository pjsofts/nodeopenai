import { openai } from "./openai.js";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const newMessage = async (history, message) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [...history, message],
    temperature: 2,
  });

  return response.choices[0].message;
};

const formatMessage = (userInput) => ({ role: "user", content: userInput });

const chat = () => {
  const history = [
    {
      role: "system",
      content: "Hi you're awesome, please be a personal development coach",
    },
  ];

  const start = () => {
    rl.question("You: ", async (userInput) => {
      if (userInput.toLowerCase() === "exit") {
        rl.close();
        return;
      }

      const userMessage = formatMessage(userInput);
      const response = await newMessage(history, userMessage);
      history.push(userMessage, response);
      console.log(`\n\nAI: ${response.content}`);

      start();
    });
  };
  console.log("AI: how can I help you today?");
  start();
};
console.log("Chatbot initialized. type 'exit' to end the chat");
chat();
