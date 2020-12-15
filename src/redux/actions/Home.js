let url = "https://hackernews-asw-12b.herokuapp.com";
// let url = "http://localhost:3000"
export function getHome(){
    let call = url + '/';
    const config = {
        headers: {
            Accept: "application/json",
        },
    };
    return function(dispatch){
        return fetch(call, config)
            .then((response) =>{
                if(response.ok){
                    response.json().then((json) => {
                        dispatch({
                            type: "HOME", payload: json});
                    });
                } else{
                }
            })
            .catch((error)=> console.log("Error fetching data: " + error.message));
    };
}

export function getNewest(){
    let call = url + '/newest';
    const config = {
        headers: {
            Accept: "application/json",
        },
    };
    return function(dispatch){
        return fetch(call, config)
            .then((response) =>{
                if(response.ok){
                    response.json().then((json) => {
                        dispatch({
                            type: "NEWEST", payload: json});
                    });
                } else{
                }
            })
            .catch((error)=> console.log("Error fetching data: " + error.message));
    };
}

export function getAsk(){
    let call = url + '/ask';
    const config = {
        headers: {
            Accept: "application/json",
        },
    };
    return function(dispatch){
        return fetch(call, config)
            .then((response) =>{
                if(response.ok){
                    response.json().then((json) => {
                        dispatch({
                            type: "ASK", payload: json});
                    });
                } else{
                }
            })
            .catch((error)=> console.log("Error fetching data: " + error.message));
    };
}