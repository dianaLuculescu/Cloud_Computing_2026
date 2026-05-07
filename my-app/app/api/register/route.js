import { getCollection } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const body = await req.json();
  const { firstName, lastName, email, password } = body;

  const users = await getCollection("users");

  const existing = await users.findOne({ email });

  if (existing) {
    return Response.json({ message: "User exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await users.insertOne({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  return Response.json({ message: "User created" });
}