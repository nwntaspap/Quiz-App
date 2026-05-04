export const state = {
  status: 'loading', // 'loading' | 'ready' | 'error' | 'finished'
  currentQuestionIndex: 0,
  questions: [],
  selectedAnswer: null,
  score: 0,
};

export function setState(newState) {
  Object.assign(state, newState);
}
