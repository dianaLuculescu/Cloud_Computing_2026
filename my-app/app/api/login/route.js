import { getCollection } from "@/lib/mongodb";

export async function POST(req) {
  const body = await req.json();
  const { service, date, time } = body;

  const appointments = await getCollection("appointments");

  // 🔥 verificare corectă conflict
  const existing = await appointments.findOne({
    date: date,
    time: time,
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
    createdAt: new Date(),
  });

  return Response.json({ message: "Appointment created" });
}