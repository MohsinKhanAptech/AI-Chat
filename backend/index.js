import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Ollama from 'ollama';

const conversations = [];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(cors());

let models;
let activeModelIndex = 0;

// get all models
app.get('/models', async (req, res) => {
  models = await Ollama.list();
  models = models.models;
  res.json(models);
});

// get active model
app.post('/models/active', async (req, res) => {
  const { modelIndex } = req.body;
  activeModelIndex = modelIndex;
  res.json(modelIndex);
});

// get all conversations
app.get('/conversations', async (req, res) => {
  try {
    res.json(conversations);
  } catch (error) {
    console.error('Error in /conversations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get conversation by model
app.get('/conversation', async (req, res) => {
  try {
    const { model } = req.query;
    const conversation = conversations.find((c) => c.model === model);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    res.json(conversation);
  } catch (error) {
    console.error('Error in /conversation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// generate response with context
app.post('/chat', async (req, res) => {
  try {
    const { conversationIndex, prompt } = req.body;

    let response;

    console.log('conversationIndex: ', conversationIndex, ', prompt: ', prompt);

    if (conversationIndex === conversations.length) {
      // if new conversation
      console.log('in new convo');
      console.log(models, ',\nActiveModelIndex: ', activeModelIndex);

      conversations.push({
        title: `Chat ${conversations.length}`,
        model: models[activeModelIndex].name,
        messages: [{ role: 'user', content: prompt }],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      response = await Ollama.chat({
        model: models[activeModelIndex].name,
        messages: conversations[conversationIndex].messages,
      });

      conversations[conversationIndex].messages.push({
        role: 'assistant',
        content: response.message.content,
      });

      conversations[conversationIndex].updated_at = new Date().toISOString();
    } else {
      // if old conversation
      console.log('in old convo');
      console.log(models, ',\nActiveModelIndex: ', activeModelIndex);

      conversations[conversationIndex].messages.push({
        role: 'user',
        content: prompt,
      });

      response = await Ollama.chat({
        model: models[activeModelIndex].name,
        messages: conversations[conversationIndex].messages,
      });

      console.log(response);

      conversations[conversationIndex].messages.push({
        role: 'assistant',
        content: response.message.content,
      });

      conversations[conversationIndex].updated_at = new Date().toISOString();
    }

    res.json(response.message.content);
  } catch (error) {
    console.error('Error in /chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// generate response without context
app.post('/generate', async (req, res) => {
  const { model, prompt } = req.body;
  const generate = await Ollama.generate(model, prompt);
  res.json(generate);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is running on port ${
      process.env.PORT || 5000
    }, view at http://localhost:${process.env.PORT || 5000}/`
  );
});
