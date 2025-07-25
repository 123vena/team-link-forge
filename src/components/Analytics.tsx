import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Shield, AlertTriangle, Calendar, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const alertData = [
    { name: "Mon", alerts: 24 },
    { name: "Tue", alerts: 13 },
    { name: "Wed", alerts: 28 },
    { name: "Thu", alerts: 19 },
    { name: "Fri", alerts: 35 },
    { name: "Sat", alerts: 8 },
    { name: "Sun", alerts: 12 }
  ];

  const incidentTypes = [
    { name: "Unauthorized Access", value: 45, color: "#ef4444" },
    { name: "Suspicious Activity", value: 30, color: "#f97316" },
    { name: "Equipment Issues", value: 15, color: "#eab308" },
    { name: "Other", value: 10, color: "#06b6d4" }
  ];

  const trafficData = [
    { hour: "00:00", count: 12 },
    { hour: "04:00", count: 8 },
    { hour: "08:00", count: 45 },
    { hour: "12:00", count: 78 },
    { hour: "16:00", count: 65 },
    { hour: "20:00", count: 32 }
  ];

  const handleExport = (type: string) => {
    toast({
      title: "Export Started",
      description: `Generating ${type} report...`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Security Analytics</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("PDF")}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport("CSV")}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">139</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Cameras</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48/52</div>
                <p className="text-xs text-muted-foreground">
                  92% operational
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4m</div>
                <p className="text-xs text-muted-foreground">
                  -8% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +2 new this week
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Alert Trends</CardTitle>
              <CardDescription>Security alerts over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertData.map((day, index) => (
                  <div key={day.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{day.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(day.alerts / 35) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm w-8">{day.alerts}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Incident Distribution</CardTitle>
                <CardDescription>Types of security incidents this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incidentTypes.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${item.value}%`,
                              backgroundColor: item.color 
                            }}
                          />
                        </div>
                        <Badge variant="secondary">{item.value}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Critical Incidents</CardTitle>
                <CardDescription>High priority security events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: "Unauthorized Access", location: "Main Entrance", time: "2 hours ago", severity: "High" },
                  { type: "Suspicious Activity", location: "Parking Lot A", time: "4 hours ago", severity: "Medium" },
                  { type: "Equipment Malfunction", location: "Camera 12", time: "6 hours ago", severity: "Low" }
                ].map((incident, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{incident.type}</p>
                      <p className="text-sm text-muted-foreground">{incident.location} • {incident.time}</p>
                    </div>
                    <Badge variant={
                      incident.severity === "High" ? "destructive" : 
                      incident.severity === "Medium" ? "default" : "secondary"
                    }>
                      {incident.severity}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Traffic Patterns</CardTitle>
              <CardDescription>People count throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficData.map((time, index) => (
                  <div key={time.hour} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{time.hour}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-3">
                        <div 
                          className="bg-primary h-3 rounded-full" 
                          style={{ width: `${(time.count / 80) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm w-8">{time.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Current system health metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>CPU Usage</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span>Memory Usage</span>
                  <span className="font-medium">72%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "72%" }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span>Storage Usage</span>
                  <span className="font-medium">34%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "34%" }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network Status</CardTitle>
                <CardDescription>Camera connectivity status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Main Building", status: "Online", cameras: "12/12" },
                  { name: "Parking Area", status: "Online", cameras: "8/8" },
                  { name: "Warehouse", status: "Partial", cameras: "15/16" },
                  { name: "Perimeter", status: "Online", cameras: "20/20" }
                ].map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{location.name}</p>
                      <p className="text-sm text-muted-foreground">{location.cameras} cameras</p>
                    </div>
                    <Badge variant={location.status === "Online" ? "default" : "secondary"}>
                      {location.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;