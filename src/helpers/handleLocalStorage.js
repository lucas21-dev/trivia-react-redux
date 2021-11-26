export const setLocalStorage = (keyName, data) => {
  localStorage.setItem(keyName, JSON.stringify(data));
};

export const getLocalStorage = (keyName) => JSON.parse(localStorage.getItem(keyName));

export const sendRankingToStorage = (userRank) => {
  let ranking = getLocalStorage('ranking');
  if (!ranking) {
    ranking = [];
  }

  const newRank = [...ranking, userRank];
  setLocalStorage('ranking', newRank);
};
