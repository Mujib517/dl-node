const path = require('path');
const fs = require('fs');
const trueLog = require('true-log');

const ws = fs.createWriteStream(path.join("logs", "request-log.log"), { flags: 'a' });

module.exports = trueLog({ level: 'full', stream: ws });


