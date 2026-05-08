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

  const appointments = await getCollection("appointments");

  const data = await appointments
    .find({
      userId: new ObjectId(userId),
    })
    .toArray();

  return Response.json(data);
}