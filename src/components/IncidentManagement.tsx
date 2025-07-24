import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle,
  MapPin,
  Calendar,
  User
} from "lucide-react";

interface Incident {
  id: string;
  type: string;
  location: string;
  time: string;
  severity: "high" | "medium" | "low";
  status: "open" | "investigating" | "resolved";
  description: string;
  assignedTo?: string;
  reporter: string;
  cameraId?: string;
}

const IncidentManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: "INC-001",
      type: "Shoplifting",
      location: "Store 1 - Electronics",
      time: "2024-01-15 14:30",
      severity: "high",
      status: "investigating",
      description: "Suspicious activity detected near high-value electronics section",
      assignedTo: "Security Team Alpha",
      reporter: "AI Detection System",
      cameraId: "CAM-001"
    },
    {
      id: "INC-002",
      type: "Unauthorized Access",
      location: "Store 2 - Staff Area",
      time: "2024-01-15 12:15",
      severity: "medium",
      status: "open",
      description: "Person entered restricted staff area without authorization",
      reporter: "Motion Sensor",
      cameraId: "CAM-015"
    },
    {
      id: "INC-003",
      type: "Slip and Fall",
      location: "Store 1 - Entrance",
      time: "2024-01-15 10:45",
      severity: "low",
      status: "resolved",
      description: "Customer slipped near entrance, no injuries reported",
      assignedTo: "Safety Team",
      reporter: "Staff Member",
      cameraId: "CAM-003"
    },
    {
      id: "INC-004",
      type: "Vandalism",
      location: "Store 3 - Parking Lot",
      time: "2024-01-14 23:20",
      severity: "medium",
      status: "investigating",
      description: "Graffiti detected on exterior wall",
      assignedTo: "Security Team Beta",
      reporter: "Night Security",
      cameraId: "CAM-022"
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-destructive text-destructive-foreground";
      case "investigating": return "bg-warning text-warning-foreground";
      case "resolved": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return XCircle;
      case "investigating": return Clock;
      case "resolved": return CheckCircle;
      default: return AlertTriangle;
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === "all" || incident.severity === selectedSeverity;
    const matchesStatus = selectedStatus === "all" || incident.status === selectedStatus;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const updateIncidentStatus = (incidentId: string, newStatus: "open" | "investigating" | "resolved") => {
    setIncidents(prev => prev.map(incident => 
      incident.id === incidentId 
        ? { ...incident, status: newStatus }
        : incident
    ));
    
    toast({
      title: "Incident Updated",
      description: `Incident ${incidentId} status changed to ${newStatus}`,
    });
  };

  const createNewIncident = () => {
    const newIncident: Incident = {
      id: `INC-${String(incidents.length + 1).padStart(3, '0')}`,
      type: "Manual Report",
      location: "Select Location",
      time: new Date().toISOString().slice(0, 16).replace('T', ' '),
      severity: "medium",
      status: "open",
      description: "New incident reported manually",
      reporter: "Security Officer",
    };
    
    setIncidents(prev => [newIncident, ...prev]);
    setSelectedIncident(newIncident);
    
    toast({
      title: "New Incident Created",
      description: `Incident ${newIncident.id} has been created`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Incident Management</h2>
          <p className="text-muted-foreground">Track and manage security incidents across all locations</p>
        </div>
        <Button onClick={createNewIncident} className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Incident
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Incidents</p>
                <p className="text-2xl font-bold text-destructive">
                  {incidents.filter(i => i.status === "open").length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Investigating</p>
                <p className="text-2xl font-bold text-warning">
                  {incidents.filter(i => i.status === "investigating").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold text-success">
                  {incidents.filter(i => i.status === "resolved").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-destructive">
                  {incidents.filter(i => i.severity === "high").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search incidents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Incidents List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents ({filteredIncidents.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredIncidents.map((incident) => {
                  const StatusIcon = getStatusIcon(incident.status);
                  return (
                    <div
                      key={incident.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedIncident?.id === incident.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedIncident(incident)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <StatusIcon className="w-4 h-4" />
                            <span className="font-semibold">{incident.id}</span>
                            <Badge className={getSeverityColor(incident.severity)}>
                              {incident.severity.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(incident.status)}>
                              {incident.status.toUpperCase()}
                            </Badge>
                          </div>
                          <h4 className="font-medium mb-1">{incident.type}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {incident.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {incident.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {incident.reporter}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedIncident(incident);
                            }}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Incident Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Incident Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedIncident ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedIncident.id}</h3>
                    <p className="text-muted-foreground">{selectedIncident.type}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <div className="flex gap-2 mt-1">
                        <Button
                          size="sm"
                          variant={selectedIncident.status === "open" ? "default" : "outline"}
                          onClick={() => updateIncidentStatus(selectedIncident.id, "open")}
                        >
                          Open
                        </Button>
                        <Button
                          size="sm"
                          variant={selectedIncident.status === "investigating" ? "default" : "outline"}
                          onClick={() => updateIncidentStatus(selectedIncident.id, "investigating")}
                        >
                          Investigating
                        </Button>
                        <Button
                          size="sm"
                          variant={selectedIncident.status === "resolved" ? "default" : "outline"}
                          onClick={() => updateIncidentStatus(selectedIncident.id, "resolved")}
                        >
                          Resolved
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedIncident.description}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Location</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedIncident.location}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Time</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedIncident.time}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Reporter</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedIncident.reporter}</p>
                    </div>

                    {selectedIncident.assignedTo && (
                      <div>
                        <label className="text-sm font-medium">Assigned To</label>
                        <p className="text-sm text-muted-foreground mt-1">{selectedIncident.assignedTo}</p>
                      </div>
                    )}

                    {selectedIncident.cameraId && (
                      <div>
                        <Button className="w-full" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Camera Feed ({selectedIncident.cameraId})
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Select an incident to view details</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IncidentManagement;