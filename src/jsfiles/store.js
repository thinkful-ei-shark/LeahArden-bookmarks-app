//imports on top


//create bookmarkList as empty array
const bookmarkList = [];
let error = null;
let filter = false;
let adding = false;
let filteredBookmarks = [];

//create function that will find the current item by id
const findById = function (id) {
    return this.bookmarkList.find(currentBookmark => {
        currentBookmark.id ===id
    });
};

//create function that will add new bookmark to list
const addNewBookmark = function (newBookmark) {
    return this.bookmarkList.push(newBookmark);
};

//create function that will delete bookmark
//find id of bookmark and deletes
const deleteBookmark = function (id) {
    this.bookmarkList = this.bookmarkList.filter(currentBookmark => {
        currentBookmark.id !== id
    });
};

//create function that will update bookmark
const updateBookmark = function (id, newBookmark){
    const currentBookmark = this.findById(id);
    Object.assign(currentBookmark, newBookmark);
};

//create function that will filter bookmarks according to chosen rating
//if filter is >= rating chosen, push to the new array
const filterBookmarks = function (rating){
    this.filter = true;
    this.bookmarkList.forEach(bookmark => {
        if(bookmark.rating >= rating) {
            this.filterBookmarks.push(bookmark);
        } 
    })
};

//create filter to get the vaule from the rating filter
const ratingfilter = function (value) {
    this.ratingfilter = value;
} 

//create function that will set the error message


//exports below
export default{
    bookmarkList,
    error,
    filter,
    adding,
    filteredBookmarks,
    findById,
    addNewBookmark,
    deleteBookmark,
    updateBookmark,
    filterBookmarks,
}