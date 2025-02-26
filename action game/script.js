let score=0;
let cross=true;
document.addEventListener('keydown', function(event) {
    var keyCode = event.keyCode; // Storing the code of the key that was pressed
    console.log("Key code:", keyCode);
    if (keyCode === 38) {/*when you clik up arrow-> move up */
        dino = document.querySelector('.dino');
        dino.classList.add('animatedino'); // Adding the class to the dino element for jumping
        setTimeout(()=>{
            dino.classList.remove('animatedino'); // Removing the 'animatedino' class after 700ms
        }, 700);
    }
    if (keyCode === 39) {/*when you click right arrow -> move right */
        dino = document.querySelector('.dino');
        dinox=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=dinox+112+"px";
    }
    if (keyCode === 37) {/*when you click left arrow -> move left */
        dino = document.querySelector('.dino');
        dinox=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=(dinox-112)+"px";
    }
});
setInterval(()=>{
    dino=document.querySelector('.dino');  /*selectig the html element */
    gameover=document.querySelector('.gameover');
    obstacles=document.querySelector('.obstacles');

    dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));/*retrieve the computed CSS styles of the .dino element and store the values of the left and top properties as integers in variables dx and dy */
    dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

    ox=parseInt(window.getComputedStyle(obstacles,null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacles,null).getPropertyValue('top'));

    offsetx=Math.abs(dx-ox);
    offsety=Math.abs(dy-oy);
    console.log(offsetx,offsety);
    if(offsetx<73 && offsety<52){/*condition for game over */
        gameover.innerHTML='game over' 
        obstacles.classList.remove('obstaclesAni')/*removes the CSS class 'obstaclesAni' from the obstacles element's class list*/
    }
    else if (offsetx<100 && cross){  /*updating score */
        score+=1;
        updatescore(score);
        cross=false;
        setTimeout(()=>{
            cross=true;
        },1000);
    }
    setTimeout(() => {
        // Retrieve the current animation duration
        const currentDuration = parseFloat(window.getComputedStyle(obstacles, null).getPropertyValue('animation-duration'));
        // Reduce the animation duration by a certain value (e.g., 0.1 seconds)
        const newDuration = currentDuration - 0.1;
        // Check if the new duration is greater than a minimum threshold (e.g., 0.1 seconds)
        if (newDuration > 0.1) {
            // Update the animation duration of the obstacles
            obstacles.style.animationDuration = newDuration + 's';
        }
    },500);
},10);
function updatescore(score){
    scorecont.innerHTML="your score: " + score
}