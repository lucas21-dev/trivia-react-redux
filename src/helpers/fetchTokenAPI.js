export const GET_TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

export const fetchTokenAPI = async () => {
  try {
    const request = await fetch(GET_TOKEN_URL);
    const response = await request.json();

    return response;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
