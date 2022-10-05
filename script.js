// PASSWORD GENERATOR // v0.1.0 // 10.05.2022 //


const msgs = [

    'New Password: ',
    'Do it yourself by following this pattern: '

]

const char = [

    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '0123456789',
    '!@#?$%&',
    '^*()_+~{}|-<>/[]',
    ['\x1b[101m LC \x1b[0m','\x1b[102m UC \x1b[0m','\x1b[103m NUM \x1b[0m','\x1b[104m SYM \x1b[0m',]

]

const random = num => Math.floor(Math.random()*num)

// Take a index in char based on user input then take a random index of the string.
const builder = (length,strength) => {

    let p = '';
    let diy = '';

    for(let i = 0; i < length; i++){
        
        let randomIndex = random(strength.length);

        // Build the color coding pattern for a DIY password
        if (randomIndex === 0){
            diy += char[5][0]; 
        } else if (randomIndex === 1) {
            diy += char[5][1];
        } else if (randomIndex === 2) {
            diy += char[5][2];
        } else {
            diy += char[5][3];
        }

        let c = char[randomIndex];
        p += c[random(c.length)];

    }

    return [p,diy];

}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask user for 1) Password Length 2) Password Strength 3) If they would like another 
const askFirstQuestion = ask => new Promise(resolve=>readline.question(ask,(res)=>resolve(res)));
const askSecondQuestion = ask => new Promise(resolve=>readline.question(ask,(res)=>resolve(res)));
const askThirdQuestion = ask => new Promise(resolve=>readline.question(ask,(res)=>resolve(res)));

const main = async () => {

    let length = 0;
    let strength = 0;
    let password = '';
    let stop = false;

    // Length and strength are required so keep looping until fulfilled. 
    while(true){
        length = await askFirstQuestion('How long would you like your password to be? ');
        if (parseInt(length) > 0){break;}
        console.log('\x1b[91m%s\x1b[39m','Please enter a number greater than zero.');
    }

    while(true){
        strength = await askSecondQuestion('Pick a strength: 1 through 5: ');
        if (parseInt(strength) > 0 && parseInt(strength) <= 5){break;}
        console.log('\x1b[91m%s\x1b[39m','Please enter a number between 1 and 5.');
    }

    // Strength determines from what set of strings builder can pick from. 
    switch(parseInt(strength)){
        case(1):
            password = builder(length,[0]);
            console.log(msgs[0]);
            console.log('\x1b[32m%s\x1b[39m', password[0]);
            console.log(msgs[1]);
            console.log(password[1]);
            break;
        case(2):
            password = builder(length,[0,1]);
            console.log(msgs[0]);
            console.log('\x1b[32m%s\x1b[39m', password[0]);
            console.log(msgs[1]);
            console.log(password[1]);
            break;
        case(3):
            password = builder(length,[0,1,2]);
            console.log(msgs[0]);
            console.log('\x1b[32m%s\x1b[39m', password[0]);
            console.log(msgs[1]);
            console.log(password[1]);
            break;
        case(4):
            password = builder(length,[0,1,2,3]);
            console.log(msgs[0]);
            console.log('\x1b[32m%s\x1b[39m', password[0]);
            console.log(msgs[1]);
            console.log(password[1]);
            break;
        case(5):
            password = builder(length,[0,1,2,3,4]);
            console.log(msgs[0]);
            console.log('\x1b[32m%s\x1b[39m', password[0]);
            console.log(msgs[1]);
            console.log(password[1]);
            break;
        default:
            break;
    }

    while(!stop){
        await askThirdQuestion('Generate another? (y/n):').then((res)=>{
            if (res.toLowerCase() === 'y'){
                main();  
            } else if (res.toLowerCase() === 'n'){
                stop = true;
            } else {
                console.log('\x1b[91m%s\x1b[39m','Please enter Y or N');
            }
        })

    }

    readline.close();

}

main();