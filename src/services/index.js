const API_URL = process.env.API_URL;

export const post = (path, data) => {
  return fetch(`${API_URL}/${path}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      throw err;
    });
};

export const getById = (path, id) => {
  return fetch(`${API_URL}/${path}/${id}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data[0];
    })
    .catch(err => {
      throw err;
    });
};
