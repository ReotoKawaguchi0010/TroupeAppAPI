export const paramObj = locationSearch => {
    let paramObj = {};
    let searchArray = locationSearch.substr(1).split('&');
    for(let i in searchArray){
        let splitSearch = searchArray[i].split('=');
        paramObj[splitSearch[0]] = splitSearch[1];
    }
    return paramObj
}

