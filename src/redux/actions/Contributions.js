let url = "https://hackernews-asw-12b.herokuapp.com";
// let url = "http://localhost:3000"

export function getContribution(id){
    let call = url + '/contributions/' + id;
    const config = {
        headers: {
            Accept: "application/json",
        },
    };
    return function(){
        return fetch(call, config)
            .then((response) =>{
                if(response.ok){
                    return response.json()
                }
            })
            .catch((error)=> console.log("Error fetching data: " + error.message));
    };
}