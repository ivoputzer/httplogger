const {createServer} = require('http')

const morgan = require('morgan')
const logger = morgan('dev')

const port = process.argv[2] || 8088

createServer(requestListener)
  .listen(port, noop => console.log('-- http server listening on http://127.0.0.1:%s', port))

function requestListener(req, res){
  let done = finalHandlerFrom(req, res)
  logger(req, res, err => done(err))
}

function finalHandlerFrom(req, res){
  return (err, body = []) => {
    req
      .on('data', chunk => body.push(chunk))
      .on('end', noop => console.log('>>>', Buffer.concat(body).toString()), res.end())
  }
}
