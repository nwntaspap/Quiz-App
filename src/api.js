const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

export async function fetchQuestions() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.results;
}

// ----- Helpers -----

function decodeHTML(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}
