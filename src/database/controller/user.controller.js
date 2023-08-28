import { ObjectId } from "mongodb";
import { getDb } from "../utils/dbConnect";
import { NextResponse } from "next/server";

const COLLECTION_NAME = process.env.COLLECTION_NAME;

// GET All Users
export async function getUsersHandler() {
  try {
    const db = getDb();
    const dbs = db.collection(COLLECTION_NAME);
    const users = await dbs.find().toArray();

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

// GET User by ID
export async function getUserByIdHandler(request, params) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required." },
        { status: 400 }
      );
    }
    const db = getDb();
    const result = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectId(userId) });
    if (!result) {
      return NextResponse.json(
        { success: false, error: `User with ID ${userId} not found.` },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

// CREATE a New User
export async function createUserHandler(request) {
  try {
    const db = getDb();
    const data = await request.json();
    const result = await db.collection(COLLECTION_NAME).insertOne(data);
    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

// Update Any User
export async function updateUserHandler(request, params) {
  try {
    const db = getDb();
    const { userId } = params;

    const data = await request.json();

    try {
      const result = await db
        .collection(COLLECTION_NAME)
        .updateOne({ _id: new ObjectId(userId) }, { $set: data });

      return NextResponse.json({ result }, { status: 200 });
    } catch (updateError) {
      console.error("Error updating document:", updateError);
      return NextResponse.json(
        { success: false, error: "Update operation failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json(
      { success: false, error: "Database connection error" },
      { status: 500 }
    );
  }
}

// DELETE Any User
export async function deleteUserHandler(request, params) {
  try {
    const db = getDb();
    const result = await db
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(params.userId) });

    return NextResponse.json(
      { success: true, message: "Successfully deleted the user" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
