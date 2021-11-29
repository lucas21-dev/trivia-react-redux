export const setLocalStorage = (keyName, data) => {
  localStorage.setItem(keyName, JSON.stringify(data));
};

export const getLocalStorage = (keyName) => JSON.parse(localStorage.getItem(keyName));

export const sendRankingToStorage = (userRank) => {
  const ranking = getLocalStorage('ranking');

  const newRank = !ranking ? [userRank] : [...ranking, userRank];
  setLocalStorage('ranking', newRank);
};
