
import React from "react";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import ContentArea from "./ContentArea";
import ResumePreview from "./ResumePreview";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 h-full">
          <Sidebar />
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-full">
          <ContentArea />
          <ResumePreview />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
