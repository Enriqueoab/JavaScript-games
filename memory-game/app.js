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

//Pick up the class element "grid" from our html
const grid =document.querySelector('.grid')

//Start of the game-board
function createBoard(){

//We loop our array to create a img element
for (let i = 0; i < cardArray.length; i++) {
    var card= document.createElement('img')
    card.setAttribute('src','images/cover.jpg')
    card.setAttribute('id',i)//Set an id to each card
    //Listening Img element clicked
    //card.addEventListener('click',cardFliped());
    //To put our img element created into de div (grid) 
    grid.appendChild(card)
}
}
createBoard()

})//End of the listener event
