const axios = require('axios');
const fs = require('fs');

class RTBHApi {
  constructor() {
    this.apiUrl = 'https://list.rtbh.com.tr/output.txt';
    this.jsonFilePath = 'node_modules/rtbh-ip-blocker/lib/ipList.json'; 
    this.ipList = [];
    this.updateInterval = 30 * 60 * 1000; 
  }

  async fetchAndSaveIPList() {
    try {
      const response = await axios.get(this.apiUrl);
      const rawData = response.data;

      const filteredData = rawData
        .split('\n')
        .filter(line => line.trim().match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(\/\d{1,2})?$/))
        .map(ip => ip.trim());

      this.ipList = filteredData;

      const jsonContent = JSON.stringify(this.ipList, null, 2);
      fs.writeFileSync(this.jsonFilePath, jsonContent);

      console.log('IP list successfully fetched and saved.');
    } catch (error) {
      console.error('Error fetching or saving IP list:', error.message);
    }
  }

  isIPInList(ip) {
    return this.ipList.includes(ip);
  }

  updateIPListPeriodically() {
    setInterval(() => this.fetchAndSaveIPList(), this.updateInterval);
  }

  async init() {
    await this.fetchAndSaveIPList();
    this.updateIPListPeriodically();
  }
}

module.exports = RTBHApi;