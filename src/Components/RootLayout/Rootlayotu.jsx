import React, { useEffect, useState } from "react";
import Sidebar from "../HomeComponent/Sidebar";
import { Outlet } from "react-router";
import Usernotfound from "../../Pages/Error/Usernotfound";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Rootlayotu() {
  const auth = getAuth();
  const [userVerified, setuserVerifed] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuserVerifed(user.emailVerified);
      }
    });
  }, []);

  let content = null;

  if (userVerified) {
    content = (
      <div className="flex gap-x-[30px] p-3">
        <Sidebar />
        <div className="w-full rounded-3xl h-[96dvh] shadow-2xl bg-gray-100">
          <Outlet />
        </div>
      </div>
    );
  } else {
    content = <Usernotfound />;
  }

  return <>{content}</>;
}

export default Rootlayotu;
