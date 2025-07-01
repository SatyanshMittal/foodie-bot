const WebSocket = require('ws');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const wss = new WebSocket.Server({ port: 8080 });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const menu = {
  pizza: { desc: 'Classic Margherita with fresh basil and mozzarella.', price: '$12' },
  pasta: { desc: 'Creamy Alfredo with a hint of garlic and parmesan.', price: '$10' },
  burger: { desc: 'Juicy beef patty with secret sauce and crispy fries.', price: '$8' }
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', async (message) => {
    try {
      const query = message.toString();
      console.log('Received:', query);

      const prompt = `
        You are a friendly robot assistant for a restaurant. 
        The user asked: "${query}". 
        Provide a natural, conversational response (max 80 words) about the menu or dish details. 
        Be helpful and add just a little humor, but keep it casual and not overly dramatic.
        Use this menu data: ${JSON.stringify(menu)}.
        If the query is vague, list the menu in a simple, friendly way.
      `;

      const result = await model.generateContent(prompt);
      let response = await result.response.text();

      ws.send(JSON.stringify({ response, emotion: query.includes('menu') ? 'happy' : 'talking' }));
    } catch (error) {
      console.error('Error:', error);
      ws.send(JSON.stringify({ response: 'Oops, I dropped the sauce! Try again?', emotion: 'sad' }));
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});

console.log('WebSocket server running on ws://localhost:8080'); 