import { getCollection } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  const users = await getCollection("users");

  const user = await users.findOne({
    email,
  });

  if (!user) {
    return Response.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    return Response.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const response = Response.json({
    message: "Login successful",
  });

  response.headers.set(
    "Set-Cookie",
    `userId=${user._id}; Path=/; HttpOnly`
  );

  return response;
}