import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {

    const client = await clientPromise;
    const db = client.db("users");
    const { email } = req.body;

    const user = await db.collection("users").insertOne({
        email: email,
        subscription: -1,
        imagesRestored: 0
    })
  
    res.status(200).json(user);


  }