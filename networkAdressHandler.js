

var input = {
    'ip': '',
    'mask': ''
};
var output = {
    'network': '',
    'broadcast': ''
};


function run(){
    input.ip = document.getElementById('ip').value;
    input.mask = document.getElementById('mask').value;
    inputToBinary(input);
}

function inputToBinary(input){
    let tempIp = input.ip;
    let binaryIp = '';
    let tempMask = input.mask;
    let binaryMask = '';
    let tempArray = [];
 
    // FOR IP ADRESS
    for(let i = 0; i < tempIp.length; i++){
        let tempChar = tempIp[i];
        let tempString = '';
        while(tempChar !== '.'){
            tempString += tempChar;
        }
        tempArray.push(tempString);
    }
    for(let i = 0; i < tempArray.length; i++){
        let tempString = tempArray[i];
        tempArray[i] = tempString.toString(2);
        binaryIp += tempArray[i];
    }

    tempArray = [];
    // FOR MASK 
    for(let i = 0; i < tempMask.length; i++){
        let tempChar = tempMask[i];
        let tempString = '';
        while(tempChar !== '.'){
            tempString += tempChar;
        }
        tempArray.push(tempString);
    }
    for(let i = 0; i < tempArray.length; i++){
        let tempString = tempArray[i];
        tempArray[i] = tempString.toString(2);
        binaryMask += tempArray[i];
    }

    document.getElementById('ipOut').innerHTML = binaryIp;
    document.getElementById('maskOut').innerHTML = binaryMask;
}