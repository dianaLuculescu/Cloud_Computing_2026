import { getCollection } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import sgMail from "@/lib/sendgrid";

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

  try {
  await sgMail.send({
    to: user.email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: "Appointment Confirmation",
    html: `
      <h2>Appointment confirmed</h2>

      <p><b>Service:</b> ${service}</p>
      <p><b>Date:</b> ${date}</p>
      <p><b>Time:</b> ${time}</p>

      <br/>

      <p>Thank you for booking with us!</p>
    `,
  });
} catch (err) {
  console.log(err);
}

  return Response.json({ message: "Appointment created" });
}