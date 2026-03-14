### AI Clinical Appointment Voice Assistant
A real-time voice-based AI assistant that helps patients book, reschedule, cancel, and manage doctor appointments through natural conversation.
The system uses a voice interaction pipeline, agentic reasoning, and tool orchestration to provide a conversational healthcare assistant.

### Project Overview
This project implements a voice-enabled clinical scheduling assistant capable of:
- Understanding spoken patient requests
- Managing appointment workflows
- Maintaining conversation memory
- Preventing scheduling conflicts
- Responding in multiple languages
The assistant processes voice input in real time and returns spoken responses.

### Main technologies:
- React
- Node.js
- Socket.IO
- MongoDB
- Groq

### Architectural Decisions
## 1. Real-time communication
The system uses WebSockets via Socket.IO instead of REST APIs.
Reason:
- Voice assistants require low latency
- Real-time interaction improves conversational experience
## 2. Agent + Tool architecture
Instead of letting the LLM handle everything, the system separates:
- LLM reasoning
- Tool execution
- Database operations
This makes the system:
- more reliable
- easier to scale
- safer for structured operations
## 3. Browser-based speech recognition
The project uses the browser Web Speech API instead of external speech-to-text services.
Reason:
- lower integration complexity
- reduced infrastructure cost
- sufficient accuracy for a prototype

### Memory Design
The system maintains two memory layers.
## 1. Conversation Memory
Stored in MongoDB.
Structure:
Conversation
 ├ userId
 ├ role
 ├ message
 ├ language
 └ timestamp

Purpose:
- maintain conversation history
- enable contextual responses
- support follow-up questions
- 
## 2. Appointment Memory
Appointments are stored in a separate collection.
Structure:
Appointment
 ├ patientId
 ├ doctorType
 ├ appointmentTime
 └ status
 
Purpose:
- manage appointment lifecycle
- prevent scheduling conflicts
- support rescheduling and cancellation

### Setup Instructions
## 1. Clone repository
- git clone <repo_url>
- cd voice-ai-agent
  
## 2. Install dependencies
- Backend
cd server
npm install

- Frontend
cd client
npm install

## 3. Configure environment variables
- Create .env inside server/.
GROQ_API_KEY=your_api_key
MONGODB_URI=your_database_url

## 4. Start backend
npm run dev
- Server runs at:
http://localhost:5000

## 5. Start frontend
cd client
npm run dev

Open:
http://localhost:5173
