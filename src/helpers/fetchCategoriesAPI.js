const GET_CATEGORIES_URL = 'https://opentdb.com/api_category.php';

const fetchCategoriesApi = async () => {
  try {
    const request = await fetch(GET_CATEGORIES_URL);
    const response = await request.json();

    return response;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export default fetchCategoriesApi;
