import DetailsPage from "@template/DetailsPage";
import connectDb from "@utils/connectDB";
import React from "react";
import Profile from "src/models/Profile";

async function ProfileDetails({ params: { profileId } }) {
  await connectDb();
  const profile = await Profile.findOne({ _id: profileId });

  if (!profile) return <h3>مشکلی پیش آمده است</h3>;
  return <DetailsPage data={profile} />;
}

export default ProfileDetails;
