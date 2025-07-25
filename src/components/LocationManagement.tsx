import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Camera, Plus, Settings, Wifi, WifiOff, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LocationManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const locations = [
    {
      id: 1,
      name: "Main Building",
      address: "123 Business Plaza, Floor 1",
      cameras: 12,
      activeCameras: 12,
      status: "online",
      lastUpdated: "2 min ago"
    },
    {
      id: 2,
      name: "Parking Area A",
      address: "North Parking Structure",
      cameras: 8,
      activeCameras: 8,
      status: "online",
      lastUpdated: "5 min ago"
    },
    {
      id: 3,
      name: "Warehouse Zone",
      address: "Industrial District, Building C",
      cameras: 16,
      activeCameras: 15,
      status: "partial",
      lastUpdated: "1 hour ago"
    },
    {
      id: 4,
      name: "Perimeter Security",
      address: "Facility Boundary",
      cameras: 20,
      activeCameras: 20,
      status: "online",
      lastUpdated: "30 sec ago"
    }
  ];

  const cameras = [
    { id: 1, name: "Entrance CAM-01", location: "Main Building", status: "online", quality: "4K", type: "Fixed" },
    { id: 2, name: "Lobby CAM-02", location: "Main Building", status: "online", quality: "1080p", type: "PTZ" },
    { id: 3, name: "Parking CAM-03", location: "Parking Area A", status: "offline", quality: "1080p", type: "Fixed" },
    { id: 4, name: "Storage CAM-04", location: "Warehouse Zone", status: "online", quality: "4K", type: "Fixed" },
    { id: 5, name: "Gate CAM-05", location: "Perimeter Security", status: "online", quality: "4K", type: "PTZ" }
  ];

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCameras = cameras.filter(camera =>
    camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camera.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddLocation = () => {
    toast({
      title: "Location Added",
      description: "New location has been added successfully.",
    });
  };

  const handleCameraAction = (action: string, cameraName: string) => {
    toast({
      title: `Camera ${action}`,
      description: `${cameraName} has been ${action.toLowerCase()}.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "offline":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "partial":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Location Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
              <DialogDescription>
                Create a new security location and configure its cameras.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Location Name" />
              <Input placeholder="Address" />
              <Input placeholder="Number of Cameras" type="number" />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleAddLocation}>Add Location</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search locations or cameras..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="cameras">Cameras</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{locations.length}</div>
                <p className="text-xs text-muted-foreground">
                  Across all facilities
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Cameras</CardTitle>
                <Camera className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {locations.reduce((acc, loc) => acc + loc.cameras, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Monitoring all areas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Online Rate</CardTitle>
                <Wifi className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">96%</div>
                <p className="text-xs text-muted-foreground">
                  System availability
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Offline Cameras</CardTitle>
                <WifiOff className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  Require attention
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Location Status Summary</CardTitle>
              <CardDescription>Quick overview of all locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locations.map((location) => (
                  <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(location.status)}
                      <div>
                        <p className="font-medium">{location.name}</p>
                        <p className="text-sm text-muted-foreground">{location.address}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{location.activeCameras}/{location.cameras} cameras</p>
                      <p className="text-sm text-muted-foreground">Updated {location.lastUpdated}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLocations.map((location) => (
              <Card key={location.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{location.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(location.status)}
                      <Badge variant={location.status === "online" ? "default" : "secondary"}>
                        {location.status}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{location.address}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cameras:</span>
                      <span className="font-medium">{location.activeCameras}/{location.cameras}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span className="text-sm text-muted-foreground">{location.lastUpdated}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Camera className="w-4 h-4 mr-1" />
                      View Cameras
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cameras" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Camera Management</CardTitle>
              <CardDescription>Manage all security cameras across locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCameras.map((camera) => (
                  <div key={camera.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(camera.status)}
                      <div>
                        <p className="font-medium">{camera.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {camera.location} • {camera.quality} • {camera.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleCameraAction("Restarted", camera.name)}
                      >
                        Restart
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleCameraAction("Configured", camera.name)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LocationManagement;