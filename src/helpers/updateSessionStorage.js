export const updateSessionStorage = (value) => {
  window.sessionStorage.setItem("session_items", JSON.stringify(value));
};
