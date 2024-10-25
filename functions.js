import "dotenv/config";
import { openai } from "./openai.js";
import math from "advanced-calculator";
const QUESTION = process.argv[2] || "Please generate the image: An energetic and determined young woman with long brown hair, brown eyes, and a cute face. She has a nose piercing and long nails, depicted as a developer intensely working on switching from Angular to React. She is stylishly dressed, reflecting her modern and tech-savvy personality. The background shows a busy urban environment symbolizing the capital city where she lives, with elements representing both Angular and React technologies. A calendar and job application forms are subtly included, highlighting her urgency to find a job within a month. The overall color scheme is vibrant and dynamic, reflecting the tension and drive in her situation."



const messages = [
  {
    role: "user",
    content: QUESTION,
  },
];

const functions = {
  calculate: async ({ expression }) => {
    console.log("inside calculate", expression);
    return math.evaluate(expression);
  },
  generateImage: async ({ prompt }) => {
    const result = await openai.images.generate({ prompt });
    console.log(result);
    return result.data[0].url;
  },
};

const getCompletion = async (messages) => {
  const response = await openai.chat.completions.create({
    model: "",
    messages,
    functions: [
      {
        name: "generateImage",
        description: "Generate an image with Dall E",
        parameters: {
          type: "object",
          properties: {
            prompt: {
              type: "string",
              description: "The prompt to generate an image",
            },
          },
          required: ["prompt"],
        },
      },
      {
        name: "calculate",
        description: "Run a math expression",
        parameters: {
          type: "object",
          properties: {
            expression: {
              type: "string",
              description:
                'Then math expression to evaluate like "2 * 3 + (21 / 2) ^ 2"',
            },
          },
          required: ["expression"],
        },
      },
    ],
    temperature: 0,
  });

  return response;
};

let response;
while (true) {
  response = await getCompletion(messages);

  if (response.choices[0].finish_reason === "stop") {
    console.log(response.choices[0].message.content);
    break;
  } else if (response.choices[0].finish_reason === "function_call") {
    const fnName = response.choices[0].message.function_call.name;
    const args = response.choices[0].message.function_call.arguments;

    const functionToCall = functions[fnName];
    const params = JSON.parse(args);

    const result = functionToCall(params);

    messages.push({
      role: "assistant",
      content: null,
      function_call: {
        name: fnName,
        arguments: args,
      },
    });

    messages.push({
      role: "function",
      name: fnName,
      content: JSON.stringify({ result: result }),
    });
  }
}
