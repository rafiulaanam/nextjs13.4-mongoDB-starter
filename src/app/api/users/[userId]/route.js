import {
  deleteUserHandler,
  getUserByIdHandler,
  updateUserHandler,
} from "@/database/controller/user.controller";
import { connectToDatabase } from "@/database/utils/dbConnect";

export async function GET(request, { params }) {
  await connectToDatabase();
  return getUserByIdHandler(request, params);
}

export async function PUT(request, { params }) {
  await connectToDatabase();
  return updateUserHandler(request, params);
}


export async function DELETE(request, { params }) {
  await connectToDatabase();
  return deleteUserHandler(request, params);
}
