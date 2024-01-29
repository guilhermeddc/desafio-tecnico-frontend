import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SpinnerIndicator } from "../components";

const Login = lazy(() => import("../pages/Login"));

export const PublicRoutes: React.FC = () => {
  return (
    <Suspense fallback={<SpinnerIndicator />}>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};
