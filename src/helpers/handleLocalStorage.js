export const setLocalStorage = (keyName, data) => {
  localStorage.setItem(keyName, JSON.stringify(data));
  console.log(localStorage.getItem(keyName));
};

export const getLocalStorage = (keyName) => JSON.parse(localStorage.getItem(keyName));
