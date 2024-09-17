import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";

import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex  min-h-screen">
      <LeftSidebar />
      <div className="w-full ">{children}</div>
    </div>
  );
};

export default layout;
