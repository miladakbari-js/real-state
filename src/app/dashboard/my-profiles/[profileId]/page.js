import AddProfilePage from "@template/AddProfilePage";
import connectDb from "@utils/connectDB";
import Profile from "src/models/Profile";

async function Edit({ params: { profileId } }) {
  await connectDb();
  const profile = await Profile.findOne({ _id: profileId });
  if(!profile) return <h3>مشکلی پیشآمده است ، لطفا دوباره امتحان کنید . . .</h3>

  return <AddProfilePage data={JSON.parse(JSON.stringify(profile))}/>
}

export default Edit;
