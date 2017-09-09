const fs = require('fs')

function ingest(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8',  (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const count = (requests, request) => {
    if (request.includes('timeout')) {
        requests['timeout']++
    } else {
        requests['success']++
    }
    return requests
}

const file = () => process.argv[2] ? process.argv[2] : 'results.txt'
const contents = ingest(file())
  .then(contents => contents.split('\n'))

const timestampRegex = /\d{2}:\d{2}:\d{2}/

contents
  // .then(lines => lines.filter(line => timestampRegex.test(line)))
  .then(lines => lines.filter(line => line.includes('icmp_seq')))
  .then(requests => requests.reduce(count, { timeout: 0, success: 0, total: requests.length }))
  .then(result => ({ failure: (result.timeout / result.total), success: (result.success / result.total) }))
  .then(console.log)
