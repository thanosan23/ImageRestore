import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {

    const { email } = req.body;

    const client = await clientPromise;

    const db = client.db("users");

    const userInfo = await db.collection("users").findOne({ email : email});

    db.collection("users").updateOne(
        { email: email },
        { $set: { imagesRestored : userInfo.imagesRestored +  1 } }
    );
    
    res.status(200);

  }