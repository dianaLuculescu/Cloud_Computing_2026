import { getCollection } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  const users = await getCollection("users");

  // caută userul după email
  const user = await users.findOne({
    email,
  });

  // dacă nu există
  if (!user) {
    return Response.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  // compară parola introdusă cu hash-ul din DB
  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  // dacă parola e greșită
  if (!validPassword) {
    return Response.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  // creează cookie
  const response = Response.json({
    message: "Login successful",
  });

  response.headers.set(
    "Set-Cookie",
    `userId=${user._id}; Path=/; HttpOnly`
  );

  return response;
}