const dotenv = require('dotenv').config()
const ftp = require('ftp')
const zillowFtp = new ftp()

const today = new Date()
const yesterdayUnformatted = new Date().setDate(today.getDate() - 1);
const yesterday = new Date(yesterdayUnformatted)
// setInterval(connectToZillowFtp,86400000);  run this code every 24h 

function connectToZillowFtp() {
    zillowFtp.on('ready', function () {
        zillowFtp.list(function (err, list) {
            if (err) console.log(err);
            let zillow = list.filter(spreadsheet => { return spreadsheet.date.toDateString() === yesterday.toDateString() })
            console.log('at least one thing', zillow)
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