

var input = {
    'ip': '',
    'mask': ''
};

function run() {
    input.ip = document.getElementById('ip').value;
    input.mask = document.getElementById('mask').value;
    inputToBinary(input.ip);
}

function inputToBinary(ip) {
    let tempIp = ip;
    let binaryIp = '';
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
    for (let i = 0; i < tempArray.length; i++) {
        let tempString2 = parseInt(tempArray[i]).toString(2);
        while(tempString2.length < 8){
            tempString2 = '0' + tempString2;
        }
        tempArray[i] = tempString2;
        binaryIp += tempArray[i];
    }

    binaryWithMask(binaryIp, input.mask);
}

function binaryWithMask(ip, mask){
    let binIp = ip;
    let netIdBin = '';
    let hostIdBin = '';
    let networkTemp = '';
    let broadcastTemp = '';
    for(let i = 0; i < binIp.length; i++){
        let tempChar = binIp[i];
        if(i < mask){
            netIdBin += tempChar;
        }
        else {
            hostIdBin += tempChar;
        }
    }
    for(let i = 0; i < hostIdBin.length; i++){
        networkTemp += '0';
        broadcastTemp += '1';
    }
    networkTemp = netIdBin + networkTemp;
    broadcastTemp = netIdBin + broadcastTemp;

    binaryToIp(networkTemp, broadcastTemp)
}


function binaryToIp(net, broad){
    let network = '';
    let broadcast = '';
    let tempString;
    let tempString2;
    let tempArray = [];
    let tempArray2 = [];
    for(let i = 0; i < 32; i += 8){
        tempString = '';
        tempString2 = '';
        tempString = net.slice(i, i + 8);
        tempString2 = broad.slice(i, i + 8);
        tempArray.push(tempString);
        tempArray2.push(tempString2);
    }
    tempArray.forEach(element => {
        if(network.length < 1){
            network += parseInt(element, 2);
        }
        else {
            network += '.' + parseInt(element, 2);
        }
    });
    tempArray2.forEach(element => {
        if(broadcast.length < 1){
            broadcast += parseInt(element, 2);
        }
        else {
            broadcast += '.' + parseInt(element, 2);
        }
    });

    document.getElementById('network').innerHTML = network;
    document.getElementById('broadcast').innerHTML = broadcast; 

}