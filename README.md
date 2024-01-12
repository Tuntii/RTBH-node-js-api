# RTBH-IP-BLOCKER Usage Guide

Hello! This document introduces a simple Node.js library created to control IP addresses using the RTBH (Remotely Triggered Black Hole) API.

## Installation

Install the library using npm

1. Download the library:

    ```bash
    npm install rtbh-ip-blocker
    ```

2. Run the project:

    ```bash
    node index.js
    ```

## Library Usage

Example Code
```javascript
const RTBHApi = require('rtbh-ip-blocker');

const rtbhApi = new RTBHApi();

rtbhApi.init().then(() => {
  const sampleIP = '123.456.789.012';
  if (rtbhApi.isIPInList(sampleIP)) {
    console.log('This IP address is in the list, access denied.');
  } else {
    console.log('This IP address is not in the list, access granted.');
  }
});
