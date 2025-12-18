import connectDb from "@utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import User from "src/models/User";

export async function POST(req) {
  try {
    await connectDb();
    const body = await req.json();
    const {
      title,
      description,
      location,
      phone,
      price,
      realState,
      constructionDate,
      category,
      rules,
      amenities,
    } = body;

    //user Authentication
    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا ابتدا وارد حساب کاربری خودشود" },
        { status: 401 }
      );
    }

    const user = User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده است" },
      { status: 500 }
    );
  }
}
