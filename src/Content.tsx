import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import appInfo from "./app-info";
import { SideNavInnerToolbar as SideNavBarLayout } from "./layouts";
import { Footer } from "./components";
import Profile from "./pages/profile/profile";
import Home from "./pages/home/home";
import { Currencies } from "./pages";
import { Colors } from "./pages";

export default function () {
  return (
    <SideNavBarLayout title={appInfo.title}>
      <Routes>
        <Route path="/home" element={<Home currentPath={"/home"} />} />
        <Route path="/profile" element={<Profile currentPath={"/profile"} />} />
        <Route path="/colors" element={<Colors currentPath={"/colors"} />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/currencies" element={<Currencies currentPath={"/currencies"} />} />
      </Routes>
      <Footer>
        Copyright © 2011-2023 İbo oğulları.
        <br />
        All trademarks or registered trademarks are property of their respective
        owners.
      </Footer>
    </SideNavBarLayout>
  );
}
