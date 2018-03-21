export const fetchApi = () => {
    return fetch('/mock/mock.json')
      .then(response => response.json())
      .then(data => {
        console.info(data);
        return data;
      })
};
