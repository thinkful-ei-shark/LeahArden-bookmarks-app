
//imports up top
//should import all/most files
import $ from 'jquery';
import 'normalize.css';
import './../styles.css';
import api from './api.js';
import bookmarks from './bookmarks';


//Should contain the main function which renders the page
//will call other functions to render

const main = function (){
    bookmarks.addNewButton();
}


//need to call the main functiont which runs when the page is loaded

$(main);

//No exports needed