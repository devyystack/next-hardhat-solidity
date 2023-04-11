export const SessionDataStorage = (key, value) => {
  if (value) {
    sessionStorage.setItem(key, value);
  } else {
    console.log("session not set");
  }
};
