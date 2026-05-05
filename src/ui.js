import { fetchQuestions } from './api.js';
import { state, setState } from './state.js';
import { CATEGORIES } from './categories.js';
import { startQuizFlow } from './app.js';

export function render() {
  const root = document.getElementById('app-root');
  if (!root) return;

  // Setup state
  if (state.status === 'setup') {
    root.innerHTML = `
    <h2>Start Quiz</h2>
    <div class="container">
      <label>
        Number of Questions:
        <input type="number" id="amount" value="${state.amount}" min="1" max="50" />
      </label>

      <label>
        Category:
        <select id="category">
        ${CATEGORIES.map(
          (c) => `
        <option value="${c.id}">${c.name}</option>
        `
        ).join('')}
        </select>
      </label>

      <label>
        Difficulty:
        <select id="difficulty">
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <button id="start">Start Quiz</button>
    </div>
  `;

    document.getElementById('start').addEventListener('click', startQuiz);
    return;
  }

  // Loading state
  if (state.status === 'loading') {
    root.innerHTML = `<p class="loading-state">Loading...</p>`;
    return;
  }

  // Error state
  if (state.status === 'error') {
    root.innerHTML = `<p class="error-state">Something went wrong.</p>`;
    return;
  }

  // Finished state
  if (state.currentQuestionIndex >= state.questions.length) {
    root.innerHTML = `
      <h2>Quiz Finished</h2>
      <div class="container">
        <p>Score: ${state.score}</p>
        <button id="restart">Restart</button>
      </div>
    `;

    document.getElementById('restart').addEventListener('click', restartQuiz);
    return;
  }

  // Ready state
  const question = state.questions[state.currentQuestionIndex];

  root.innerHTML = `
  <h2>${question.question}</h2>

  <div class="container" id="answers">
    ${question.answers
      .map((a) => {
        let className = 'answer';

        if (state.selectedAnswer) {
          if (a === question.correctAnswer) {
            className += ' correct';
          } else if (a === state.selectedAnswer) {
            className += ' wrong';
          }
        }

        return `
        <button 
          class="${className}" 
          data-answer="${a}"
          ${state.selectedAnswer ? 'disabled' : ''}
        >
          ${a}
        </button>
      `;
      })
      .join('')}
  </div>

  <button id="next" ${!state.selectedAnswer ? 'disabled' : ''}>
    Next
  </button>
`;

  document.querySelectorAll('.answer').forEach((btn) => {
    btn.addEventListener('click', handleAnswer);
  });

  document.getElementById('next')?.addEventListener('click', handleNext);
}

// ----- Event Handlers -----

async function restartQuiz() {
  setState({ status: 'loading' });
  render();

  try {
    const questions = await fetchQuestions();
    setState({
      status: 'ready',
      currentQuestionIndex: 0,
      questions: questions,
      selectedAnswer: null,
      score: 0,
    });
    render();
  } catch {
    setState({ status: 'error' });
    render();
  }
}

function handleAnswer(e) {
  const selected = e.target.dataset.answer;
  const question = state.questions[state.currentQuestionIndex];

  const isCorrect = selected === question.correctAnswer;

  setState({ selectedAnswer: selected, score: isCorrect ? state.score + 1 : state.score });
  render();
}

function handleNext() {
  setState({
    currentQuestionIndex: state.currentQuestionIndex + 1,
    selectedAnswer: null,
  });
  render();
}

function startQuiz() {
  const amount = Number(document.getElementById('amount').value);
  const difficulty = document.getElementById('difficulty').value;
  const category = document.getElementById('category').value;

  setState({
    amount,
    category,
    difficulty,
    currentQuestionIndex: 0,
    score: 0,
  });

  startQuizFlow();
}
