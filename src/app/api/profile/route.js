import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDb from "@utils/connectDB";
import Profile from "src/models/Profile";
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
        { error: "لطفا ابتدا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );
    }

    // Valid information
    if (
      !title ||
      !description ||
      !location ||
      !phone ||
      !price ||
      !realState ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید" },
        { status: 400 }
      );
    }

    //create Profile Ads
    const newProfile = await Profile.create({
      title,
      description,
      location,
      phone,
      realState,
      constructionDate,
      amenities,
      rules,
      category,
      price: +price,
      userId: new Types.ObjectId(user._id),
    });
    console.log(newProfile);

    return NextResponse.json(
      { message: "آگهی جدید اضافه شد" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده است" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDb();
    const {
      _id,
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
    } = await req.json();

    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا ابتدا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );
    }

    if (
      !_id ||
      !title ||
      !description ||
      !location ||
      !phone ||
      !price ||
      !realState ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید" },
        { status: 400 }
      );
    }

    const profile = await Profile.findOne({ _id });

    if (!user._id.equals(profile.userId)) {
      return NextResponse.json(
        { error: "دسترسی شما به این آگهی محدود شده است" },
        { status: 403 }
      );
    }

    Profile.title = title;
    Profile.description = description;
    Profile.location = location;
    Profile.phone = phone;
    Profile.price = price;
    Profile.realState = realState;
    Profile.constructionDate = constructionDate;
    Profile.category = category;
    Profile.amenities = amenities;
    Profile.rules = rules;
    Profile.save();

    return NextResponse.json(
      { message: "آگهس با موفقیت ویرایش شد" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده است" },
      { status: 500 }
    );
  }
}
