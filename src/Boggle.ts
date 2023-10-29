


const dice: string[] = [
    "RIFOBX",
    "IYDEVL",
    "ANEDVZ",
    "PAMBJO",
    "GUELNW",
    "EOTISL",
    "UTOKND",
    "HYAGBR",
    "EHLRST",
    "ACITOA",
    "SORLND",
    "CEMOTU",
    "AILSUY",
    "LRVERH",
    "WIDQUK",
    "NSEEHG",
];


export const generateBoggleBoard = (): string[][] => {

    
    const boggleBoard: string[][] = [];
    for (let row = 0; row < 4; row++) {
        const rowLetters: string[] = [];
        for (let col = 0; col < 4; col++) {
            // generate a random letter from the die
            const dieIndex = Math.floor(Math.random() * dice.length);
            const die = dice[dieIndex];
            const letterIndex = Math.floor(Math.random() * die.length);
            const letter = die[letterIndex];
            rowLetters.push(letter);
        }
        boggleBoard.push(rowLetters);
    }

    console.log(boggleBoard);
    return (boggleBoard);
}


