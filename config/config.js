require('dotenv').config()

exports.get_uri = function() {
  var MQHOST = process.env.MQHOST;
  var MQPORT = process.env.MQPORT;
  var MQUSER = process.env.MQUSER;
  var MQPASS = process.env.MQPASS;
  return `amqp://${MQUSER}:${MQPASS}@${MQHOST}:${MQPORT}/`
}


