import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const { id, service, date, time } = await req.json();

  const appointments = await getCollection("appointments");

  await appointments.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        service,
        date,
        time,
      },
    }
  );

  return Response.json({ message: "Updated" });
}