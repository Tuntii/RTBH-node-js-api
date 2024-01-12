const fs = require('fs');

function extractIPAddressesAndInfo(txtData) {
  // IP adreslerini düzenli ifade ile ayıkla
  const ipAddresses = txtData.match(/\d+\.\d+\.\d+\.\d+/g) || [];

  // Ek bilgileri al
  const additionalInfo = txtData.match(/## Created date: (.+?) ## There are a total of (\d+) IP addresses/);

  // Ek bilgiler varsa, içeriğini kullan
  const createdDate = additionalInfo ? additionalInfo[1] : null;
  const totalIPAddresses = additionalInfo ? parseInt(additionalInfo[2], 10) : null;

  return {
    createdDate: createdDate,
    totalIPAddresses: totalIPAddresses,
  };
}

function convertTxtToJson(txtFilePath, jsonFilePath) {
  try {
    // .txt dosyasını oku
    const txtData = fs.readFileSync(txtFilePath, 'utf-8');
    const lines = txtData.split('\n').filter(Boolean);

    // IP adreslerini ve ek bilgileri al
    const data = extractIPAddressesAndInfo(txtData);

    // JSON dosyasına yaz
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(jsonFilePath, jsonData);

    console.log('Conversion successful.');
  } catch (error) {
    console.error('Error converting to JSON:', error.message);
  }
}


// Kullanım
const txtFilePath = 'output.txt';
const jsonFilePath = 'output.json';
convertTxtToJson(txtFilePath, jsonFilePath);
