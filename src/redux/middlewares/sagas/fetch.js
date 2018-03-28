export const fetchApi = (action) => {
  console.info(action)
    return fetch(action.url,action.param)
      .then(response => response.json())
      .then(data => {
        console.info(data);
        return data;
      })
};
