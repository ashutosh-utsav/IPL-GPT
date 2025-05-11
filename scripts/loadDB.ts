import { DataAPIClient } from '@datastax/astra-db-ts';
import { PuppeteerWebBaseLoader } from '@langchain/community/document_loaders/web/puppeteer';

import OpenAI from 'openai';

import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import 'dotenv/config';

type SimilarityMetric = 'cosine' | 'dot_product' | 'euclidean';

const {
    ASTRA_DB_NAMESPACE,
    ASTRA_DB_COLLECTION,
    ASTRA_DB_APPLICATION_TOKEN,
    ASTRA_DB_API_ENDPOINT,
    OPENAI_API_KEY

} = process.env;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY})

const ipldata = [
    "https://en.wikipedia.org/wiki/Indian_Premier_League",
    "https://en.wikipedia.org/wiki/2023_Indian_Premier_League",
    "https://en.wikipedia.org/wiki/2022_Indian_Premier_League",
    "https://en.wikipedia.org/wiki/2021_Indian_Premier_League",
    "https://en.wikipedia.org/wiki/2020_Indian_Premier_League",
    "https://en.wikipedia.org/wiki/2019_Indian_Premier_League",
    "https://www.iplt20.com/"
];

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 100,
});

const createCollection = async (
  similarityMetric: SimilarityMetric = 'dot_product'
) => {
  const res = await db.createCollection(ASTRA_DB_COLLECTION, {
    vector: {
      dimension: 1536, // get this from docs for open AI embedding model
      metric: similarityMetric,
    },
  });

  console.log(res);
};  

const loadSampleData = async () => {
  const collection = await db.collection(ASTRA_DB_COLLECTION);
  for await (const url of ipldata) {
    const content = await scrapePage(url);
    const chunks = await splitter.splitText(content);
    for await (const chunk of chunks) {
      const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: chunk,
        encoding_format: 'float',
      });

      const vector = embedding.data[0].embedding; // array of numbers

      const res = await collection.insertOne({
        $vector: vector,
        text: chunk,
      });
    }
  }
};

const scrapePage = async (url: string) => {
  // use Puppeteer
  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: {
      headless: true,
    },
    gotoOptions: {
      waitUntil: 'domcontentloaded',
    },
    evaluate: async (page, browser) => {
      const result = await page.evaluate(() => document.body.innerHTML);
      await browser.close();
      return result;
    },
  });
  return (await loader.scrape())?.replace(/<[^>]*>?/gm, ''); // only care about text - stripe out html elements
};

createCollection().then(() => loadSampleData());