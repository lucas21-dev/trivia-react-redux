export const BASE_URL = 'https://opentdb.com/api.php?';

async function fetchTriviaQuestions(token, url) {
  try {
    const response = await fetch(`${url}&token=${token}`);
    const triviaData = await response.json();

    return triviaData;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export default fetchTriviaQuestions;
