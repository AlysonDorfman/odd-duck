'use strict';

// *** GLOBAL VARIABLES *** //
let votingRounds = 25;
let productArray = []; // to hold all the objects, may not need?

// *** DOM WINDOWS *** //
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');

// *** CONSTUCTOR FUNTION *** //
function Product(name, imageExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.votes = 0;
  this.views = 0
}


// *** HELPER FUNTIONS / UTILITES *** //


function randomIndexGenerator(){
  return Math.floor(Math.random() * productArray.length); 
}

function renderImgs(){
  //TODO: get 2 images on the page 
  //TODO: make sure they're random
  let imageOneIndex = randomIndexGenerator();
  let imageTwoIndex = randomIndexGenerator();
  let imageThreeIndex = randomIndexGenerator();
  //TODO: make sure they're unique
  while(imageOneIndex === imageTwoIndex || imageTwoIndex === imageThreeIndex || imageOneIndex === imageThreeIndex){
    imageTwoIndex = randomIndexGenerator();
    imageThreeIndex = randomIndexGenerator();
  }

  imgOne.src = productArray[imageOneIndex].image;
  imgOne.title = productArray[imageOneIndex].name;

  imgTwo.src = productArray[imageTwoIndex].image;
  imgTwo.title = productArray[imageTwoIndex].name;

  imgThree.src = productArray[imageThreeIndex].image;
  imgThree.title = productArray[imageThreeIndex].name;

  console.log(imgOne, imgTwo, imgThree);


  //TODO: increment views counter
  productArray[imageOneIndex].views++;
  productArray[imageTwoIndex].views++;
  productArray[imageThreeIndex].views++;

  console.log(productArray[imageOneIndex]);
  console.log(productArray[imageTwoIndex]);
  console.log(productArray[imageThreeIndex]);
}


// *** EVENT HANDLERS *** //
function handleImgClick(event){
  // DONE: Identify the image that was clicked
  console.log(event.target.title);
  let imageClicked = event.target.title;
  // console.dir(event.target);
  // console.log(imageClicked);

  // TODO: Increase the vote on that image
  for(let i = 0; i < productArray.length; i++){
    if(imageClicked === productArray[i].name){
      productArray[i].votes++;
      // TODO: decrement the voting round
      votingRounds--;
      // TODO: generate new images
      renderImgs();
    }
  }

  // TODO: once voting are done, we want to remove the ability to click
  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleImgClick);
  }

}


function handleShowResults(){
  if(votingRounds === 0){
    for(let i = 0; i < productArray.length; i++){
      let productListItem = document.createElement('li');

      productListItem.textContent = `${productArray[i].name} - Votes: ${productArray[i].votes} & Views: ${productArray[i].views}`;

      resultsList.appendChild(productListItem);
    }
    resultBtn.removeEventListener('click', handleShowResults);
  }
}

// *** EXECUTABLE CODE *** //

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogduck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petsweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product ('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let watercan = new Product('water-can');
let wineglass = new Product('wine-glass');


productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass);


renderImgs();
imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);