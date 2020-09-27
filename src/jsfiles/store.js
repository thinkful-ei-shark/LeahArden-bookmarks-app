//imports on top


//create bookmarkList as empty array
let bookmarkList = [];
let error = null;
let filter = false;
let adding = false;
let selectedRating = 0;

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


const filteredBookmarksArray = function (filterNum){
     //this.bookmarkList = this.bookmarkList.filter( bookmark => bookmark.rating >= filterNum);
     //console.log(bookmarkList);
     this.selectedRating = filterNum;
};


const expandedBookmarkToggle = function (id) {
    //find id to expand
    let expandedBookmark = this.bookmarkList.find(bookmark => bookmark.id === id)
    //toggle expand value
    //console.log('id:', expandedBookmark.id);
    console.log(bookmarkList);
    console.log(id);
    if (expandedBookmark.expand) {
      expandedBookmark.expand = false;
    } else {
      expandedBookmark.expand = true
    }
  }

  const setError = function (error) {
    this.error = error;
  };

//exports below
export default{
    bookmarkList,
    error,
    filter,
    adding,
    findById,
    addNewBookmark,
    deleteBookmark,
    updateBookmark,
    filteredBookmarksArray,
    expandedBookmarkToggle,
    setError,
    selectedRating,
}
