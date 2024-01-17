import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};
