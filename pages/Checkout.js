import Stripe from 'stripe';

export default async function checkout({lineItems}, email, subscription_num){
	let stripe = new Stripe(process.env.NEXT_PUBLIC_API_KEY)

	const session = await stripe.checkout.sessions.create({
		mode: 'payment',
		line_items: lineItems,
		success_url: "http://localhost:3000/",
		cancel_url: "http://localhost:3000/",
		metadata: {
			email: email,
			subscription: subscription_num
		}
	})

	window.location = session.url;
	return session;

}