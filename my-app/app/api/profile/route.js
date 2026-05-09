import { getCollection } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

export async function GET() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return Response.json(
      { message: "Not logged in" },
      { status: 401 }
    );
  }

  const users = await getCollection("users");

  const user = await users.findOne({
    _id: new ObjectId(userId),
  });

  return Response.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profileImage: user.profileImage || "",
  });
}

export async function PUT(req) {
  const body = await req.json();

  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return Response.json(
      { message: "Not logged in" },
      { status: 401 }
    );
  }

  const users = await getCollection("users");

  await users.updateOne(
    {
      _id: new ObjectId(userId),
    },
    {
      $set: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        profileImage: body.profileImage,
      },
    }
  );

  return Response.json({
    message: "Profile updated",
  });
}