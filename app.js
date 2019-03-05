const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const sortButton = document.getElementById("bubbleSort");
const resetButton = document.getElementById("reset");
const speedInput = document.getElementById("speed");
const quantityInput = document.getElementById("quantity");
const generateArray = document.getElementById("generateArray");
const sortInfo = document.getElementById("sortInfo");
const bars = document.getElementById("bars");
const dots = document.getElementById("dots");


sortableArray = [];
tempArray = [];

canvas.width = 600;
canvas.height = 400;
barWidth= 10;
counter = 0;
speed = speedInput.value;
arrayLen = 50;
isSorting = 0;
isColor = true;
isBar = true;
var interval;
var data;

//Get JSON data
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
        data = JSON.parse(xhttp.responseText);
    }
};
xhttp.open("GET", "data/sorting.JSON", true);
xhttp.send();

//All Event Listeners
sortButton.addEventListener("click", function(){
    this.classList.add("btn-blue");
    sortInfo.innerHTML = data.algorithms.bubbleSort.desc;
    reset();
    bubbleSort();
});

resetButton.addEventListener("click", function(){
    reset();
});

speedInput.addEventListener("change", function(){
    speed = speedInput.value;
});

generateArray.addEventListener("click", function(){
    reset();
    arrayLen = quantityInput.value;
    sortableArray = [];
    createArray();
});

bars.addEventListener("click", function(){
    isBar = true;
    this.classList.add("selected");
    dots.classList.remove("selected");
});

dots.addEventListener("click", function(){
    isBar = false;
    this.classList.add("selected");
    bars.classList.remove("selected");
});

//General fucntions
function createArray(){
    for(i = 0; i < arrayLen; i++){
        sortableArray.push(Math.floor(Math.random() * canvas.height + 1));
    }
    barWidth = ((canvas.width) / sortableArray.length);
    Draw();
}

function Draw(){
    ctx.closePath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(!isSorting){
        for(i = 0; i < sortableArray.length; i++){
            if(isColor){
                col = sortableArray[i] / canvas.height * 255;
                ctx.fillStyle = `hsl(${col}, 100%, 50%)`;
            }
            if(isBar){
                ctx.fillRect(i * ((canvas.width) / sortableArray.length), canvas.height - sortableArray[i], barWidth, sortableArray[i]);
            }else if (!isBar){
                ctx.beginPath();
                ctx.arc((i * ((canvas.width) / sortableArray.length)) + barWidth/2, canvas.height - sortableArray[i], barWidth/2, 0, 360);
                ctx.fill();
                ctx.closePath();
            }
        }
    }else if(isSorting){
        for(i = 0; i < sortedArray.length; i++){
            if(isColor){
                col = sortedArray[i] / canvas.height * 255;
                ctx.fillStyle = `hsl(${col}, 100%, 50%)`;
            }
            if(isBar){
                ctx.fillRect(i * ((canvas.width) / sortedArray.length), canvas.height - sortedArray[i], barWidth, sortedArray[i]);
            }else if (!isBar){
                ctx.beginPath();
                ctx.arc((i * ((canvas.width) / sortedArray.length)) + barWidth/2, canvas.height - sortedArray[i], barWidth/2, 0, 360);
                ctx.fill();
                ctx.closePath();
            }
            
        }
    }
    
}

function Animate(){
    Draw();
    window.requestAnimationFrame(Animate);
}

function reset(){
    clearInterval(interval);
    isSorting = 0;
    counter = 0;
}


// Sorting algorithms

function bubbleSort(){
    if(!isSorting){
        isSorting = 1;
        sortedArray = sortableArray.slice();
        swapped = false;
    
        interval = setInterval(function(){ 
            if(counter < sortedArray.length){
                //Sort here
                if(sortedArray[counter] > sortedArray[counter + 1]){
                    temp = sortedArray[counter + 1];
                    sortedArray[counter + 1] = sortedArray[counter];
                    sortedArray[counter] = temp;
                    swapped = true;
                }
                counter++;
            }
            if(counter >= sortedArray.length - 1){
                if(swapped){
                    counter = 0;
                    swapped = false;
                }else{
                    clearInterval();
                }
            }
        }, speed);
    }
}

createArray();
Draw();
Animate();