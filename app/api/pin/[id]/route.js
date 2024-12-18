import Pin from "@/models/pin";
import connectToDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    // Ensure database is connected
    await connectToDB();

    // Extract the pin ID from params
    const { id } = params;

    // Find the pin by ID
    const pin = await Pin.findById(id);

    if (!pin) {
     
      return NextResponse.json(
        { success: false, message: "Pin not found" },
        { status: 404 }
      );
    }

    // Return the pin data
    return NextResponse.json({ success: true, pin }, { status: 200 });
  } catch (error) {
    console.error("Error while fetching the pin:", error);
    return NextResponse.json(
      { success: false, message: "Error while fetching the pin" },
      { status: 500 }
    );
  }
};
