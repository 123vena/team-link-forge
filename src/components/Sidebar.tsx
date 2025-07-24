import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Camera, 
  BarChart3, 
  AlertTriangle, 
  Settings, 
  Users, 
  FileText, 
  Search,
  Bell,
  Menu,
  X,
  Home,
  Eye,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notifications] = useState(3);

  const navigation = [
    {
      id: "dashboard",
      name: "Dashboard", 
      icon: Home,
      notifications: 0
    },
    {
      id: "cameras",
      name: "Live Cameras",
      icon: Camera,
      notifications: 0
    },
    {
      id: "incidents",
      name: "Incidents",
      icon: AlertTriangle,
      notifications: 5
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: BarChart3,
      notifications: 0
    },
    {
      id: "investigations",
      name: "Investigations",
      icon: Search,
      notifications: 2
    },
    {
      id: "locations",
      name: "Locations",
      icon: MapPin,
      notifications: 0
    },
    {
      id: "ai-insights",
      name: "AI Insights",
      icon: Eye,
      notifications: 1
    },
    {
      id: "users",
      name: "Users",
      icon: Users,
      notifications: 0
    },
    {
      id: "reports",
      name: "Reports",
      icon: FileText,
      notifications: 0
    },
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
      notifications: 0
    }
  ];

  return (
    <div className={cn(
      "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-sidebar-foreground">SecureLink</h2>
                <p className="text-xs text-sidebar-foreground/60">Security Platform</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:text-sidebar-primary-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 h-10",
              activeView === item.id 
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-primary" 
                : "text-sidebar-foreground hover:text-sidebar-primary-foreground hover:bg-sidebar-accent",
              isCollapsed && "justify-center px-2"
            )}
            onClick={() => onViewChange(item.id)}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.name}</span>
                {item.notifications > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="h-5 min-w-5 text-xs px-1 bg-gradient-danger"
                  >
                    {item.notifications}
                  </Badge>
                )}
              </>
            )}
          </Button>
        ))}
      </nav>

      {/* Status */}
      <div className="p-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-sidebar-foreground/60">System Status</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-xs text-success">Online</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-sidebar-foreground/60" />
              <span className="text-sm text-sidebar-foreground/60">
                {notifications} new alerts
              </span>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-success rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;