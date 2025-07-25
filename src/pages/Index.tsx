import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
import CameraGrid from "@/components/CameraGrid";
import IncidentManagement from "@/components/IncidentManagement";
import Analytics from "@/components/Analytics";
import LocationManagement from "@/components/LocationManagement";
import heroImage from "@/assets/hero-security.jpg";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "cameras":
        return <CameraGrid />;
      case "incidents":
        return <IncidentManagement />;
      case "analytics":
        return <Analytics />;
      case "investigations":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Video Investigations</h2>
            <p className="text-muted-foreground">Search and analyze video footage</p>
          </div>
        );
      case "locations":
        return <LocationManagement />;
      case "ai-insights":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">AI Insights</h2>
            <p className="text-muted-foreground">AI-powered security analysis and predictions</p>
          </div>
        );
      case "users":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">User Management</h2>
            <p className="text-muted-foreground">Manage users and permissions</p>
          </div>
        );
      case "reports":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Security Reports</h2>
            <p className="text-muted-foreground">Generate and view security reports</p>
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">System Settings</h2>
            <p className="text-muted-foreground">Configure system preferences and integrations</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
