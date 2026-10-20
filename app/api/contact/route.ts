import { NextResponse } from "next/server";

import getMongoClientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: Request) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json(
      { error: "The contact form is not configured yet. Please try again later." },
      { status: 503 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const submission = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  if (
    !submission.name ||
    submission.name.length > MAX_NAME_LENGTH ||
    !submission.email ||
    submission.email.length > MAX_EMAIL_LENGTH ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email) ||
    !submission.message ||
    submission.message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json(
      {
        error:
          "Please provide valid contact details and a message under 5000 characters.",
      },
      { status: 400 }
    );
  }

  try {
    const client = await getMongoClientPromise();
    const database = client.db(process.env.MONGODB_DB ?? "portfolio");

    await database.collection("contact_submissions").insertOne({
      ...submission,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Your message was sent successfully." });
  } catch (error) {
    console.error("Unable to save contact form submission:", error);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 500 }
    );
  }
}
