import { state, setState } from './state.js';
import { fetchQuestions } from './api.js';
import { render } from './ui.js';

export async function startQuizFlow() {
  try {
    // Show Loading
    setState({ status: 'loading' });
    render();

    // Show Ready
    const questions = await fetchQuestions({
      amount: state.amount,
      category: state.category,
      difficulty: state.difficulty,
    });

    setState({ questions, status: 'ready' });
    render();
  } catch {
    // Show Error
    setState({ status: 'error' });
    render();
  }
}

// Firstly we had state status set to "loading"
// now we made it "setup" so render shows setup screen
render();
