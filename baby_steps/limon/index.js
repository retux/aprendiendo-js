/**************************************************************************************/
/*** limon: linux monitor                                                           ***/
/***        Don't expect any multi-os app so far. Retux's needs to improve his      ***/
/***        js skills.                                                              ***/
/**************************************************************************************/

const fs = require('fs')
const http = require('http')
const colors = require('colors')
const sleep = require('sleep')


function printUsage() {
    console.log(colors.bold.red("Usage: "))
    console.log("    node index.js -i|--interface <interface>.")
    console.log("    ex: node index.js -i eth0")
}


function validateAndParseInput(theArgs) {
    let found = -1
    const availableOptions = ['-i', '--interface']
    for (let i=0; i<theArgs.length; i++) {
        if (availableOptions.includes(theArgs[i])) {
            found = i
        }
    }
    if (found < 0 || theArgs.length !==2) {
        printUsage()
        process.exit(128)
    }
    return found
}


function readIfStats(netIf) {
    const netStat = {}
    netStat.rxBytes = Number(fs.readFileSync(`/sys/class/net/${netIf}/statistics/rx_bytes`, 'UTF-8'))
    netStat.txBytes = Number(fs.readFileSync(`/sys/class/net/${netIf}/statistics/tx_bytes`, 'UTF-8'))
    return netStat
}


function calculateRateAsync (netIf, callback) {
    // Calculate troughput (kbps) in a given time frame
    // TODO add error handling
    const results = {}
    const stat1 = readIfStats(netIf)
    setTimeout(function(){
        const stat2 = readIfStats(netIf)
        results.txRateBps = (stat2.rxBytes - stat1.rxBytes) * 8
        results.rxRateBps = (stat2.txBytes - stat1.txBytes) * 8
        callback (null, results)
    }, 5000)
}


function main() {
    theArgs = process.argv.slice(2)
    const netIf = theArgs[validateAndParseInput(theArgs)+1] 

    http.createServer(function (req, res) {
        const rate = calculateRateAsync(netIf, function(err, results) {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(results))
            return res.end()
        })
    }).listen(8080)
    
    // calculateRateAsync(netIf, function(err, results) {
    //     console.log(results)
    // }) 
    
}


main()


