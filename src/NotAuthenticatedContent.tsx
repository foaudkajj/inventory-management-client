import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SingleCard } from "./layouts";
import {
  LoginForm,
  ResetPasswordForm,
  ChangePasswordForm,
  CreateAccountForm,
} from "./components";
import appInfo from "./app-info";

export default function () {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <SingleCard title={appInfo.title}>
            <LoginForm />
          </SingleCard>
        }
      ></Route>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route
        path="/create-account"
        element={
          <SingleCard title="Sign Up">
            <CreateAccountForm />
          </SingleCard>
        }
      ></Route>
      <Route
        path="/reset-password"
        element={
          <SingleCard
            title="Reset Password"
            description="Please enter the email address that you used to register, and we will send you an email with a link to reset your password."
          >
            <ResetPasswordForm />
          </SingleCard>
        }
      ></Route>
      <Route
        path="/change-password/:recoveryCode"
        element={
          <SingleCard title="Change Password">
            <ChangePasswordForm />
          </SingleCard>
        }
      ></Route>
      <Route element={<Navigate replace={true} to={"/login"} />}></Route>
    </Routes>
  );
}
