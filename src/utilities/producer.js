var q = 'M1049117/Orders';
 
// AMQP PORT 5672

// amqp://user:pass@host.com/vhost
// amqp://localhost

// amqp://mindtree:mindtree@mt.nodesense.ai


var open = require('amqplib').connect('amqp://test:test@mt.nodesense.ai');
 
// Publisher

var message="";
 module.exports = function sendOrderDetails(payload) {
 
   open.then(function(conn) {
    return conn.createChannel();
  }).then(function(ch) {
    return ch.assertQueue(q).then(function(ok) {


        console.log('Sending to message queue')
          ch.sendToQueue(q, Buffer.from(payload));
    
  
      return ch.sendToQueue(q,Buffer.from(payload));
  
    });
  }).catch(console.warn);
 } 