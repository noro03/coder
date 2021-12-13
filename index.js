function encrypt(){
    const myCipher = cipher(document.getElementById('pass').value);
    const text =  myCipher(document.getElementById('text').value);
    document.getElementById('encrypt-text').value = text;
    console.log(text);
}

function decrypt(){
    const myDecipher = decipher(document.getElementById('pass').value);
    const text =  myDecipher(document.getElementById('text').value);
    document.getElementById('encrypt-text').value = text;
}

const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text => text.split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
}
    
const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join('');
}