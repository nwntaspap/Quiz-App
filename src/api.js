const BASE_URL = 'https://opentdb.com/api.php';

export async function fetchQuestions({ amount = 10, category = '', difficulty = '' } = {}) {
  const params = new URLSearchParams({
    amount,
    type: 'multiple',
  });

  if (category) params.append('category', category);
  if (difficulty) params.append('difficulty', difficulty);

  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  const data = await res.json();
  return data.results.map(normalizeQuestions);
}

// ----- Helpers -----

function decodeHTML(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function normalizeQuestions(question) {
  const answers = [...question.incorrect_answers, question.correct_answer];

  return {
    question: decodeHTML(question.question),
    correctAnswer: decodeHTML(question.correct_answer),
    answers: shuffle(answers.map(decodeHTML)),
  };
}
