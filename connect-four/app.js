/*The DOMContentLoaded event fires when the initial HTML
document has been completely loaded and parsed, without
waiting for stylesheets, images, and subframes to finish loading.*/
document.addEventListener('DOMContentLoaded',() => {

const squares = document.querySelectorAll('.grid div')
const result = document.querySelector('#result')
const displayCurrentPlayer= document.querySelector('#current-player')
let currentPlayer=1


for (var i = 0, len=squares.length; i < len; i++) 
    (function(index){
        
   //Set to each square a onClick function
    squares[i].onclick = function(){
        //if the square below our is taken && if the square chose
        //is not already took
        if (squares[index + 7].classList.contains('taken')&&
        !squares[index].classList.contains('taken')) {

            if (currentPlayer === 1) {
                //Add new labels to the square to identify them
                squares[index].classList.add('taken')
                squares[index].classList.add('player-one')
             
                currentPlayer=2
                //The innerHTML property sets or returns
                //the HTML content of an element.
                displayCurrentPlayer.innerHTML=currentPlayer

            }else if(currentPlayer===2){
                squares[index].classList.add('taken')
                squares[index].classList.add('player-two')
                
                currentPlayer=1
                displayCurrentPlayer.innerHTML=currentPlayer

            }

        }else {alert('Can\'t go here')}
            
}
    })(i)    

})