var catalogPath = "./thelibarian/catalog.csv";

const fs = require("fs");
var parse = require('csv-parse');
var json2csv = require("json2csv").parse;


//Functions

//Use the differents created functions to show the book' stock
function seeBooksStock() {
  var isbnBook = getDifferentBooksSetList();
  boCopies = 0;
  stCopies = 0;
  var mapIsbnAndCopies={}

  for (let isbn of isbnBook.keys()) {

    boCopies = countBorrowedCopies(isbn);
    stCopies = countStockCopies(isbn);

    mapIsbnAndCopies[isbn] = ["Borrowed copies: "+boCopies, "Available copies: "+stCopies];
    
  }
    console.log(mapIsbnAndCopies);
        
}

//Create a Set list to store the differents ISBN
function getDifferentBooksSetList() {
  var book = get_catalog_array();

  var isbnBook = {};
  var bookIsbn = "";
  //Obj set to store unique values 
  const uniqueIsbnBook = new Set();

for (let i = 1; i < book.length; i++) {
  bookIsbn =  book[i][0];

  if (bookIsbn <= 0) {

      var bookIsbn = book[i][0].replace("-",""); 
  }
  uniqueIsbnBook.add(bookIsbn);

}

return uniqueIsbnBook;

}


function get_catalog_array() {

  var catalog = fs.readFileSync(catalogPath)
      .toString() // convert Buffer to string
      .split('\n') // split string to lines
      .map(e => e.trim()) // remove white spaces for each line
      .map(e => e.split(',').map(e => e.trim())); // split each line to array
  
  return catalog;

}

//Function to show a book data or return a book data
//change behaviour with the boolean, (true;show, false;return)
function getBookData(isbn, showData) {

  var catalogArray = get_catalog_array();

  for (let i = 1; i < catalogArray.length; i++) {
    
    if (showData != false && (catalogArray[i][0] == isbn || catalogArray[i][0] == "-"+isbn)) {
      console.log(catalogArray[i]);
      //Avoid show all the copies
      break;
    }else if (showData != true && (catalogArray[i][0] == isbn || catalogArray[i][0] == "-"+isbn)){
      var bookData = catalogArray[i]; 
      return bookData;
    }
  }
}

//Get the books copies in stock, used by borrowBook function
function countStockCopies(isbn) {
  var catalogArray = get_catalog_array();
  var quantityCopies = 0;

  for (let i = 0; i < catalogArray.length; i++) {

    if (catalogArray[i][0] == isbn) {
      quantityCopies++;
    }

  }
  return quantityCopies;
}

//Get the books copies borrowed, used by returnBook function
function countBorrowedCopies(isbn) {
  var catalogArray = get_catalog_array();
  var quantityCopies = 0;

  for (let i = 0; i < catalogArray.length; i++) {

    if (catalogArray[i][0] == "-"+isbn) {
      quantityCopies++;
    }

  }
  return quantityCopies;
}


function borrowBook(isbn) {
  var quantityCopies = countStockCopies(isbn);
  
  //Condition to avoid error of typing wrong isbn
  if (quantityCopies != 0) {
    var borrowedBook = getBookData(isbn,false);

    var parser = parse({delimiter: ';'}, function(err, data = get_catalog_array()){

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] == isbn) {
      data[i] ='-' + data[i][0] + "," + data[i][1]+ "," + data[i][2]+ "," + data[i][3];
      //Avoid keep looking
      break;
      
    }
  }  
  console.log(borrowedBook+" ,Successfully Borrowed!!");
      var outputData = data.join('\n') ;
      fs.writeFile(catalogPath, outputData, function(err) { if(err) { return console.log(err); }});
      
      });
      
      
      fs.createReadStream(catalogPath).pipe(parser);

  }else{

    console.log("The isbn "+isbn+" is not available");
  }
}

function returnBook(isbn) {
  var quantityCopies = countBorrowedCopies(isbn);
  
  //Condition to avoid error of typing wrong isbn
  if (quantityCopies != 0 ) {
    var returnedBook = getBookData(isbn,false);

    var parser = parse({delimiter: ';'}, function(err, data = get_catalog_array()){

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] == "-"+isbn) {
      data[i] = data[i][0].replace("-","") + "," + data[i][1]+ "," + data[i][2]+ "," + data[i][3];
      //Avoid keep looking
      break;
      
    }
  }  
  console.log(returnedBook+" ,Successfully returned!!");
      var outputData = data.join('\n') ;
      fs.writeFile(catalogPath, outputData, function(err) { if(err) { return console.log(err); }});
      
      });
      
      
      fs.createReadStream(catalogPath).pipe(parser);

  }else{

    console.log("The book "+isbn+" are all already returned!");
  }
}

//add a new book mapping the values of each field to control
//specific data of each book
function AddNewBook(book) {
  var csv = json2csv(book).replace(
    '"ISBN","Title","Author","Publication_date"',
    ""
  );

  fs.stat(catalogPath, function (err) {
    if (err == null) {

      fs.appendFile(catalogPath, csv, function (err) {
        if (err) throw err;
      });
    }
  });
}

function AddMoreBookCopies(isbn, quantity) {
  if (quantity == undefined) {
    quantity = 1;
  }
  for (let i = 0; i < quantity; i++) {

    var book = getBookData(isbn,false);
    const mapBook = [  
      {
      ISBN: book[0].replace("-",""),
      Title: book[1],
      Author: book[2],
      Publication_date: book[3]
    }];

    var csv = json2csv(mapBook).replace(
      '"ISBN","Title","Author","Publication_date"',
      " "
    );
  
    fs.stat(catalogPath, function (err) {
      if (err == null) {
  
        fs.appendFile(catalogPath, csv, function (err) {
          if (err) throw err;
        });
      }
    });
  }
}

console.log("_______________Adding somo new book copies_____________");
AddMoreBookCopies(9781857231380)
AddMoreBookCopies(9781472258229,4)
console.log("_______________Showing the stock_____________");
seeBooksStock();
console.log("_______________Adding a new book_(9789652315447)________");
const newBook = [  
    {
    ISBN: 9789652315447,
    Title: 'The essence',
    Author: 'Ursulin',
    Publication_date: 1879
  }];

AddNewBook(newBook);
getBookData(9789652315447,true);
console.log("_______________Borrowing book_(9781472258229)________");
borrowBook(9781472258229);
seeBooksStock();

console.log("_______________Returning book_(9781472258229)________");
returnBook(9781472258229);