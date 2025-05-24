//Slot machine


const prompt = require("prompt-sync")();

const COLS =3;
const ROWS =3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

const SYMBOL_VALUES = {
    "A":5,
    "B":4,
    "C":3,
    "D":2
}
;
//Deposit some money
const deposit = ()=>{
    while(true) {
    const depositAmount = prompt("Enter your amount: ");
    const numberDepositAmount= parseFloat(depositAmount);

    if(isNaN(numberDepositAmount) ||numberDepositAmount<=0){
        console.log("Invalid desposit amount, try again.")
    }else{
        return numberDepositAmount;
    }
}
};


//Determine number of lines to bet on
const getNumberOfLines =()=>{
    while (true){
        const lines = prompt("Enter the number of lines between 1-3: ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) ||numberOfLines<=0 ||numberOfLines>3){
            console.log("Please select valid number of lines.")
        }else{
            return numberOfLines;
        }
    }
}
//collect a bet amount
const getBet =(balance, lines)=>{
    while(true){
        const bet = prompt("Please enter your bet per line: ");
        const betInNumber = parseFloat(bet);

        if(isNaN(betInNumber)||betInNumber<=0||betInNumber>balance/lines){
            console.log("Please enter a valid number: ")
        }else{
            return betInNumber;
        }
    }
}


//spin the slot machine
const spin =()=>{
    const symbols = [];
    for([symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0; i<count; i++){
            symbols.push(symbol);
        }
        
    }
    const reels = [[],[],[]];
    for(let i=0; i<COLS; i++){
        const reelSymbols = [...symbols];
        for(let j=0; j<ROWS;j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
}



const transpose = (reels)=> {
    const rows=[];
    for(let i=0; i < ROWS;i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows
}

//check if the uer won
const printRows=(rows)=>{
    for(const row of rows){
        let rowString = "";
        for (const [i, symbol]of rows.entries()){
            rowString +=symbol;
            if (i !=rows.length-1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}
//give the user their winnings
const getWinnings = (row, bet, lines)=>{
    let winnings = 0;

    for (let row=0; row<lines; row++){
        const symbols=rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allSame = false;
                break;
            }
        }
        if (allSame){
            winnings += bet*SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
}


const game = ()=>{
    let balance = deposit();
    while(true){
        console.log("You have a balance of $ "+balance)
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        console.log("You won, $" + winnings.toString());
    
        if(balance<=0){
            console.log("Not enough balance!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)?");  //play again

        if (playAgain !="y") break;
    }
}

game();

