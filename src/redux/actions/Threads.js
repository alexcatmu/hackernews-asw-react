let url = "https://hackernews-asw-12b.herokuapp.com";

export function getThreads(id) {
  let call = url + `/threads/${id}`;
  const config = {
    headers: {
      Accept: "application/json",
      token: localStorage.getItem("token"),
    },
  };
  return function (dispatch) {
    return fetch(call, config)
      .then((response) => {
          if (response.ok) {
            console.log("ok")
              response.json().then((json) => {
              console.log("json", json)
            dispatch({ type: "THREADS", payload: json });
          });
        } else {
          console.log("api call failed")
        }
      })
      .catch((error) => console.log("Error fetching data : " + error.message));
  };
}
