/**************************************************************************************/
/*** limon: linux monitor                                                           ***/
/***        Don't expect any multi-os app so far. Retux's needs to improve his      ***/
/***        js skills.                                                              ***/
/**************************************************************************************/

const fs = require('fs')
const http = require('http')
const colors = require('colors')
const child = require('child_process');


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


function readIfStatsBsd(netIf) {
    const netStat = {}
    netStat.rxBytes = Number(child.execSync(`/usr/bin/netstat -i -b -n -I ${netIf} | tail -n 1 | awk '{print $8}'`).toString() )
    netStat.txBytes = Number(child.execSync(`/usr/bin/netstat -i -b -n -I ${netIf} | tail -n 1 | awk '{print $11}'`).toString() )
    return netStat  
}


function calculateRateAsync (netIf, callback) {
    // Calculate troughput (kbps) in a given time frame
    // TODO add error handling - OS detection
    const interval = 2000
    const results = {}
    let stat1, stat2
    process.platform.includes('bsd') ? stat1 = readIfStatsBsd(netIf) : stat1 = readIfStats(netIf)
    setTimeout(function(){
        process.platform.includes('bsd') ? stat2 = readIfStatsBsd(netIf) : stat2 = readIfStats(netIf)
        results.rxbps = Math.floor(((stat2.rxBytes - stat1.rxBytes) * 8) / (interval/1000))
        results.txbps = Math.floor(((stat2.txBytes - stat1.txBytes) * 8) / (interval/1000))
        callback (null, results)
    }, interval)
}


function main() {
    const PORT = 8080
    theArgs = process.argv.slice(2)
    const netIf = theArgs[validateAndParseInput(theArgs)+1] 
    console.log(colors.bold.green("[info]") + ` Server listening on port: ${PORT}`)
    http.createServer(function (req, res) {
        const rate = calculateRateAsync(netIf, function(err, results) {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(results))
            return res.end()
        })
    }).listen(PORT)
    
    // calculateRateAsync(netIf, function(err, results) {
    //     console.log(results)
    // }) 
}

main()
