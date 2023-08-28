import {
  createUserHandler,
  getUsersHandler,
} from "@/database/controller/user.controller";
import { connectToDatabase } from "@/database/utils/dbConnect";

export async function GET() {
  await connectToDatabase();
  return getUsersHandler();
}

export async function POST(request) {
  await connectToDatabase();
  return createUserHandler(request);
}
