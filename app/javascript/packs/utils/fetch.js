import axios from "axios";

export const authenticityToken = () => {
  const token = document.querySelector('meta[name="csrf-token"]');
  return token ? token.content : null;
};

const headers = () => {
  return {
    Accept: "*/*",
    "Content-Type": "application/json",
    "X-CSRF-Token": authenticityToken(),
    "X-Requested-With": "XMLHttpRequest"
  };
};

export const fetch = (method, url, body) => {
  const options = {
    method,
    headers: headers(),
    data: body,
    url
  };
  return axios(options);
};
