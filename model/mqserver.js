var amqp = require('amqplib/callback_api');

exports.status = function(req,res) {
  const MQHOST = process.env.HOST || "localhost";
  const MQPORT = process.env.MQPORT || 5672;
  const MQUSER = process.env.MQUSER || "guest";
  const MQPASS = process.env.MQPASS || "guest";
  let uri = `amqp://${MQUSER}:${MQPASS}@${MQHOST}:${MQPORT}/`

  amqp.connect(uri, function(err, conn) {
    if(err) {
      res.json({status: `NOK: ${err.message}`});
    }
    res.json({status: "OK"});
  });
}
