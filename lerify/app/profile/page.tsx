import Header from "@/components/Header";
import React from "react";
import { RxAvatar } from "react-icons/rx";

const Profile = () => {
  return (
    <div>
      <Header>
        <div className="mb-2 text-4xl text-white font-black py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            Profile
          </div>
        </div>
      </Header>

      <div className="px-10 text-white flex items-center">
        <RxAvatar size={200}/>
        <p className="text-5xl p-3">Username</p>
      </div>
    </div>
  );
};

export default Profile;
