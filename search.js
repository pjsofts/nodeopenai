import { openai } from "./openai.js";
import { Document } from "langchain/document";
import {  } from "langchain/vectorstores/pgvector";
import { OpenAIEmbeddings } from "@langchain/openai";

const cafes = [
  {
    id: 1,
    title: "Full Sea And Palm View Apartment In Beach Vista, Emaar Beach Front",
    description: `Rent Ready Residential 4 Bedroom 5 Bathroom 2368 sq.ft. AED 18,000,000`,
  },
  {
    id: 2,
    title: "Luxurious Apartment In The Residence Burj Khalifa, Downtown Dubai",
    description: `Sale Ready. AED 7,000,000 Residential 2 Bedroom 3 Bathroom 1546 sq.ft.`,
  },
  {
    id: 3,
    title: "Lavish Duplex Apartment In Murjan 3, Dubai Marina",
    description: `Residential
    2 Bedroom
    2 Bathroom
    1793 sq.ft. AED 4,300,000 Sale
    Ready`,
  },
  {
    id: 4,
    title: "Amir Chocolate",
    description: `Cafe Familiar with Dads and old business people. `,
  },
  {
    id: 5,
    title: "Galaxy Cafe",
    description: `A cafe that you could go with friends and play the Mafia game  `,
  },
  {
    id: 6,
    title: "Paw Patrol",
    description: `Children's animated movie where a group of adorable puppies save people from all sorts of emergencies.`,
  },
  {
    id: 7,
    title: "Interstellar",
    description: `Features futuristic space travel with high stakes`,
  },
];

const createStore = () =>
  MemoryVectorStore.fromDocuments(
    cafes.map(
      (cafe) =>
        new Document({
          pageContent: `Title ${cafe.title}\n${cafe.description}`,
          metadata: { source: cafe.id, title: cafe.title },
        })
    ),
    new OpenAIEmbeddings()
  );

const search = async (query, count = 1) => {
  const store = await createStore();
  return store.similaritySearchWithScore(query, count);
};

console.log(await search("What is a good house for work?"));
