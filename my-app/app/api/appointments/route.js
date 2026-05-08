import { getCollection } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const body = await req.json();
  const { service, date, time } = body;

  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return Response.json({ message: "Not logged in" }, { status: 401 });
  }

  const appointments = await getCollection("appointments");
  const users = await getCollection("users");

  const user = await users.findOne({
    _id: new ObjectId(userId),
  });

  if (!user) {
    return Response.json({ message: "Invalid user" }, { status: 401 });
  }

  const existing = await appointments.findOne({
    date,
    time,
  });

  if (existing) {
    return Response.json(
      { message: "This time slot is already booked" },
      { status: 400 }
    );
  }

  await appointments.insertOne({
    service,
    date,
    time,
    userId: user._id,
    userName: user.firstName + " " + user.lastName,
    userEmail: user.email,
    createdAt: new Date(),
  });

  return Response.json({ message: "Appointment created" });
}