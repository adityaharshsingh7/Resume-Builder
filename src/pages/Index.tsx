
import React from "react";
import { ResumeProvider } from "@/context/ResumeContext";
import MainLayout from "@/components/MainLayout";

const Index: React.FC = () => {
  return (
    <ResumeProvider>
      <MainLayout />
    </ResumeProvider>
  );
};

export default Index;
