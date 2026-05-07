import { getCollection } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  const users = await getCollection("users");

  const user = await users.findOne({ email });

  if (!user) {
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const response = Response.json({ message: "Login successful" });

  response.headers.set(
    "Set-Cookie",
    `userId=${user._id}; Path=/; HttpOnly`
  );

  return response;
}