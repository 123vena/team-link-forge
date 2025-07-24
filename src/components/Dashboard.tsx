import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Camera, 
  AlertTriangle, 
  TrendingUp, 
  Eye, 
  Search, 
  Filter, 
  FileText,
  DollarSign,
  Users,
  Activity,
  Zap,
  Play,
  MoreVertical,
  MapPin,
  Clock
} from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

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

  // Chart data
  const securityTrendData = [
    { name: "Mon", incidents: 12, resolved: 8, revenue: 15420 },
    { name: "Tue", incidents: 19, resolved: 15, revenue: 18230 },
    { name: "Wed", incidents: 8, resolved: 6, revenue: 22100 },
    { name: "Thu", incidents: 15, resolved: 12, revenue: 19800 },
    { name: "Fri", incidents: 25, resolved: 20, revenue: 25600 },
    { name: "Sat", incidents: 30, resolved: 28, revenue: 28900 },
    { name: "Sun", incidents: 18, resolved: 16, revenue: 21400 }
  ];

  const incidentTypeData = [
    { name: "Shoplifting", value: 45, color: "#ef4444" },
    { name: "Unauthorized Access", value: 25, color: "#f97316" },
    { name: "Equipment Issues", value: 15, color: "#eab308" },
    { name: "Safety Incidents", value: 10, color: "#22c55e" },
    { name: "Other", value: 5, color: "#6b7280" }
  ];

  const revenueProtectionData = [
    { name: "Jan", prevented: 12500, potential: 18000 },
    { name: "Feb", prevented: 15200, potential: 22000 },
    { name: "Mar", prevented: 18900, potential: 25500 },
    { name: "Apr", prevented: 22100, potential: 28900 },
    { name: "May", prevented: 19800, potential: 24200 },
    { name: "Jun", prevented: 25600, potential: 31200 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const handleRefreshData = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
    toast({
      title: "Data Refreshed",
      description: "Dashboard data has been updated with the latest information.",
    });
  };

  const generateReport = () => {
    toast({
      title: "Report Generated",
      description: "Security report has been generated and will be emailed shortly.",
    });
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
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Search className="w-4 h-4" />
              Search
            </Button>
            <Button 
              variant="outline" 
              className="gap-2" 
              onClick={handleRefreshData}
              disabled={refreshing}
            >
              <Activity className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "Refreshing..." : "Refresh"}
            </Button>
            <Button className="gap-2 bg-gradient-primary" onClick={generateReport}>
              <FileText className="w-4 h-4" />
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
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="pos">POS Data</TabsTrigger>
                <TabsTrigger value="ai">AI Insights</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Trend Analysis</CardTitle>
                      <CardDescription>Weekly incident and resolution tracking</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] p-4 bg-gradient-to-br from-primary/5 to-success/5 rounded-lg border flex items-center justify-center">
                        <div className="text-center">
                          <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                          <h4 className="font-semibold mb-2">Security Trend Analysis</h4>
                          <div className="flex gap-6 text-sm">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                                <span>Incidents: 137</span>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-success rounded-full"></div>
                                <span>Resolved: 110</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Incident Distribution</CardTitle>
                      <CardDescription>Security incidents by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] p-4 bg-gradient-to-br from-warning/5 to-destructive/5 rounded-lg border">
                        <div className="space-y-3">
                          {incidentTypeData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="text-sm">{item.name}</span>
                              </div>
                              <span className="text-sm font-medium">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Protection Impact</CardTitle>
                    <CardDescription>Loss prevention and security ROI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] p-4 bg-gradient-to-br from-success/5 to-primary/5 rounded-lg border">
                      <div className="grid grid-cols-2 gap-6 h-full">
                        <div className="flex flex-col justify-center">
                          <h4 className="font-semibold mb-4 text-success">Losses Prevented</h4>
                          <div className="text-3xl font-bold text-success mb-2">$125.6K</div>
                          <p className="text-sm text-muted-foreground">This month</p>
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-semibold mb-4 text-destructive">Potential Losses</h4>
                          <div className="text-3xl font-bold text-destructive mb-2">$312K</div>
                          <p className="text-sm text-muted-foreground">Detected threats</p>
                        </div>
                        <div className="col-span-2 pt-4 border-t">
                          <div className="flex justify-between text-sm">
                            <span>ROI: 4.2x return on security investment</span>
                            <Badge className="bg-success text-success-foreground">+18% vs last month</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="pos">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Transaction Monitoring</CardTitle>
                      <CardDescription>Real-time POS security analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Suspicious Transactions</span>
                          <Badge variant="destructive">3</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Voided Transactions</span>
                          <Badge variant="secondary">12</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Refund Anomalies</span>
                          <Badge className="bg-warning text-warning-foreground">2</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Cash Handling Issues</span>
                          <Badge className="bg-success text-success-foreground">0</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Analytics</CardTitle>
                      <CardDescription>Sales performance and security correlation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] p-4 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-lg border flex items-center justify-center">
                        <div className="text-center">
                          <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                          <div className="text-2xl font-bold text-primary mb-2">$1.2M</div>
                          <p className="text-sm text-muted-foreground">Weekly Revenue</p>
                          <div className="mt-4 flex items-center justify-center gap-2">
                            <TrendingUp className="w-4 h-4 text-success" />
                            <span className="text-sm text-success">+12% vs last week</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="ai">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-primary" />
                          AI Detection Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-primary">94.2%</div>
                        <p className="text-sm text-muted-foreground">Accuracy this week</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Eye className="w-5 h-5 text-success" />
                          Behavioral Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-success">127</div>
                        <p className="text-sm text-muted-foreground">Anomalies detected</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-warning" />
                          Predictive Alerts
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-warning">8</div>
                        <p className="text-sm text-muted-foreground">Risk predictions</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Insights Summary</CardTitle>
                      <CardDescription>Machine learning analysis and recommendations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">High Traffic Pattern Detected</h4>
                          <p className="text-sm text-muted-foreground">Unusual customer density in electronics section between 2-4 PM. Recommend additional monitoring.</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Theft Risk Assessment</h4>
                          <p className="text-sm text-muted-foreground">Increased risk factors identified in Store 2. Deploy additional security measures during peak hours.</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Staff Behavior Analysis</h4>
                          <p className="text-sm text-muted-foreground">All staff compliance scores within normal ranges. No anomalies detected in cash handling procedures.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="reports">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Reports</CardTitle>
                      <CardDescription>Generate custom security reports</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start" onClick={generateReport}>
                          <FileText className="w-4 h-4 mr-2" />
                          Daily Security Summary
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={generateReport}>
                          <FileText className="w-4 h-4 mr-2" />
                          Weekly Incident Report
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={generateReport}>
                          <FileText className="w-4 h-4 mr-2" />
                          Monthly Analytics
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={generateReport}>
                          <FileText className="w-4 h-4 mr-2" />
                          Compliance Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Reports</CardTitle>
                      <CardDescription>Previously generated reports</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">Security Summary - Jan 15</p>
                            <p className="text-xs text-muted-foreground">Generated 2 hours ago</p>
                          </div>
                          <Button size="sm" variant="ghost">Download</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">Weekly Report - Week 2</p>
                            <p className="text-xs text-muted-foreground">Generated yesterday</p>
                          </div>
                          <Button size="sm" variant="ghost">Download</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">Compliance Audit - Q4</p>
                            <p className="text-xs text-muted-foreground">Generated 3 days ago</p>
                          </div>
                          <Button size="sm" variant="ghost">Download</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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