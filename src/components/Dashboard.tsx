import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Camera, 
  AlertTriangle, 
  TrendingUp, 
  Eye, 
  Play, 
  Search,
  Filter,
  MoreVertical,
  MapPin,
  Clock,
  DollarSign
} from "lucide-react";

const Dashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState("all");

  const securityMetrics = [
    {
      title: "Active Cameras",
      value: "127",
      change: "+2.5%",
      icon: Camera,
      color: "text-primary"
    },
    {
      title: "Incidents Today",
      value: "8",
      change: "-12%",
      icon: AlertTriangle,
      color: "text-warning"
    },
    {
      title: "Revenue Protected",
      value: "$45.2K",
      change: "+8.1%",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "AI Detections",
      value: "342",
      change: "+15%",
      icon: Eye,
      color: "text-primary"
    }
  ];

  const recentIncidents = [
    {
      id: "INC-001",
      type: "Theft Detected",
      location: "Store #12 - Downtown",
      time: "2 mins ago",
      severity: "high",
      status: "investigating"
    },
    {
      id: "INC-002", 
      type: "POS Mismatch",
      location: "Store #8 - Mall",
      time: "15 mins ago",
      severity: "medium",
      status: "resolved"
    },
    {
      id: "INC-003",
      type: "Unusual Activity",
      location: "Store #3 - Airport",
      time: "1 hour ago",
      severity: "low",
      status: "monitoring"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-gradient-danger text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Security Operations Center</h1>
            <p className="text-muted-foreground mt-1">Real-time monitoring and incident management</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button className="bg-gradient-primary shadow-primary">
              <Shield className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityMetrics.map((metric, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-glass border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className={`text-sm ${metric.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                      {metric.change} from last week
                    </p>
                  </div>
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Video Feed */}
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur-glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Live Camera Feeds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="relative group">
                    <div className="aspect-video bg-muted rounded-lg border border-border/50 flex items-center justify-center hover:border-primary/50 transition-colors">
                      <div className="text-center">
                        <Play className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Camera {i + 1}</p>
                        <Badge variant="outline" className="mt-1">
                          <div className="w-2 h-2 bg-success rounded-full mr-1" />
                          Live
                        </Badge>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card className="bg-card/50 backdrop-blur-glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Recent Incidents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">{incident.type}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {incident.location}
                      </p>
                    </div>
                    <Badge className={getSeverityColor(incident.severity)} variant="secondary">
                      {incident.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {incident.time}
                    </span>
                    <span className="capitalize">{incident.status}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Card className="bg-card/50 backdrop-blur-glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Security Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">POS Data</TabsTrigger>
                <TabsTrigger value="ai">AI Insights</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                    <h3 className="font-medium mb-4">Security Score Trend</h3>
                    <div className="h-32 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-lg flex items-end justify-center">
                      <span className="text-sm text-muted-foreground mb-4">Chart visualization would go here</span>
                    </div>
                  </div>
                  <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                    <h3 className="font-medium mb-4">Incident Distribution</h3>
                    <div className="h-32 bg-gradient-to-r from-warning/20 to-destructive/20 rounded-lg flex items-end justify-center">
                      <span className="text-sm text-muted-foreground mb-4">Chart visualization would go here</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="transactions" className="mt-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">POS transaction analysis and video correlation</p>
                </div>
              </TabsContent>
              
              <TabsContent value="ai" className="mt-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">AI-powered security insights and predictions</p>
                </div>
              </TabsContent>
              
              <TabsContent value="reports" className="mt-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Generate and view security reports</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;