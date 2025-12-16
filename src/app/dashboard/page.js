import DashboardPage from "@template/DashboardPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import connectDb from "@utils/connectDB";
import User from "@models/User";

async function Dashboard() {
  await connectDb();
  const session = await getServerSession(authOptions);
  const user = await User.findOne({ email: session.user.email });
  
  return (
    <div>
      <DashboardPage createdAt={user.createdAt}/>
    </div>
  );
}

export default Dashboard;
