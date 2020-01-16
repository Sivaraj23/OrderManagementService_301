var q = "M1049117/Orders";

// AMQP PORT 5672

// amqp://user:pass@host.com/vhost
// amqp://localhost

// amqp://mindtree:mindtree@mt.nodesense.ai

var open = require("amqplib").connect("amqp://test:test@mt.nodesense.ai");

// Publisher

var message = "";
module.exports = async function sendOrderDetails(payload) {
  open
    .then(async function(conn) {
      return await conn.createChannel();
    })
    .then(async function(ch) {
      return await ch.assertQueue(q).then(async function(ok) {
        console.log("Sending to message queue");
        await ch.sendToQueue(q, Buffer.from(payload));

        return await ch.sendToQueue(q, Buffer.from(payload));
      });
    })
    .catch(console.warn);
};
