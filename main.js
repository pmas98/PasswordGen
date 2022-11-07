const result = document.getElementById("result");
const lengthResult = document.getElementById("length");
const UpperCase = document.getElementById("uppercase");
const LowerCase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbol = document.getElementById("symbols");
const generate = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");

lengthResult.addEventListener('input',() => {
    document.getElementById("value").innerText = lengthResult.value;
})

generate.addEventListener('click', () => {
    const length = +lengthResult.value;
    const hasLower = LowerCase.checked;
    const hasUpper = UpperCase.checked;
    const hasNumber = numbers.checked;
    const hasSymbol = symbol.checked;

    result.innerText = generatePassword(
        length,
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol
    )
})

clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = result.innerText;

    if(!password){
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
})

function generatePassword(length, lower,upper,number,symbol){
    let generatePassword = '';

    const typesCount = lower + upper + number + symbol;

    const typesArr = [{lower},{upper},{number},{symbol}].filter(
        item => Object.values(item)[0]
    );

    console.log(typesArr)

    if(typesCount === 0){
        return '';
    }

    for(let i=0; i<length;i += typesCount){
        typesArr.forEach(type=>{
            const funcName = Object.keys(type)[0];

            generatePassword += randomFunc[funcName]();
        })
    }
    generatePassword = generatePassword.slice(0,length)
    return generatePassword
}

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()*10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';

    return symbols[Math.floor(Math.random()*symbols.length)]
}

