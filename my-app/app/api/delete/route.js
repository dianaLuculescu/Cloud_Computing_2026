import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const { id } = await req.json();

  const appointments = await getCollection("appointments");

  await appointments.deleteOne({
    _id: new ObjectId(id),
  });

  return Response.json({ message: "Deleted" });
}