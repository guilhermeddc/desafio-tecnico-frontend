import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SpinnerIndicator } from "../components";

const Dashboard = lazy(() => import("../pages/Dashboard"));

export const PrivateRoutes: React.FC = () => {
  return (
    <Suspense fallback={<SpinnerIndicator />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};
