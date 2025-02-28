var ImgBox = document.querySelector(".img-box");
var imgWrap = document.querySelector(".img-wrap");
var originalImg = document.getElementById("originalImg"); // Fixed selector
var line = document.getElementById("line");

originalImg.style.width = ImgBox.offsetWidth + "px"; // Ensure the original image fits

var leftSpace = ImgBox.getBoundingClientRect().left; // More reliable offset calculation

ImgBox.onmousemove = function(e) {
    var boxWidth = (e.clientX - leftSpace) + "px"; // Using clientX for better positioning
    imgWrap.style.width = boxWidth;
    line.style.left=boxWidth
};
