import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import appInfo from "./app-info";
import { SideNavInnerToolbar as SideNavBarLayout } from "./layouts";
import { Footer } from "./components";
import Profile from "./pages/profile/profile";
import Home from "./pages/home/home";

export default function () {
  return (
    <SideNavBarLayout title={appInfo.title}>
      <Routes>
        <Route path="/home" element={<Home currentPath={"/home"} />} />
        <Route path="/profile" element={<Profile currentPath={"/profile"} />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      <Footer>
        Copyright © 2011-2019 Developer Express Inc.
        <br />
        All trademarks or registered trademarks are property of their respective
        owners.
      </Footer>
    </SideNavBarLayout>
  );
}
