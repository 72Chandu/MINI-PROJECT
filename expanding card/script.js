const pannel=document.querySelectorAll('.pannel');
pannel.forEach((pannel)=>{
    pannel.addEventListener('click',()=>{
        removeActiveClasses();
        pannel.classList.add('active')
    })
})
function removeActiveClasses(){
    pannel.forEach(pannel=>{
        pannel.classList.remove('active')
    })
}