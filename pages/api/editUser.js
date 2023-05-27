import clientPromise from "../../lib/mongodb";

import Stripe from 'stripe';

import { buffer } from "micro";

export const config = {
    api: {
      bodyParser: false,
    },
  };

export default async function handler(req, res) {
    if (!req.method === 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
        return;
    }
    

    const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);

    const endpointSecret = process.env.ENDPOINT_SECRET;

    let event;

    let email = null, subscription = null;

    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    try {
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
        email = event.data.object.metadata.email;
        subscription = parseInt(event.data.object.metadata.subscription);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        console.log(`Webhook Error: ${err.message}`)
    }

    switch (event.type) {
        case 'checkout.session.completed':
          const checkoutSessionCompleted = event.data.object;
          const client = await clientPromise;
          const db = client.db("users");
          db.collection("users").updateOne(
            { email: email },
            { $set: { subscription : subscription} }
          );
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }


    res.status(200);


  }