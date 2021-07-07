//-----------Concepts-------------------------
/*classList, This property is useful to add 
EX: (square.classList(mole) = square mole),
 remove and toggle CSS classes on an element.

Arrow function(=>),These are for shorter function syntax
*/

const squares=document.querySelectorAll('.square');
const mole =document.querySelectorAll('.mole');
const timeLeft=document.querySelector('#time-left');

let score=document.querySelector('#score');
let result=0;
let currentTime=timeLeft.textContent;
let timeInterval=1000;

function getRandomSquare(){
    
    /*For each "square" class name that the collection "squares" has
    we remove the one with mole in it*/
    squares.forEach( className => {
        //Removing the class 'mole' of our grid
        className.classList.remove('mole')
       
    });
        //Math.floor to round down the integer
    let randomSquare= squares[Math.floor(Math.random() * 9)];
    
    //Now we add to the random position of our grid
    //the name class mole (That way our css file will
    //set the image)
    randomSquare.classList.add('mole');

    //randomSquare is a square element of our html
    //so we can get the id where the user should click
    hitPosition=randomSquare.id;

} 

//Using the id of our square div we set the listener to them
//and compare to know if the user click on it
squares.forEach(id =>{
    id.addEventListener('mouseup',() =>{

        if (id.id === hitPosition) {
            
            result=result + 1;
            score.textContent=result;

        } 
    })
})

function moleMovement(){

let molePosition=null;
molePosition= setInterval(getRandomSquare,timeInterval);

}
moleMovement(); 
let molePosition=setInterval(countDown,timeInterval);


function countDown(){
currentTime--;
//Set the html elementto the new value
timeLeft.textContent=currentTime;
if (currentTime == 0) {
    //Stop the timer to stop the mole's movement
    clearInterval(molePosition);
    //Set an interval to the alert to have time to set
    //the seconds left to 0
    setInterval(()=>{alert("Game Over, score: "+score.textContent)},timeInterval);
    
    setInterval(()=>{document.location.reload()},timeInterval);
    
}

}
