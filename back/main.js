import express from "express";
import { openai } from "./openai.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const port = 3000;

const history = [
  {
    role: "system",
    content: "Hi, you're a fitness coach ask me questions and give me a plan",
  },
];

const formatMessage = (userInput) => ({ role: "user", content: userInput });

const newMessage = async (history, message) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [...history, message],
  });

  return response.choices[0].message;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/message", async (req, res) => {
  console.log("message is", req.body.message);
  const message = formatMessage(req.body.message);
  const response = await newMessage(history, message);
  history.push(message, response);
  res.json({ ai: response.content });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
