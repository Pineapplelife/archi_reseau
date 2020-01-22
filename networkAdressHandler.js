

var input = {
    'ip': '',
    'mask': ''
};
var output = {
    'network': '',
    'broadcast': ''
};


function run() {
    input.ip = document.getElementById('ip').value;
    input.mask = document.getElementById('mask').value;
    inputToBinary(input.ip, input.mask);
}

function inputToBinary(ip, mask) {
    let tempIp = ip;
    let binaryIp = '';
    let tempMask = mask;
    let binaryMask = '';
    let tempArray = [];
    let tempString = '';

    // FOR IP ADRESS
    for (let i = 0; i < tempIp.length; i++) {
        let tempChar = tempIp[i];
        tempString += tempChar;
        if(tempChar === '.'){
            tempArray.push(tempString);
            tempString = '';
        }
    }
    tempArray.push(tempString);
    tempString = '';
    for (let i = 0; i < tempArray.length; i++) {
        let tempString2 = parseInt(tempArray[i]).toString(2);
        while(tempString2.length < 8){
            tempString2 = '0' + tempString2;
        }
        tempArray[i] = tempString2;
        binaryIp += tempArray[i];
    }

    tempArray = [];
    // FOR MASK 
    for (let i = 0; i < tempMask.length; i++) {
        let tempChar = tempMask[i];
            tempString += tempChar;
        if(tempChar === '.') {
            tempArray.push(tempString);
            tempString = '';
        }
    }
    tempArray.push(tempString);
    for (let i = 0; i < tempArray.length; i++) {
        let tempString2 = parseInt(tempArray[i]).toString(2);
        while(tempString2.length < 8){
            tempString2 = '0' + tempString2;
        }
        tempArray[i] = tempString2;
        binaryMask += tempArray[i];
    }

    binaryWithMask(binaryIp, binaryMask);
}

function binaryWithMask(ip, mask){
    let binIp = ip;
    let binMask = mask;
    let counter = 0;
    let netIdBin = '';
    let hostIdBin = '';
    for(let i = 0; i < binMask.length; i++){
        let tempChar = binMask[i];
        if(tempChar === '1'){
            counter++;
        }
        else {
            break;
        }
    }
    for(let i = 0; i < binIp.length; i++){
        let tempChar = binIp[i];
        if(i < counter){
            netIdBin += tempChar;
        }
        else {
            hostIdBin += tempChar;
        }
    }

    binaryMask(netIdBin, hostIdBin)
}

function binaryMask(net, host){
    let netIdTemp = net;
    let hostIdTemp = host;
    let networkTemp = '';
    let broadcastTemp = '';
    let network = '';
    let broadcast = '';
    for(let i = 0; i < hostIdTemp.length; i++){
        networkTemp += '0';
        broadcastTemp += '1';
    }
    network = netIdTemp + networkTemp;
    broadcast = netIdTemp + broadcastTemp;

    binaryToIp(network, broadcast)
}

function binaryToIp(network, broadcast){
    let networkOut = '';
    let broadcastOut = '';
    let tempArray = [];
    let tempArray2 = [];
    let counter = 0;
    let tempString = '';
    let tempString2 = '';
    for(let i = 0; i < network.length; i++){
        let tempChar = network[i];
        let tempChar2 = broadcast[i];
        if(counter == 8){
            tempArray.push(tempString).toString();
            tempArray2.push(tempString2).toString();
            tempString = '';
            tempString2 = '';
            counter = 0;
        }
        else {
            counter++;
            tempString += tempChar;
            tempString2 += tempChar2;
        }
    }
    console.log(tempArray)
    console.log(tempArray2)
    
    for(let i = 0; i < 4; i++){
        let tempBin = tempArray[i];
        let tempBin2 = tempArray2[i];
        if(networkOut.length < 1){
            networkOut = parseInt(tempBin, 2);
        }
        else {
            networkOut += '.' + parseInt(tempBin, 2);
        }

        if(broadcastOut.length < 1){
            broadcastOut = parseInt(tempBin2, 2);
        }
        else {
            broadcastOut += '.' + parseInt(tempBin2, 2);
        }
    }

    document.getElementById('network').innerHTML = networkOut;
    document.getElementById('broadcast').innerHTML = broadcastOut; 

}