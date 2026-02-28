const API_URL = "http://127.0.0.1:8000";

function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = "none");
    document.getElementById(id).style.display = "block";
}

async function askDoubt() {
    const message = document.getElementById("chatInput").value;

    const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message})
    });

    const data = await res.json();
    document.getElementById("chatResult").innerText = data.reply;
}

async function generateQuiz() {
    const topic = document.getElementById("quizTopic").value;
    const difficulty = document.getElementById("difficulty").value;
    const num_questions = parseInt(document.getElementById("numQuestions").value);

    const res = await fetch(`${API_URL}/quiz`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({topic, difficulty, num_questions})
    });

    const data = await res.json();
    const container = document.getElementById("quizContainer");
    container.innerHTML = "";

    data.questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `<p>${index+1}. ${q.question}</p>`;

        q.options.forEach(opt => {
            div.innerHTML += `
                <label>
                    <input type="radio" name="q${index}" value="${opt}">
                    ${opt}
                </label><br>
            `;
        });

        container.appendChild(div);
    });

    document.getElementById("submitQuizBtn").style.display = "inline";
}

async function submitQuiz() {
    const questions = document.querySelectorAll(".question");
    let correct = 0;

    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === "Option A") {
            correct++;
        }
    });

    const res = await fetch(`${API_URL}/evaluate`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            correct_answers: correct,
            total_questions: questions.length
        })
    });

    const data = await res.json();
    document.getElementById("scoreResult").innerText =
        `Score: ${data.score} | ${data.feedback}`;
}

async function summarize() {
    const content = document.getElementById("summaryInput").value;

    const res = await fetch(`${API_URL}/summarize`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({content})
    });

    const data = await res.json();
    document.getElementById("summaryResult").innerText = data.summary;
}

async function generateFlashcards() {
    const topic = document.getElementById("flashcardTopic").value;

    const res = await fetch(`${API_URL}/flashcards`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({topic})
    });

    const data = await res.json();
    const container = document.getElementById("flashcardResult");
    container.innerHTML = "";

    data.flashcards.forEach(card => {
        container.innerHTML += `
            <div class="question">
                <strong>Q:</strong> ${card.question}<br>
                <strong>A:</strong> ${card.answer}
            </div>
        `;
    });
}