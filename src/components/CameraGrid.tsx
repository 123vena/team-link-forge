import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Camera, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  Search,
  Filter,
  Grid3X3,
  Grid2X2,
  Square
} from "lucide-react";

interface CameraFeed {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline" | "recording";
  lastSeen: string;
  resolution: string;
  hasAudio: boolean;
  aiEnabled: boolean;
}

const CameraGrid = () => {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [gridLayout, setGridLayout] = useState<"1x1" | "2x2" | "3x3">("3x3");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const cameras: CameraFeed[] = [
    {
      id: "cam-001",
      name: "Main Entrance",
      location: "Store #12 - Downtown",
      status: "online",
      lastSeen: "Live",
      resolution: "1080p",
      hasAudio: true,
      aiEnabled: true
    },
    {
      id: "cam-002", 
      name: "Cash Register 1",
      location: "Store #12 - Downtown",
      status: "recording",
      lastSeen: "Live",
      resolution: "4K",
      hasAudio: false,
      aiEnabled: true
    },
    {
      id: "cam-003",
      name: "Storage Area",
      location: "Store #12 - Downtown", 
      status: "online",
      lastSeen: "Live",
      resolution: "1080p",
      hasAudio: false,
      aiEnabled: false
    },
    {
      id: "cam-004",
      name: "Parking Lot",
      location: "Store #12 - Downtown",
      status: "offline",
      lastSeen: "2 hours ago",
      resolution: "720p",
      hasAudio: false,
      aiEnabled: true
    },
    {
      id: "cam-005",
      name: "Loading Dock",
      location: "Store #8 - Mall",
      status: "online", 
      lastSeen: "Live",
      resolution: "1080p",
      hasAudio: true,
      aiEnabled: true
    },
    {
      id: "cam-006",
      name: "Customer Service",
      location: "Store #8 - Mall",
      status: "recording",
      lastSeen: "Live", 
      resolution: "4K",
      hasAudio: true,
      aiEnabled: true
    },
    {
      id: "cam-007",
      name: "Emergency Exit",
      location: "Store #3 - Airport",
      status: "online",
      lastSeen: "Live",
      resolution: "1080p", 
      hasAudio: false,
      aiEnabled: true
    },
    {
      id: "cam-008",
      name: "Break Room",
      location: "Store #3 - Airport",
      status: "online",
      lastSeen: "Live",
      resolution: "720p",
      hasAudio: false,
      aiEnabled: false
    },
    {
      id: "cam-009",
      name: "Inventory Area",
      location: "Store #5 - City Center",
      status: "recording",
      lastSeen: "Live",
      resolution: "4K",
      hasAudio: false,
      aiEnabled: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-success";
      case "recording": return "bg-primary animate-pulse";
      case "offline": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getGridCols = () => {
    switch (gridLayout) {
      case "1x1": return "grid-cols-1";
      case "2x2": return "grid-cols-1 md:grid-cols-2";
      case "3x3": return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      default: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  const filteredCameras = cameras.filter(camera =>
    camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    camera.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Live Camera Feeds</h2>
          <p className="text-muted-foreground">
            {cameras.filter(c => c.status === "online" || c.status === "recording").length} of {cameras.length} cameras online
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search cameras..."
              className="pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Layout Controls */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            <Button
              variant={gridLayout === "1x1" ? "default" : "ghost"}
              size="sm"
              onClick={() => setGridLayout("1x1")}
              className="h-8 w-8 p-0"
            >
              <Square className="w-4 h-4" />
            </Button>
            <Button
              variant={gridLayout === "2x2" ? "default" : "ghost"}
              size="sm"
              onClick={() => setGridLayout("2x2")}
              className="h-8 w-8 p-0"
            >
              <Grid2X2 className="w-4 h-4" />
            </Button>
            <Button
              variant={gridLayout === "3x3" ? "default" : "ghost"}
              size="sm"
              onClick={() => setGridLayout("3x3")}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="bg-card/50 backdrop-blur-glass border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Filter Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Status</label>
                <div className="mt-2 space-y-2">
                  {["online", "recording", "offline"].map(status => (
                    <label key={status} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm capitalize">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Location</label>
                <div className="mt-2 space-y-2">
                  {["Store #12", "Store #8", "Store #3", "Store #5"].map(location => (
                    <label key={location} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Resolution</label>
                <div className="mt-2 space-y-2">
                  {["4K", "1080p", "720p"].map(res => (
                    <label key={res} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">{res}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Features</label>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">AI Enabled</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Audio</span>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Camera Grid */}
      <div className={`grid ${getGridCols()} gap-6`}>
        {filteredCameras.map((camera) => (
          <Card 
            key={camera.id} 
            className={`bg-card/50 backdrop-blur-glass border-border/50 hover:border-primary/30 transition-all duration-300 ${
              selectedCamera === camera.id ? "ring-2 ring-primary shadow-glow" : ""
            }`}
            onClick={() => setSelectedCamera(camera.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(camera.status)}`} />
                  <CardTitle className="text-base">{camera.name}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  {camera.aiEnabled && (
                    <Badge variant="secondary" className="text-xs">AI</Badge>
                  )}
                  {camera.hasAudio && (
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{camera.location}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Video Feed Placeholder */}
              <div className="aspect-video bg-muted rounded-lg border border-border/50 flex items-center justify-center relative group">
                <div className="text-center">
                  {camera.status === "offline" ? (
                    <div className="text-destructive">
                      <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Camera Offline</p>
                    </div>
                  ) : (
                    <div>
                      <Play className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Live Feed</p>
                    </div>
                  )}
                </div>

                {/* Video Controls Overlay */}
                {camera.status !== "offline" && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Pause className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      {camera.hasAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Maximize className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Camera Info */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">
                    <strong>Resolution:</strong> {camera.resolution}
                  </span>
                  <span className="text-muted-foreground">
                    <strong>Status:</strong> {camera.lastSeen}
                  </span>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${
                    camera.status === "online" ? "border-success text-success" :
                    camera.status === "recording" ? "border-primary text-primary" :
                    "border-destructive text-destructive"
                  }`}
                >
                  {camera.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CameraGrid;