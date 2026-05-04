const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

export async function fetchQuestions() {
  const res = await fetch(API_URL);
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
  return [...arr].sort(() => Math.random() * 0.5);
}

function normalizeQuestions(question) {
  const answers = [...question.incorrect_answers, question.correct_answer];

  return {
    question: decodeHTML(question.question),
    correctAnswer: decodeHTML(question.correct_answer),
    answers: shuffle(answers.map(decodeHTML)),
  };
}
