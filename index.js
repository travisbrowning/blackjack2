let cards = [];
let dealerCards = [];
let isAlive = false;
let hasBlackjack = false;
let sum = 0;
let dealerSum = 0;
let message = "";
let dealerSays = document.getElementById("dealersays");
let dealerHand = document.getElementById("dealerhand");
let yourHand = document.getElementById("yourhand");
let yourSum = document.getElementById("sum");

function bet() {
    if (sum > dealerSum && sum < 22 && dealerSum < 22 && isAlive === true && hasBlackjack === false) {
        dealerSays.textContent = `"Dag nabbit you win! My hand was ${dealerSum}"`
        isAlive = false;
        document.getElementById("bet").style.visibility = "hidden";
        document.getElementById("hit").style.visibility = "hidden";

    } else if (sum < dealerSum && dealerSum < 22 && isAlive === true && hasBlackjack === false) {
        isAlive = false;
        dealerSays.textContent = `Sorry Pardner my ${dealerSum} beats your ${sum}`;
        document.getElementById("bet").style.visibility = "hidden";
        document.getElementById("hit").style.visibility = "hidden";

    } else if (dealerSum === sum && isAlive === true && hasBlackjack === false) {
        isAlive = false;
        dealerSays.textContent = `"Dealer wins all ties, Padner. Better luck next time. Looks like we both got us a ${sum}"`;
        document.getElementById("bet").style.visibility = "hidden";
        document.getElementById("hit").style.visibility = "hidden";

    } else if (dealerSum > 21 && isAlive === true) {
        isAlive = false;
        dealerSays.textContent = `Well I reckin' I busted with a ${dealerSum}!`;
        document.getElementById("bet").style.visibility = "hidden";
        document.getElementById("hit").style.visibility = "hidden";

    }
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13 + 1)
    if (randomNumber === 1 && sum <= 10) {
        return 11;
    } else if (randomNumber === 1 && sum > 10) {
        return 1;
    } else if (randomNumber > 10) {
        return 10;
    } else {
        return randomNumber;
    }
}

function getDealerCard() {
    let randomNumber = Math.floor(Math.random() * 13 + 1)
    if (randomNumber === 1 && dealerSum <= 10) {
        return 11;
    } else if (randomNumber === 1 && dealerSum > 10) {
        return 1;
    } else if (randomNumber > 10) {
        return 10;
    } else {
        return randomNumber;
    }
}

function startGame() {
    isAlive = true;
    hasBlackjack = false;
    let card1 = getRandomCard();
    let card2 = getRandomCard();
    let dealerCard1 = getDealerCard();
    let dealerCard2 = getDealerCard();
    cards = [card1, card2];
    dealerCards = [dealerCard1, dealerCard2];
    sum = card1 + card2;
    dealerSum = dealerCard1 + dealerCard2;
    document.getElementById("bet").style.visibility = "visible";
    document.getElementById("hit").style.visibility = "visible";
    renderGame();
}

function renderGame() {
    dealerHand.textContent = `Dealers Hand: ${dealerCards[0]}, *`;
    yourHand.textContent = "Your Hand: ";

    for (let i = 0; i < cards.length; i++) {
        yourHand.textContent += `${cards[i]} `;
    }

    yourSum.textContent = `Your Sum: ${sum}`;

    if (sum <= 20) {
        message = `"Wanna'nuther card, Pardner?"`;
    } else if (sum === 21) {
        hasBlackjack = true;
        message = `"Gul' darnit you gotta Blackjack! You won, hoss!"`;
        document.getElementById("bet").style.visibility = "hidden";
        document.getElementById("hit").style.visibility = "hidden";
    } else {
        isAlive = false;
        message = `"You busted, Pardner. 'Nuther round?"`;
        document.getElementById("bet").style.visibility = "hidden";
        document.getElementById("hit").style.visibility = "hidden";
    }

    dealerSays.textContent = message;
}

function hit() {
    if (isAlive === true && hasBlackjack === false) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
    }

    if (isAlive === true && dealerSum < 16) {
        let dealerCard = getDealerCard();
        dealerSum += dealerCard;
        dealerCards.push(dealerCard);
    }

    if (isAlive === true) {
        renderGame()
    }
}