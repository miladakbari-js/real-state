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

export const generateMetadata = async ({ params: { profileId } }) => {
  await connectDb();
  const profile = await Profile.findOne({ _id: profileId });

  return {
    title: profile.title,
    description: profile.description,
    authors: { name: profile.realState },
    other: { myTag: "test meta Tag" },
  };
};
