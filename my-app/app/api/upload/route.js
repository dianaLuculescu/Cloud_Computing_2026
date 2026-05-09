import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const data = await req.formData();

    const file = data.get("file");

    if (!file) {
      return Response.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const base64 = buffer.toString("base64");

    const fileUri = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(fileUri, {
      folder: "dentist-app",
    });

    return Response.json({
      url: result.secure_url,
    });

  } catch (err) {
    console.log(err);

    return Response.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}