const dotenv = require('dotenv').config()
const ftp = require('ftp')
const zillowFtp = new ftp()
const chalk = require('chalk')
const today = new Date()
const yesterdayUnformatted = new Date().setDate(today.getDate() - 1);
const yesterday = new Date(yesterdayUnformatted)

const fileNameFormatted = chalk.bold.green
const errorMsgFormatted = chalk.bold.red
const fileSizeFormatted = chalk.bold.magenta

  // 86400000 run this code every 24h 
// setInterval(connectToZillowFtp, 5000);

//express.js 

function connectToZillowFtp() {
    zillowFtp.on('ready', function () {
        zillowFtp.list(function (err, list) {
            if (err) console.log(err);
            let zillowSpreadsheets = list.filter(spreadsheet => { return spreadsheet.date.toDateString() === yesterday.toDateString() })
            if (zillowSpreadsheets.length < 2) { console.log(errorMsgFormatted('You\'re missing the most recent spreadsheet! Check Zillow FTP')) }
            else {
                console.log(
                    fileNameFormatted('your last two files: ', '\n','\n', 
                     zillowSpreadsheets[0].name, fileSizeFormatted('size:', Math.round((zillowSpreadsheets[0].size) / 1024), 'kb') ,'\n', '\n',
                     zillowSpreadsheets[1].name, fileSizeFormatted('size:', Math.round((zillowSpreadsheets[1].size) / 1024), 'kb')))
            }
            zillowFtp.end()
        });
    })
    zillowFtp.connect({
        host: process.env.FTP_HOST,
        port: 21,
        user: process.env.FTP_USER,
        password: process.env.FTP_PSWRD
    }
    )
}

connectToZillowFtp();

