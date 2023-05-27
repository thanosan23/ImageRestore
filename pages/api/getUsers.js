import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    const client = await clientPromise;
    const db = client.db("users");

    const users = await db.collection("users").find({}).toArray();

    res.status(200).json(users);
};