import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MyProfilesPage from "@template/MyProfilesPage";
import connectDb from "@utils/connectDB";
import { getServerSession } from "next-auth";
import User from "src/models/User";

async function MyProfiles() {
  await connectDb();
  const session = await getServerSession(authOptions);
  const [user] = await User.aggregate([
    { $match: { email: session.user.email } },
    {
      $lookup: {
        from: "profiles",
        foreignField: "userId",
        localField: "_id",
        as: "profiles",
      },
    },
  ]);
  console.log(user.profiles);
  return <MyProfilesPage profiles={user.profiles}/>;
}

export default MyProfiles;
