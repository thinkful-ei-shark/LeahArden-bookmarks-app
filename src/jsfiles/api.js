

//create const for URL
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/leaharden'

//create API function to fetch API 
//add errors after everything works?
const apiFetch = function (...args){
    // setup var in scope outside of promise chain
    let error;
    return fetch(...args)
    .then(response => {
        if(!response.ok) {
            // if response is not 2xx, start building error object
            error = {code: response.status};

            // if response is not JSON type, place statusText in error object and
            // immediately reject promise
            if(!response.headers.get('contect-type').includes('json')) {
                error.message = response.statusText;
                return Promise.reject(error);
            }
        }
        // otherwise, return parsed JSON
        return response.json();
    })
    .then(jsonData => {
        // if error exists, place the JSON message into the error object and 
        // reject the Promise with your error object so it lands in the next 
        // catch.  IMPORTANT: Check how the API sends errors -- not all APIs
        // will respond with a JSON object containing message key
        if(error) {
            error.message= jsonData.message;
            return Promise.reject(erorr);
        }
        // otherwise, return the json as normal resolved Promise
        return jsonData;
    });
};


//create function to get items from API function
const getBookmarks = function () {
    return apiFetch(`${BASE_URL}/bookmarks`);
};

//create function to stringify data from the API function to create a bookmark
//this will need the header and method inside METHOD IS POST
const createBookmark = function (bookmark) {
    const newBookmark = JSON.stringify(bookmark)
    return apiFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: newBookmark
    });
};

//create function that updates the bookmark USES STRIGNIFY
//this will need the header and method inside METHOD IS PATCH 

const editBookmark = function (id, updateBookmark){
    const editedBookmark = JSON.stringify(updateBookmark);
    return apiFetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: editedBookmark
    });
};

//create function to delete bookmark USES STRINGIFY
//this will need the header and method inside METHOD IS DELETE
const deleteBookmark = function (id) {
    console.log('deleteBookmark ran')
    return apiFetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'DELETE'
    });
};


export default{
    getBookmarks,
    createBookmark,
    editBookmark,
    deleteBookmark,
};