async function fetchTriviaQuestions(token) {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const triviaData = await response.json();

    return triviaData;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export default fetchTriviaQuestions;
