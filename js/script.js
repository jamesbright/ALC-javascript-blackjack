//
// Blackjack
// by Mark Zamoyta.
//modified by: @jamesononiwu


// Card variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
    values = ['Ace', 'King', 'Queen', 'Jack', 
    '10', '9', '8', '7', '6',
    '5', '4', '3', '2'];

    // map access to svg card files
let svg_cards=[
'ace_of_clubs','ace_of_diamonds','ace_of_hearts','ace_of_spades',
 '2_of_clubs','2_of_diamonds','2_of_hearts','2_of_spades',
'3_of_clubs','3_of_diamonds','3_of_hearts','3_of_spades',
'4_of_clubs','4_of_diamonds','4_of_hearts','4_of_spades',
'5_of_clubs','5_of_diamonds','5_of_hearts','5_of_spades',
'6_of_clubs','6_of_diamonds','6_of_hearts','6_of_spades',
'7_of_clubs','7_of_diamonds','7_of_hearts','7_of_spades',
'8_of_clubs','8_of_diamonds','8_of_hearts','8_of_spades',
'9_of_clubs','9_of_diamonds','9_of_hearts','9_of_spades',
'10_of_clubs','10_of_diamonds','10_of_hearts','10_of_spades',
'king_of_clubs','king_of_diamonds','king_of_hearts','king_of_spades',
'queen_of_clubs','queen_of_diamonds','queen_of_hearts','queen_of_spades',
'jack_of_clubs','jack_of_diamonds','jack_of_hearts','jack_of_spades'
];


// DOM variables
let textArea=document.getElementById('text-area'),
title=document.getElementById('title'),
winner=document.getElementById("winner"),
playerDiv=document.getElementById('player'),
dealerDiv=document.getElementById('dealer'),
 dealerScoreScreen = document.getElementById('dealer-score'),
    playerScoreScreen=document.getElementById('player-score'),
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button');
    

// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    selectedCardIndex=[];
    dealerIndex=[];
    playerIndex=[];
    dealerScore = 0,
    playerScore = 0,
    deck = [];


//create cards on screen
function createSvgs(){


    var forEach= Array.prototype.forEach;
    forEach.call(svg_cards,function(card){
   
    var svg=document.createElement('img');
    svg.className="svg-card";
    svg.src="cards/" + card + ".svg";
    svg.style.marginLeft='10px';
    document.getElementById('cards_box').appendChild(svg);
      
    });
  }

  //destroy the cards on screen
  function destroySvgs(){
    
    var forEach= Array.prototype.forEach;
    var cardBox=document.getElementById('cards_box');
    var svgs= document.querySelectorAll('#cards_box img.svg-card');
    var playerSvgs= document.querySelectorAll('#player img.svg-card');
    var dealerSvgs= document.querySelectorAll('#dealer img.svg-card');
    
    forEach.call(svgs,function(svg){
cardBox.removeChild(svg);
  });
  forEach.call(playerSvgs,function(svg){
    playerDiv.removeChild(svg);  
      });
      
  forEach.call(dealerSvgs,function(svg){
    dealerDiv.removeChild(svg);
      });
}

  createSvgs();


hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();
  
newGameButton.addEventListener('click', function() {
  winner.style.display="none";
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [ getNextCard(), getNextCard() ];
  playerCards = [ getNextCard(), getNextCard() ];
// get the Index of the Selected files
  
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  
  selectedCardIndex=[dealerCards,playerCards];
  dealerIndex=selectedCardIndex[0];
  playerIndex=selectedCardIndex[1];
  showStatus();
  updateUIWithCards(playerIndex,dealerIndex);

  
 // console.log(playerIndex[1].value + '_of_'+playerIndex[1].suit);

});

hitButton.addEventListener('click', function() {

  playerCards.push(getNextCard());

  //get the last card picked

  var newCard=playerCards[playerCards.length-1];
  checkForEndOfGame();
  showStatus();
  updateUIWithCard(newCard);
});

stayButton.addEventListener('click', function() {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});




//remove and update picked player card in ui
function updateUIWithCard(playercard){
  console.log("updateCardWithUi");
  var svgs=document.querySelectorAll('#cards_box img.svg-card');
  
var playerString=playercard.value + '_of_'+playercard.suit;
  playerString=playerString.toLowerCase();

  console.log('cardWithUiPString '+playerString);
  var index =getIndexOf(svg_cards,playerString);
  console.log('index '+index);
  var src=svg_cards[index];
  var svgCard=document.createElement('img');
    svgCard.className="svg-card card-right";
    svgCard.src="cards/" + src + ".svg"
  svgs[index].parentNode.removeChild(svgs[index]);
playerDiv.appendChild(svgCard);
 
}

// get index of a card
function getIndexOf(cardArray,search){
  var index;
for(var i =0; i<cardArray.length; i++){
if(cardArray[i] === search){
  index=i;
  break;
}
}
return index;
}

// check if the card is present 
function arrayContains(cardArray,card){
  return (cardArray.indexOf(card) > -1);
}
//remove and update picked cards in ui
function updateUIWithCards(playercards,dealercards){
  var svgs=document.querySelectorAll('#cards_box img.svg-card');
  
  console.log("updateCardsWithUi");

for(var i=0; i< playercards.length; i++){
  
  var playerString=playercards[i].value + '_of_'+playercards[i].suit;
  var dealerString =dealercards[i].value + '_of_'+dealercards[i].suit;
  playerString=playerString.toLowerCase();
  dealerString=dealerString.toLowerCase();
console.log('playerString'+i+' '+playerString);
console.log('dealerString'+i+ ' '+dealerString);
var playerIndex=getIndexOf(svg_cards,playerString);
var dealerIndex=getIndexOf(svg_cards,dealerString);
console.log('playerIndex '+playerIndex);
console.log('dealerIndex '+dealerIndex);

var pSrc=svg_cards[playerIndex];
var dSrc=svg_cards[dealerIndex];

var pSvgCard=document.createElement('img');
var dSvgCard=document.createElement('img');
  pSvgCard.className="svg-card";
  dSvgCard.className="svg-card";
  pSvgCard.src="cards/" + pSrc + ".svg";
  dSvgCard.src="cards/" + dSrc + ".svg";

  removeCard(svgs,playerIndex);
  removeCard(svgs,dealerIndex);
playerDiv.appendChild(pSvgCard);
dealerDiv.appendChild(dSvgCard);
}

}

// remove a card from deck
function removeCard(arrayOfCards, card){
  
arrayOfCards[card].parentNode.removeChild(arrayOfCards[card]);
}

// create a new deck of cards
function createDeck() {
    let deck = [];
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
            };
            deck.push( card );
            
        }
    }
    return deck;
}

//perform a shuffling action
function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
    let temp2 = svg_cards[swapIdx];
    svg_cards[swapIdx]=svg_cards[i];
    svg_cards[i]=temp2;
   title.innerText="Shuffling";
  
  }
  
  title.innerText="Shuffled";
  destroySvgs();
  createSvgs();
}

function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

function getNextCard() {
    var card= deck.shift();
    return card;
}


// get value of each card 
function getCardNumericValue(card) {
  switch(card.value) {
    case 'Ace':
      return 1;
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5': 
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
    default:
      return 10;
  }
}

//calculate the score
function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace') {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}



//checks if game is over
function checkForEndOfGame() {
  
  updateScores();
  
  if (gameOver) {
    var pNodes=playerDiv.querySelectorAll("img.svg-card");
var forEach=Array.prototype.forEach;
forEach.call(pNodes,function(pNode){

  pNode.classList.remove("card-right");
});
    // let dealer take cards
    while(dealerScore < playerScore 
          && playerScore <= 21 
          && dealerScore <= 21) {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }
  
  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver) {
    
    if (playerScore > dealerScore) {
      playerWon = true;
    }
    else {
      playerWon = false;
    }
  }
}


//update user with info 
function showStatus() {
  if (!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack!';
    return;
  }else{
    
    textArea.innerText = 'Game On!';
  }
  
  let dealerCardString = '';
  for (let i=0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }
  
  let playerCardString = '';
  for (let i=0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  updateScores();
  
  dealerScoreScreen.innerText = 
    'Dealer has:\n' +
    dealerCardString + 
    '(score: '+ dealerScore  + ')\n\n';
    
    playerScoreScreen.innerText='You have:\n' +
    playerCardString +
    '(score: '+ playerScore  + ')\n\n';
  
  if (gameOver) {
    if (playerWon) {
      
     winner.innerText="YOU WIN!";
     winner.style.display="block";
     winner.style.color="green";
     playerScoreScreen.innerText += "YOU WIN!";
    }
    else {
      
     winner.innerText="DEALER WINS!";
     winner.style.display="block";
     winner.style.color="red";
      dealerScoreScreen.innerText += "DEALER WINS!";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
   title.innerText="Blackjack";
  textArea.innerText = 'Game Over!';
  }
  

}
