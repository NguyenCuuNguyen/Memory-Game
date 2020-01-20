var cardsArray = [
  {'name': 'CSS', 'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true', }, /*name: value, name: value => 2 properties*/
  {    'name': 'HTML',    'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',  },
  {    'name': 'jQuery',    'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',  },
  {    'name': 'JS',    'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',  },
  {    'name': 'Node',    'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',  },
  {    'name': 'Photo Shop',    'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',  },
  {    'name': 'PHP',    'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',  },
  {    'name': 'Python',    'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',  },
  {    'name': 'Ruby',    'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',  },
  {    'name': 'Sass',    'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',  },
  {    'name': 'Sublime',    'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',  },
  {    'name': 'Wordpress',    'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',  },
];
//Duplicate cardsArray to create a match for each card
var gameGrid = cardsArray.concat(cardsArray);

gameGrid.sort(function(){ //pass func to customize sort which sorts array in place & return the array
  return 0.5-Math.random(); //50% negative, 50% positive --> shuffle the cards
});
//Grab the div with an id of game-board and assing to a var game
var game = document.getElementById('game-board');
//Create a section element and assign it to variable grid
var grid = document.createElement('section');
//Give section element a class of grid
grid.setAttribute('class', 'grid');
//Append the grid section to the game-board div => section element with id of grid
game.appendChild(grid);

//get images displayed in the front end <-- loop through each item in the cardsArray
for(var i = 0; i<gameGrid.length; i++){
  //create a div element and assign it to the variable card
  var card = document.createElement('div');
  //apply a card class (CSS) to that div
  card.classList.add('card');
  //set the data-name attribute of the div to the cardsArray name --> help identify matched cards later
  card.dataset.name = gameGrid[i].name; //accessing the content of 'name' in the first property

  var front = document.createElement('div');
  //add a class of front to this var representing div
  front.classList.add('front');
  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${gameGrid[i].img})`;
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
}
  var firstGuess = '';
  var secondGuess = '';
  var count = 0; //everytime a card is clicke, count++
  var previousTarget = null;
  var delay = 1200; //1.2 seconds


  var match = function(){
    var selected = document.querySelectorAll('.selected'); //selected = a NodeList obj, a CSS selector, an array object of all elements with selected class
    for(var i = 0; i<selected.length; i++){
      selected[i].classList.add('match');
    }
  };

  //reset guesses after two attempts
  var resetGuesses = function(){
    firstGuess ='';
    secondGuess = '';
    count = 0;
    previousTarget = null;
    var selected = document.querySelectorAll('.selected'); //node obj with 2 element that has selected class
    for(var i = 0; i<selected.length; i++){
      selected[i].classList.remove('selected');
    }
  };

  grid.addEventListener('click', function(event){
    //declare var to target clicked item
    var clicked = event.target;
    //Don't allow the grid section itself to be selected, only select divs inside the grid
    if(clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')){
      return;
    }
    //add selected class if count <2;
    if (count < 2){
      count++;
      if(count === 1){
        firstGuess = clicked.parentNode.dataset.name;//event.target looking at the dataset.name
        clicked.parentNode.classList.add('selected');//click on the inner div front/back but data is on the outer div
      }else{
        secondGuess= clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      }
      //add selected class assigned to clicked-on target
      //if both guesses are not empty
      if(firstGuess !== '' && secondGuess !== ''){
        //if match
        if(firstGuess === secondGuess){
          setTimeout(match, delay);
          setTimeout(resetGuesses, delay);
        }else{
          setTimeout(resetGuesses, delay);
        }
      }
      previousTarget = clicked; //can't choose 1 card twice
    }
  });
