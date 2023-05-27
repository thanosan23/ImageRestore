import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    const client = await clientPromise;
    const db = client.db("users");
    const { email } = req.body;

    const userInfo = await db.collection("users").findOne({ email : email});
    res.status(200).json(userInfo);
};