import { state, setState } from './state.js';
import { fetchQuestions } from './api.js';
import { render } from './ui.js';

async function init() {
  try {
    // Show Loading
    setState({ status: 'loading' });
    render();

    const questions = await fetchQuestions();
    setState({ questions, status: 'ready' });
    render();
  } catch {
    setState({ status: 'error' });
    render();
  }
}

init();
