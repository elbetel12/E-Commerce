import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart } from "lucide-react";

const metrics = [
  { title: "Revenue", value: "$45,231", change: "+20.1%", trend: "up", icon: DollarSign },
  { title: "Sales", value: "2,350", change: "+12.5%", trend: "up", icon: ShoppingCart },
  { title: "Conversion", value: "3.24%", change: "-2.1%", trend: "down", icon: TrendingDown },
  { title: "Avg Order", value: "$98.50", change: "+5.3%", trend: "up", icon: TrendingUp },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track your store performance metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p
                className={`text-xs ${
                  metric.trend === "up" ? "text-success" : "text-destructive"
                }`}
              >
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart visualization would go here
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Wireless Headphones", "Smart Watch", "Laptop Bag", "USB-C Cable", "Mechanical Keyboard"].map(
                (product, index) => (
                  <div key={product} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">#{index + 1}</span>
                      <span className="text-sm font-medium">{product}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 500 + 100)} sales</span>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
