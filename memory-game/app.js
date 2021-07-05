document.addEventListener('DOMContentLoaded',() =>{

//Array of cards with name to call them later    
const cardArray =[
{
    name:'tesla',
    img:'images/tesla.jpg'
},
{
    name:'tesla',
    img:'images/tesla.jpg'

},
{
    name:'nissan',
    img:'images/nissan.jpg'

},
{
    name:'nissan',
    img:'images/nissan.jpg'

},
{
    name:'acura',
    img:'images/acura.jpg'

},
{
    name:'acura',
    img:'images/acura.jpg'

},
{
    name:'lotus',
    img:'images/lotus.jpg'

},
{
    name:'lotus',
    img:'images/lotus.jpg'

},
{
    name:'bugati',
    img:'images/bugati.jpg'

},
{
    name:'bugati',
    img:'images/bugati.jpg'

},
{
    name:'audi',
    img:'images/audi.jpg'

},
{
    name:'audi',
    img:'images/audi.jpg'

}
]//End of the array

//Sort the array in a different way eack time we play
cardArray.sort(() => 0.5 -Math.random());

//-------GLOBAL VARIABLES--------
//Pick up the class element "grid" from our html
const grid =document.querySelector('.grid');
///Pick up the element #result from our HTML
const score= document.querySelector('#result');
//Arrays that content the chose cards
var cardsChosenName=[];
var cardsChosenId=[];
var cardsMatched=[];
//-------------------------------

//Start of the game-board
function createBoard(){

//We loop our array to create a img element
for (let i = 0; i < cardArray.length; i++) {
    var card= document.createElement('img');
    card.setAttribute('src','images/cover.jpg');
    card.setAttribute('id',i)//Set an id to each card (value-key)
    //Listening Img element clicked
    card.addEventListener('click',cardFliped);
    //To put our img element created into de div (grid) 
    grid.appendChild(card);
}
}


function checkMatches(){
    //That way we get all the img elements 
    //querySelectorAll return a Collection (NodeList)
    var cards= document.querySelectorAll('img');

    //cardsChosenId has 2 values we got them by the eventListener
    //of the function createBoard()
    const firstId= cardsChosenId[0];
    const secondId= cardsChosenId[1];

    //Now we check the cards elements and set the square
    //to blank in case of match images

    if(cardsChosenName[0] === cardsChosenName[1]){
       
        //Msg to the user
        alert('YOU GOT A MATCH!!');
        //Set the square to blank img
        cards[firstId].setAttribute('src','images/blank.jpg');
        cards[secondId].setAttribute('src','images/blank.jpg');
        //We store the matched name's card into the cardsMatched array
        cardsMatched.push(cardsChosenName);

    }else{

        //If they don't match we flip them back again
        cards[firstId].setAttribute('src','images/cover.jpg');
        cards[secondId].setAttribute('src','images/cover.jpg');
        alert('Think harder!');

    }
    //Reset the arrays
    cardsChosenName=[];
    cardsChosenId=[];
    //Show the points for every match
    score.textContent=cardsMatched.length;
    //The max score is reached set messaje and
    // restart with 2 sec. delay
    if(cardsMatched.length == cardArray.length/2){

        score.textContent="Congrats you got them all!!";
        setTimeout(resetGame,1500);

    }
}

function resetGame(){
    //That way we can reset the board
    document.location.reload();


}

function cardFliped(){
    //Get the id card attribute created above
    var cardId= this.getAttribute('id');
    //Push the cards from the "cardArray"
    cardsChosenName.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    //As in that point we already have a card picked
    //we can set an attribute to the square clicked
    this.setAttribute('src', cardArray[cardId].img);
    //We are going to be allow to be a max length of 2
    //cards to avoid see more cards

    if (cardsChosenName.length === 2) {
        //Some buffer time to see the cards images
       
        setTimeout(checkMatches,300);
        

    } 

}
//Execute program
createBoard();


})//End of the listener event
