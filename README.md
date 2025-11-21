🎥 YouTube Video Summarizer

Next.js • Spring Boot • JDBC • MySQL • n8n • NLP • TTS

A full-stack AI-powered web app that summarizes YouTube videos using an automated n8n workflow. Users can paste a YouTube URL, generate summaries instantly, store and view their history, and even convert summaries to speech.

🚀 Features
🔹 AI / Automation

Auto-summarizes YouTube videos via an n8n NLP pipeline

Asynchronous, scalable workflow

Supports long transcripts and multi-step processing

🔹 Frontend (Next.js)

Clean, modern UI with Tailwind CSS

Dark Mode support

Slider-based UI previews

Copy summary, export options

Responsive design

🔹 Backend (Java + Spring Boot)

REST APIs for summarization, history, and pagination

JDBC-based service layer

Error-handling + validation

🔹 Database (MySQL)

Normalized schema

Fast retrieval using indexing

Supports 1,000+ summaries per user

User-specific data isolation

🔹 Extras

Text-to-Speech (TTS)

Multi-language voice support

Adjustable playback speed

🛠️ Tech Stack
Frontend

Next.js

Tailwind CSS

Axios

React Query

Backend

Java

Spring Boot

JDBC

REST APIs

Database

MySQL

Normalized relational schema

Automation

n8n

NLP (AI model via API)

🧩 System Architecture
YouTube URL → Next.js UI → Spring Boot API → n8n Workflow → NLP Model
          ↑                 ↓                        ↓
     User history ← MySQL DB ← Summary & Metadata ← Transcript

📂 Repository Links
Frontend:

🔗 https://github.com/sg6640770/YT_summarizer_Frontend

Backend:

🔗 https://github.com/sg6640770/YT_summarizer_Backend

📦 Installation & Setup
1️⃣ Clone the repositories
git clone https://github.com/sg6640770/YT_summarizer_Frontend
git clone https://github.com/sg6640770/YT_summarizer_Backend

🖥️ Frontend Setup (Next.js)
cd YT_summarizer_Frontend
npm install
npm run dev


Create .env.local:

NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api

⚙️ Backend Setup (Java Spring Boot)
cd YT_summarizer_Backend
mvn clean install
mvn spring-boot:run


Create application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/youtube_summarizer
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
n8n.webhook.url=YOUR_N8N_WEBHOOK_URL

🗄️ MySQL Schema

Key tables:

users (user_id, email, password_hash)
summaries (id, user_id, video_id, title, summary, created_at)


✔ Normalized
✔ Indexed columns for fast pagination
✔ Foreign keys for referential integrity

🤖 n8n Workflow (High-Level)

Webhook Trigger receives YouTube link

Extract Video ID

Fetch YouTube transcript

Send transcript to NLP Model (AI)

Generate summarized result

Return structured JSON to backend

Backend stores summary in MySQL

Frontend updates user history

🎤 Text-to-Speech Feature

Supports multiple languages

Adjustable playback speed

Auto-generates audio from summary

Built with Web Speech API / TTS engine

🧪 API Endpoints (Backend)
Method	Endpoint	Description
POST	/api/summarize	Trigger summary for YouTube URL
GET	/api/history/{userId}	Get paginated history
GET	/api/summary/{id}	Get specific summary
DELETE	/api/summary/{id}	Delete a summary
📸 Screenshots (Add your images here)
/public/screenshots/home.png  
/public/screenshots/summary.png  
/public/screenshots/history.png  
/public/screenshots/tts.png  


Example placeholder:

🚀 Future Enhancements

OAuth login

Export summaries as PDF

AI-powered keyword extraction

Multi-video batch processing

Chrome Extension

🏁 Conclusion

This project helped me strengthen:

✔ Full-stack architecture
✔ Database normalization
✔ AI workflow automation
✔ Next.js UI/UX
✔ Spring Boot API development
✔ MySQL indexing & optimization

If you have feedback or ideas to improve the system, feel free to connect!
