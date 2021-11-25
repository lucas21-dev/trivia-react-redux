async function fetchTriviaQuestions(token) {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const triviaData = await response.json();

  return triviaData;
}

export default fetchTriviaQuestions;
