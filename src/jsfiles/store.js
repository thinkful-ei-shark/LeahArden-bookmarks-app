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
        if (currentBookmark.id ===id){
            return true;
        } else {
            return false;
        }
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
        if(currentBookmark.id !== id){
            return true;
        } else {
            return false;
        };
    });
};

//create function that will update bookmark
const updateBookmark = function (id, newBookmark){
    const currentBookmark = this.findById(id);
    Object.assign(currentBookmark, newBookmark);
};

//create function that will filter bookmarks according to chosen rating
//if filter is >= rating chosen, push to the new array
const filterBookmarks = function (filterNum){
    this.filter = true;
    this.bookmarkList.forEach(bookmark => {
        if(bookmark.rating >= filterNum) {
            this.filteredBookmarks.push(bookmark)
        } 
    })
};
/*
const expandedBookmark = function (id) {
    //find id to expand
    let expandedBookmark = bookmarkList.find(bookmark => bookmark.id === id)
    //toggle expand value
    if (expandedBookmark.expand) {
      expandedBookmark.expand = false;
    } else {
      expandedBookmark.expand = true
    }
  }
  */



const expandedBookmark = function (id) {
    this.expanded = !this.expand;
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
    expandedBookmark,
}
