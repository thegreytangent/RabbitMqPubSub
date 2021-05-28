const amqp = require('amqplib/callback_api');

amqp.connect(`amqp://localhost`, (err, connection ) => {
    if (err) {
        throw err;
    }

    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }

        let queueName = "test";
        let message = "boomm";

        channel.assertQueue(queueName, {
            durable: false
        });

        console.log(`Message ${message}`);

        channel.sendToQueue(queueName, Buffer.from(message));

        setTimeout(()=> {
            connection.close();
        },1000);


    });
});