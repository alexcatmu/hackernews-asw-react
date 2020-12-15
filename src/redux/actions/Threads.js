let url = "https://hackernews-asw-12b.herokuapp.com";
//let url = "http://localhost:3000"

export function getThreads(id) {
    let call = url + `/threads/${id}`;
    const config = {
        headers: {
            'Accept': "application/json",
            'token': localStorage.getItem("token"),
        }
    };
    return function (dispatch) {
        return fetch(call, config)
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        dispatch({type: "THREADS", payload: json});
                    })
                }
                else {
                }
            })
            .catch(error => console.log("Error fetching data : " + error.message));
    };
}
