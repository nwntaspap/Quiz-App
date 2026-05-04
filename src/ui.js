import { state, setState } from './state.js';

export function render() {
  const root = document.getElementById('app-root');
  if (!root) return;

  // Loading state
  if (state.status === 'loading') {
    root.innerHTML = `<p>Loading...</p>`;
    return;
  }

  // Error state
  if (state.status === 'error') {
    root.innerHTML = `<p>Something went wrong.</p>`;
    return;
  }

  // Ready state
  const question = state.questions[state.currentQuestionIndex];

  root.innerHTML = `
    <h2>${question.question}</h2>
  `;
}
