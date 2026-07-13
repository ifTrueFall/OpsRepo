/**
 * UNIVERSAL QUIZ ENGINE
 * Handles shuffling, HTML generation, and feedback logic for ANY chapter.
 */

let currentQuizData = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderQuiz(questions, containerId) {
    currentQuizData = questions;
    const container = document.getElementById(containerId);
    if (!container) return;

    let htmlOutput = '';

    questions.forEach((q, index) => {
        let optionsList = q.options.map((optText, optIndex) => {
            return { text: optText, isCorrect: (optIndex === q.answer) };
        });

        optionsList = shuffleArray(optionsList);

        let optionsHTML = '';
        optionsList.forEach((opt, i) => {
            optionsHTML += `
                <label class="option-label" id="opt-${index}-${i}" onclick="handleAnswer(${index}, ${i}, ${opt.isCorrect})">
                    <input type="radio" name="q${index}" value="${i}">
                    <span>${opt.text}</span>
                </label>
            `;
        });

        htmlOutput += `
            <div class="question-card">
                <div class="question-text">${index + 1}. ${q.q}</div>
                <div class="options">${optionsHTML}</div>
                <div class="feedback" id="feedback-${index}" style="display:none;">
                    <strong><span id="result-text-${index}"></span></strong><br>
                    <span id="explanation-text-${index}"></span>
                    <span class="citation" id="citation-text-${index}"></span>
                </div>
            </div>
        `;
    });

    container.innerHTML = htmlOutput;
}

function handleAnswer(qIndex, optId, isCorrect) {
    const feedbackEl = document.getElementById(`feedback-${qIndex}`);
    const resultTextEl = document.getElementById(`result-text-${qIndex}`);
    const explanationEl = document.getElementById(`explanation-text-${qIndex}`);
    const citationEl = document.getElementById(`citation-text-${qIndex}`);
    const selectedLabel = document.getElementById(`opt-${qIndex}-${optId}`);
    
    const qData = currentQuizData[qIndex];
    explanationEl.innerHTML = qData.explanation;
    citationEl.textContent = `Source: ${qData.cite}`;

    feedbackEl.style.display = 'block';
    
    if (isCorrect) {
        feedbackEl.className = 'feedback correct';
        resultTextEl.textContent = "Correct!";
        selectedLabel.classList.add('correct-choice');
    } else {
        feedbackEl.className = 'feedback incorrect';
        resultTextEl.textContent = "Incorrect.";
        selectedLabel.classList.add('incorrect-choice');
    }
}