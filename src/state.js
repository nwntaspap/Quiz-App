export const state = {
  status: 'setup', // 'loading' | 'ready' | 'error' | 'finished' | 'setup'
  currentQuestionIndex: 0,
  questions: [],
  selectedAnswer: null,
  score: 0,
  // Added Url Params
  amount: 10,
  category: '',
  difficulty: '',
};

export function setState(newState) {
  Object.assign(state, newState);
}
