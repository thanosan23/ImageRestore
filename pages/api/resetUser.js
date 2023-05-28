import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {

    const client = await clientPromise;
    const db = client.db("users");
    const { email } = req.body;

    db.collection("users").updateOne(
      { email: email },
      { $set: { subscription : -1, paymentIntent : ""} }
    );
  
    res.status(200);


  }