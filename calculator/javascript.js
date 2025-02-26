let string="";//having space on display of calculator
let buttons = document.querySelectorAll('.button');//selecting all whose class is button
Array.from(buttons).forEach((button)=>{
    button.addEventListener('click', (e)=>{
        if(e.target.innerHTML=="="){
            string=eval(string);
            document.querySelector('input').value=string;
        }
        else if(e.target.innerHTML=="c"){
            string="";//clear every thing from box
            document.querySelector('input').value=string;
        }
        else{
        console.log(e.target);
        //jo v click karenge o display ho jaye ga
        string = string + e.target.innerHTML;
        document.querySelector('input').value=string;//making input tag value to string
        }
    })
})