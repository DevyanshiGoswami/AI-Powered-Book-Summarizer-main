# 📚 AI Book Summarizer
Demo of project:


https://github.com/user-attachments/assets/d9ed2cc5-bd17-414d-8a66-6823503e124b




An AI-powered web application that generates concise book summaries, interactive follow-up questions, and AI-generated answers to deepen understanding of books.

## ✨ Features

- 📖 Generate detailed book summaries using AI
- ❓ Automatically generate insightful questions based on the book
- 💬 Get AI-generated answers to follow-up questions
- 🖼️ Display book cover images dynamically
- ⚡ Interactive typing animation for summaries and answers
- 🎨 Modern responsive UI built with React

## 🚀 Tech Stack

### Frontend
- React.js
- Axios
- React Bootstrap
- Type Animation

### Backend
- Flask
- Flask-CORS
- Python

### AI Integration
- Generative AI API for:
  - Book Summaries
  - Question Generation
  - Question Answering


## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/AI-Book-Summarizer.git

cd AI-Book-Summarizer
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

python api.py
```

Backend runs on:

```text
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend runs on:

```text
http://localhost:3000
```

## 📂 Project Structure

```text
AI-Book-Summarizer
│
├── frontend
│   ├── src
│   ├── components
│   └── BookSummary.jsx
│
├── backend
│   ├── api.py
│   └── utils.py
│
└── README.md
```

## 🔥 How It Works

1. User enters a book title.
2. Backend fetches and generates a summary using AI.
3. AI generates three discussion questions.
4. User clicks any question.
5. AI provides a detailed answer.
6. Book cover is displayed automatically.

## 🌟 Future Improvements

- User authentication
- Summary history
- PDF export
- Audio summaries
- Dark mode
- Multi-language support

## 👨‍💻 Author

**Devyanshi Goswami**
