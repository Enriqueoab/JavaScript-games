#  Instructions on how to run the program

In order to execute the instructions from the script developed we have to have already install node.js in our pc, we then can execute from the terminal of out IDE, if we preferred, or the general terminal going to the main file where we were clone this project, from there we
can run the command:

```
node code/CRUD_functions.js

```

This command should show us an answer as the next below:

node code/CRUD_functions.js
# => _______________Adding somo new book copies_____________
# =>_____________Showing the stock_____________
# {
#  '9781472258229': [ 'Borrowed copies: 0', 'Available copies: 1' ],
#  '9781857231380': [ 'Borrowed copies: 0', 'Available copies: 1' ],
#  '9780553283686': [ 'Borrowed copies: 0', 'Available copies: 1' ]
# }
#
# =>_____________Adding a new book_(9789652315447)________
# =>_____________Borrowing book_(9781472258229)________
# {
#  '9781472258229': [ 'Borrowed copies: 0', 'Available copies: 1' ],
#  '9780441569595': [ 'Borrowed copies: 0', 'Available copies: 1' ],
#  '9781857231380': [ 'Borrowed copies: 0', 'Available copies: 1' ],
#  '9780553283686': [ 'Borrowed copies: 0', 'Available copies: 1' ]
# }
#
# =>_____________Returning book_(9781472258229)________
# The book 9781472258229 are all already returned!
# 9781472258229,Kindred,Octavia E. Butler,1979 ,Successfully Borrowed!!
#
```
The comands looks like:
```ruby
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
```
## 1. Main functions

The functions to control the data of the file [`catalog.csv`](catalog.csv) are in the file [`./code/CRUD_functions.js`](CRUD_functions.js) which has the execute commands too at the end if the functions. The mains functions are:

Show us all the information related with a specific book, borrowed copies, stock copies and book' isbn.

```ruby
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

```

 Show us the information related with a book with more detail, ISBN,Title,
 Author,Publication_date. This function has 2 behaviours controlled by a boolean variable, these behaviours are one for show the data and the other one to returned.

```ruby
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

```

 The way I created the program logic when we borrow a book' copy we set in the file the isbn parameter to negative, I made that way to be able to know which  copies are borrowed even if we use the excel file to see the registers. The function in charge of change the isbn field that way is:

```ruby
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

```
The same explanation but doing the oposite operation for the return book,
 delete the negative character of the isbn field.
 action function in charge of change the isbn field that way is:

```ruby
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

```
 We can add a new complete book to the field, we have to use the function below and the parameter is a value-key object where the keys are ISBN,Title,Author,Publication_date.

```ruby
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

```
 One of the request of the exercise was create a function able to get a book in the file and create throught its data others copies, this action is manage by the function below. when we don't specify quantity of copies the default value is one.

```ruby
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

```
## 2. Some other functions

In the same file [`./code/CRUD_functions.js`](CRUD_functions.js) we are going to see some functions which are used for the mains functions to get data and other different features needed.

It generat and return a set list which contains the isbn, avoiding duplications, of each book:

```ruby
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
```
Read the file and return us the data ina an array:

```ruby
function get_catalog_array() {

  var catalog = fs.readFileSync(catalogPath)
      .toString() // convert Buffer to string
      .split('\n') // split string to lines
      .map(e => e.trim()) // remove white spaces for each line
      .map(e => e.split(',').map(e => e.trim())); // split each line to array
  
  return catalog;

}
```
Read the file and count just the books that are not borrowed, that means whith no "-" character in the isbn field:
 
```ruby
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
```
Read the file and count just the books that are borrowed, that means whith a "-" character in the isbn field:
 
```ruby
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
```
## 2. Controllers file

In the file code we can see a file called [`./code/Controllers_functions.js`](Controllers_functions.js) which it doesn't have any code currently, just some names of future functions which they are in charge of control that the data of the books are the proper one (Numbers, strings, length, date,..).