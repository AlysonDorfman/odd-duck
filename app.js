'use strict';

// *** GLOBAL VARIABLES *** //
let votingRounds = 5;
// let allProducts = []; // to hold all the objects, may not need?
let productPaths = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

// const imageExtension = 'jpg';


// *** DOM WINDOWS *** //
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');

// *** CONSTUCTOR FUNTION *** //
function Product(name, imagePath) {
  this.name = name;
  this.image = imagePath;
  this.votes = 0;
  this.views = 0;
}

Product.allProducts = [];

function initProducts() {
  for (let value of productPaths) {
    console.log(productPaths[value]);
    // let extension = value.endsWith('png') ? 'png' : 'jpg';
    // console.log(extension);
    let extension = value === 'sweep' ? 'png' : 'jpg';
    const productInstance = new Product(value, `img/${value}.${extension}`);
    console.log(productInstance);
    Product.allProducts.push(productInstance);
  }
}

// for (let thisProductName of productNames) {
//   const extension = thisProductName.endsWith('.png') ? 'png' : 'jpg';
//   const productInstance = new Product(thisProductName, `img/product.${extension}`);
//   productsArray.push(productInstance);
// }
initProducts();




// *** HELPER FUNTIONS / UTILITES *** //


function randomIndexGenerator() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

function renderImgs() {
  //TODO: get 2 images on the page 
  //TODO: make sure they're random
  let imageOneIndex = randomIndexGenerator();
  let imageTwoIndex = randomIndexGenerator();
  let imageThreeIndex = randomIndexGenerator();
  //TODO: make sure they're unique
  while (imageOneIndex === imageTwoIndex || imageTwoIndex === imageThreeIndex || imageOneIndex === imageThreeIndex) {
    imageTwoIndex = randomIndexGenerator();
    imageThreeIndex = randomIndexGenerator();
  }

  imgOne.src = Product.allProducts[imageOneIndex].image;
  imgOne.title = Product.allProducts[imageOneIndex].name;

  imgTwo.src = Product.allProducts[imageTwoIndex].image;
  imgTwo.title = Product.allProducts[imageTwoIndex].name;

  imgThree.src = Product.allProducts[imageThreeIndex].image;
  imgThree.title = Product.allProducts[imageThreeIndex].name;

  console.log(imgOne, imgTwo, imgThree);


  //TODO: increment views counter
  Product.allProducts[imageOneIndex].views++;
  Product.allProducts[imageTwoIndex].views++;
  Product.allProducts[imageThreeIndex].views++;

  console.log(Product.allProducts[imageOneIndex]);
  console.log(Product.allProducts[imageTwoIndex]);
  console.log(Product.allProducts[imageThreeIndex]);
}


// *** EVENT HANDLERS *** //
function handleImgClick(event) {
  // DONE: Identify the image that was clicked
  console.log(event.target.title);
  let imageClicked = event.target.title;
  // TODO: Increase the vote on that image
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (imageClicked === Product.allProducts[i].name) {
      Product.allProducts[i].votes++;
      // TODO: decrement the voting round
      votingRounds--;
      // TODO: generate new images
      renderImgs();
    }
  }
  // TODO: once voting are done, we want to remove the ability to click
  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);
  }
}

function handleShowResults() {
  if (votingRounds === 0) {
    for (let i = 0; i < Product.allProducts.length; i++) {
      let productListItem = document.createElement('li');

      productListItem.textContent = `${Product.allProducts[i].name} - Votes: ${Product.allProducts[i].votes} & Views: ${Product.allProducts[i].views}`;

      resultsList.appendChild(productListItem);
    }
    resultBtn.removeEventListener('click', handleShowResults);
    renderChart();
  }
}

function renderChart() {

  let productNames = [];
  let productLikes = [];
  let productViews = [];

  for (let i = 0; i < Product.allProducts.length; i++) {
    productNames.push(Product.allProducts[i].name);
    productLikes.push(Product.allProducts[i].votes);
    productViews.push(Product.allProducts[i].views);
  }
  /* refer to Chart.js > Chart Types > Bar Chart:
  https://www.chartjs.org/docs/latest/charts/bar.html
  and refer to Chart.js > Getting Started > Getting Started:
  https://www.chartjs.org/docs/latest/getting-started/ */
  const data = {
    labels: productNames,
    datasets: [{
      label: 'Likes',
      data: productLikes,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)'
      ],
      borderWidth: 1
    },
    {
      label: 'Views',
      data: productViews,
      backgroundColor: [
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgb(255, 159, 64)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  let canvasChart = document.getElementById('myChart');
  new Chart (canvasChart, config);
}

// *** EXECUTABLE CODE *** //


renderImgs();
imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);
