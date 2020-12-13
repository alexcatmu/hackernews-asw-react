let url = "https://hackernews-asw-12b.herokuapp.com";

export function getHome(){
    let call = url + '/';
    const config = {
        headers: {
            Accept: "application/json",
            token: localStorage.getItem("token"),
        },
    };
    return function(dispatch){
        return fetch(call, config)
            .then((response) =>{
                if(response.ok){
                    console.log(`api call: ${call} ok`);
                    response.json().then((json) => {
                        dispatch({
                            type: "HOME", payload: json});
                    });
                } else{
                    console.log(`api call: ${call} failed`);
                }
            })
            .catch((error)=> console.log("Error fetching data: " + error.message));
    };
}