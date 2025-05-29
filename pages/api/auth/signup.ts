import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Input invalid",
    });

    return;
  }

  const client = await connectToDatabase();

  const db = client?.db();

  const existingUser = await db?.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({
      message: "We already have a user with the same email",
    });
    client?.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db?.collection("users").insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "Created user!",
  });

  client?.close();
};

export default handler;
