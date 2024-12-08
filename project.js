const prompt=require("prompt-sync")();

const ROWS=3;
const COLS=3;

const SYMBOLS_COUNT={
    "A":2,
    "B":4,
    "C":6,
    "D":8
}

const SYMBOLS_VALUE={
    "A":5,
    "B":4,
    "C":3,
    "D":2
}

const deposit=() =>{
    while(true){
        const depositamount=prompt("Enter deposit amount: ");
        const numberdeposit=parseFloat(depositamount);
        if(numberdeposit<=0 || isNaN(numberdeposit)){
            console.log("Invalid deposit amount. Please try again");
        }else{
            return numberdeposit;
        }
    }
};

const getnumberoflines=() =>{
    while(true){
        const numberoflines=prompt("Enter number of lines you want to bet on(1-3): ");
        const getlines=parseFloat(numberoflines);
        if(isNaN(getlines) || getlines <=0 || getlines>3){
            console.log("Invalid number of lines. Please try again");
        }else{
            return getlines;
        }
    }
};

const getbet=(balance, getlines) =>{
    while(true){
        const betamount=prompt("Enter amount you want to bet on each line: ");
        const numberbet=parseFloat(betamount);
        if(numberbet <= 0 || isNaN(numberbet) || numberbet > balance / getlines){
           console.log("Invalid bet amount. Please try again");
        }else{
            return numberbet;
        }
    }
};

const spin=()=>{
    const symbols=[];
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }

    const reels=[];
    for(let i=0;i<COLS;i++){
        reels.push([]);
        const reelsymbol=[...symbols];
        for(let j=0;j<ROWS;j++){
            const randomIndex=Math.floor(Math.random() * reelsymbol.length);
            const selectedsymbol=reelsymbol[randomIndex];
            reels[i].push(selectedsymbol);
            reelsymbol.splice(randomIndex,1);
        }
    }
    return reels;
};

const transpose=(reels)=>{
    const rows=[];
    for(let i=0;i<ROWS ;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows=(rows)=>{
    for(const row of rows){
        rowstring="";
        for( const [i,symbol] of row.entries()){
            rowstring+=symbol;
            if(i != row.length -1){
                rowstring+=" | ";
            }
        }
        console.log(rowstring);
    }
};

const getwinnings=(rows,numberbet,getlines)=>{
    let winnings=0;
    for(let row=0;row<getlines;row++){
        const symbols=rows[row];
        let allSame=true;
        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allSame=false;
                break;
            }
        }
        if(allSame){
            winnings += numberbet * SYMBOLS_VALUE[symbols[0]];
        }
    }
    
    return winnings;
};

const game =()=>{
    let balance=deposit();
    while(true){
        console.log("Your balance amount is: " + balance)
        const lines=getnumberoflines();
        const bet=getbet(balance,lines);
        balance -= bet * lines;
        const reels=spin();
        const rows=transpose(reels);
        printRows(rows);
        const winnings=getwinnings(rows,bet,lines);
        console.log("You won: "+ winnings.toString());
        balance += winnings;

        if(balance <= 0){
            console.log("Not enough balance");
            break;
        }
        
        const playagain=prompt("do you want to play again? [y/n] ");
        if(playagain != "y"){
            break;
        }
    }
};

game();
