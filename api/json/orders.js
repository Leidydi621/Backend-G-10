const { Order } = require('../src/db');
const orderMockUp = async () => {
  try {
    await Order.create({
      status: 'Recepción',
      purchased: true,
      userId: '69cacb3c-4ef3-4d72-bbf3-d6618e45a45d',
      productId: '4841011e-fbf5-4c92-a770-3b06684f5891',
      quantity: 2,
      total: 100,
      unitPrice: 5,
      invoiceId: '721fcff2-66fe-48c5-b4dc-7a37248945e5',
    });

    await Order.create({
      status: 'en camino',
      purchased: true,
      userId: '69cacb3c-4ef3-4d72-bbf3-d6618e45a45d',
      productId: '4841011e-fbf5-4c92-a770-3b06684f5892',
      quantity: 5,
      total: 5.6,
      unitPrice: 5,
      discount: 30,
      invoiceId: '721fcff2-66fe-48c5-b4dc-7a37248945e5',
    });

    await Order.create({
      status: 'Recibido',
      purchased: true,
      userId: '69cacb3c-4ef3-4d72-bbf3-d6618e45a45d',
      productId: '4841011e-fbf5-4c92-a770-3b06684f5893',
      quantity: 2,
      total: 50,
      unitPrice: 5,
      invoiceId: '721fcff2-66fe-48c5-b4dc-7a37248945e5',
    });



    await Order.create({
      status: 'Recibido',
      purchased: true,
      userId: '69cacb3c-4ef3-4d72-bbf3-d6618e45a45d',
      productId: '4841011e-fbf5-4c92-a770-3b06684f5893',
      quantity: 2,
      total: 50,
      unitPrice: 5,
      invoiceId: '721fcff2-66fe-48c5-b4dc-7a37248945e6',
    });


    await Order.create({
      status: 'Recibido',
      purchased: true,
      userId: '69cacb3c-4ef3-4d72-bbf3-d6618e45a45c',
      productId: '4841011e-fbf5-4c92-a770-3b06684f5893',
      quantity: 2,
      total: 50,
      unitPrice: 5,
      invoiceId: '721fcff2-66fe-48c5-b4dc-7a37248945e7',
    });

    await Order.create({
      status: 'Recibido',
      purchased: true,
      userId: '69cacb3c-4ef3-4d72-bbf3-d6618e45a45c',
      productId: 'f08879c1-0c73-4fa1-a5bd-fec99e10c063',
      quantity: 2,
      total: 50,
      unitPrice: 5,
      invoiceId: '721fcff2-66fe-48c5-b4dc-7a37248945e8',
    });

  } catch (err) {
    console.log(err.message);
  }
};
module.exports = orderMockUp;
