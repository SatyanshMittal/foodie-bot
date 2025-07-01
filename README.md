# Foodie Robo 🤖🍕

A witty restaurant chatbot powered by WebSocket and Google Gemini AI that helps customers with menu inquiries in a fun and engaging way!

## Features

- **Real-time WebSocket communication** for instant responses
- **Google Gemini AI integration** for intelligent, contextual responses
- **Restaurant menu knowledge** with descriptions and prices
- **Personality-driven responses** with humor and warmth
- **Emotion-based responses** (happy, talking, sad)

## Prerequisites

- Node.js (version 16 or higher)
- Google Gemini API key

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory and add your Google Gemini API key:

```env
# Google Gemini API Key
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here
```

**To get your Gemini API key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and paste it in your `.env` file

### 3. Run the Server

```bash
# Production mode
npm start

# Development mode (with auto-restart)
npm run dev
```

The WebSocket server will start running on `ws://localhost:8080`

## Menu Items

The bot knows about these delicious items:

- **Pizza** - Classic Margherita with fresh basil and mozzarella ($12)
- **Pasta** - Creamy Alfredo with a hint of garlic and parmesan ($10)  
- **Burger** - Juicy beef patty with secret sauce and crispy fries ($8)

## Testing the Bot

You can test the WebSocket connection using:

1. **WebSocket testing tools** like Postman or WebSocket King
2. **Browser console** (see example below)
3. **Custom client application**

### Browser Console Example

```javascript
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Connected to Foodie Robo!');
  ws.send('What\'s on the menu?');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('🤖:', data.response);
  console.log('Emotion:', data.emotion);
};

ws.onerror = (error) => console.error('Error:', error);
```

## Example Interactions

- **"What's on the menu?"** → Lists all available items with personality
- **"Tell me about the pizza"** → Detailed description with humor
- **"How much is the burger?"** → Price information with a witty comment
- **"I'm hungry"** → Playful menu suggestions

## Project Structure

```
foodie-robo/
├── server.js          # Main WebSocket server
├── package.json       # Dependencies and scripts
├── .env              # Environment variables (create this)
└── README.md         # This file
```

## Error Handling

The bot gracefully handles errors with fun messages like:
- "Oops, I dropped the sauce! Try again?"
- Logs errors to console for debugging

## Contributing

Feel free to enhance the bot with:
- More menu items
- Additional personality traits
- Better error handling
- Web UI client
- Database integration

## License

MIT License - Feel free to use this for your own restaurant projects! # foodie-bot
