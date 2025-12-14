import { NextResponse } from "next/server";
import { hashPassword } from "@utils/auth";
import connectDB from "@utils/connectDB";
import User from "@models/User";

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();
    console.log({ email, password });

    if (!email || !password) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید" },
        { status: 422 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "این حساب کاربری وجود دارد" },
        { status: 422 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });
    console.log(newUser);

    return NextResponse.json(
      { message: "حساب کاربری با موفقیت ایجاد شد" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است !" },
      { status: 500 }
    );
  }
}
