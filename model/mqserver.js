var amqp = require('amqplib/callback_api');

function get_uri() {
  const MQHOST = process.env.HOST || "localhost";
  const MQPORT = process.env.MQPORT || 5672;
  const MQUSER = process.env.MQUSER || "guest";
  const MQPASS = process.env.MQPASS || "guest";
  return `amqp://${MQUSER}:${MQPASS}@${MQHOST}:${MQPORT}/`
}

exports.status = function(req,res) {
  var uri = get_uri();
  amqp.connect(uri, function(err, conn) {
    if (err) {
      res.json({status: `NOK: ${err.message}`});
    }
    res.json({status: "OK"});
  });
}

exports.echo = function(req,res) {
  var queue = req.params.queue;
  var message = req.params.message;
  var uri = get_uri();
  amqp.connect(uri, function(err, conn) {
    if(err) {
      res.json({status: `Connection refused: ${err.message}`});
      return;
    }
    conn.createChannel(function(err, ch) {
      if (err){
        res.json({status: `Error connecting to server: ${err.message}`})
        return
      }
      ch.assertQueue(queue);
      ch.sendToQueue(queue, Buffer.from(message));

      ch.consume(queue, function(msg) {
        if (msg !== null) {
          ch.ack(msg);
          ch.close();
          res.json({echo_reply: msg.content.toString()});
        }
      });
    });
  });
}
