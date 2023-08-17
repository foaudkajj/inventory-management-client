import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import appInfo from "./app-info";
import { SideNavInnerToolbar as SideNavBarLayout } from "./layouts";
import { Footer } from "./components";
import Profile from "./pages/profile/profile";
import Home from "./pages/home/home";
import {
  Currencies,
  GenericLists,
  Colors,
  GenericListItems,
  Branches,
  PaymentMethods,
  SellingPage,
  Users,
  Products,
  ProductCategories,
} from "./pages";

export default function () {
  return (
    <SideNavBarLayout title={appInfo.title}>
      <Routes>
        <Route path="/home" element={<Home currentPath={"/home"} />} />
        <Route path="/profile" element={<Profile currentPath={"/profile"} />} />
        <Route path="/colors" element={<Colors currentPath={"/colors"} />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route
          path="/currencies"
          element={<Currencies currentPath={"/currencies"} />}
        />
        <Route
          path="/branches"
          element={<Branches currentPath={"/branches"} />}
        />
        <Route path="/users" element={<Users currentPath={"/users"} />} />
        <Route
          path="/genericLists"
          element={<GenericLists currentPath={"/genericLists"} />}
        />
        <Route
          path="/genericListItems"
          element={<GenericListItems currentPath={"/genericListItems"} />}
        />
        <Route
          path="/paymentMethods"
          element={<PaymentMethods currentPath={"/paymentMethods"} />}
        />
        <Route
          path="/sellingPage"
          element={<SellingPage currentPath={"/sellingPage"} />}
        />
        <Route
          path="/products"
          element={<Products currentPath={"/products"} />}
        />
        <Route
          path="/productCategories"
          element={<ProductCategories currentPath={"/productCategories"} />}
        />
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
