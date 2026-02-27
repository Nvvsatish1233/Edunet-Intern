from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI(title="AI Study Buddy Pro")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Models
# -------------------------

class ChatRequest(BaseModel):
    message: str

class QuizRequest(BaseModel):
    topic: str
    difficulty: str
    num_questions: int

class SummaryRequest(BaseModel):
    content: str

class FlashcardRequest(BaseModel):
    topic: str

class EvaluationRequest(BaseModel):
    correct_answers: int
    total_questions: int


# -------------------------
# Home
# -------------------------

@app.get("/")
def home():
    return {"message": "AI Study Buddy Pro Running Successfully 🚀"}


# -------------------------
# Smart Chat
# -------------------------

@app.post("/chat")
def chat(request: ChatRequest):
    return {
        "reply": f"""
        📘 Explanation of {request.message}

        {request.message} is an important academic concept.
        It plays a significant role in modern technology.
        It can be understood with real-life examples.
        Future scope includes research and innovation.
        """
    }


# -------------------------
# Advanced Quiz Generator
# -------------------------

@app.post("/quiz")
def generate_quiz(request: QuizRequest):
    questions = []

    for i in range(request.num_questions):
        questions.append({
            "question": f"What is {request.topic}? (Level: {request.difficulty})",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": "Option A"
        })

    return {
        "topic": request.topic,
        "difficulty": request.difficulty,
        "questions": questions
    }


# -------------------------
# Auto Evaluation
# -------------------------

@app.post("/evaluate")
def evaluate(request: EvaluationRequest):
    score_percentage = (request.correct_answers / request.total_questions) * 100

    return {
        "score": f"{score_percentage}%",
        "feedback": "Excellent!" if score_percentage > 70 else "Keep Practicing!"
    }


# -------------------------
# Notes Summarizer
# -------------------------

@app.post("/summarize")
def summarize(request: SummaryRequest):
    return {
        "summary": f"""
        📌 Key Points:
        - Main idea extracted from content.
        - Important keywords highlighted.
        - Simplified explanation generated.
        """
    }


# -------------------------
# Flashcard Generator
# -------------------------

@app.post("/flashcards")
def flashcards(request: FlashcardRequest):
    return {
        "topic": request.topic,
        "flashcards": [
            {"question": f"What is {request.topic}?", "answer": "Definition explanation."},
            {"question": f"Applications of {request.topic}?", "answer": "Real world applications."},
            {"question": f"Advantages of {request.topic}?", "answer": "Benefits explained."}
        ]
    }