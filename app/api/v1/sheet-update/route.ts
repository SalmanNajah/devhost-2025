import { NextResponse, NextRequest } from "next/server";
import { adminDb } from "@/firebase/admin";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized: Missing token" },
        { status: 401 },
      );
    }

    const token = authHeader.split("Bearer ")[1];
    if (!token || token !== process.env.EXPECTED_SECRET_KEY) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid token" },
        { status: 401 },
      );
    }
  } catch (err) {
    console.error("Error during token validation:", err);
    return NextResponse.json(
      { error: "Unauthorized: Invalid request format" },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const { data } = body;

    console.log("Received update from Google Sheet:", data);

    if (!data?.id) {
      return NextResponse.json(
        { error: "Missing document ID in payload" },
        { status: 400 },
      );
    }

    await adminDb
      .collection("registrations")
      .doc(data.id)
      .update({
        paymentDone: data?.verified ?? false,
        registered: data?.verified ?? false,
      });

    return NextResponse.json({
      success: true,
      message: `Document ${data.id} updated successfully`,
    });
  } catch (err) {
    console.error("Error updating Firestore:", err);
    return NextResponse.json(
      { error: "Internal Server Error: Failed to update document" },
      { status: 500 },
    );
  }
}
