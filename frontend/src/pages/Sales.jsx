import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, ShoppingBag, Users, Download, Calendar } from "lucide-react";

const Sales = () => {
  // Sample sales data
  const salesData = [
    { id: 1, date: "2024-01-15", customer: "John Doe", items: 5, total: 45.67, status: "Completed" },
    { id: 2, date: "2024-01-15", customer: "Jane Smith", items: 12, total: 123.45, status: "Completed" },
    { id: 3, date: "2024-01-15", customer: "Bob Wilson", items: 3, total: 28.90, status: "Pending" },
    { id: 4, date: "2024-01-14", customer: "Alice Brown", items: 8, total: 89.23, status: "Completed" },
    { id: 5, date: "2024-01-14", customer: "Charlie Davis", items: 15, total: 156.78, status: "Completed" },
    { id: 6, date: "2024-01-14", customer: "Emma Johnson", items: 6, total: 67.34, status: "Refunded" },
  ];

  const topProducts = [
    { name: "Organic Apples", sold: 245, revenue: 980.05 },
    { name: "Fresh Milk 1L", sold: 189, revenue: 357.21 },
    { name: "Whole Wheat Bread", sold: 156, revenue: 388.44 },
    { name: "Bananas", sold: 234, revenue: 301.86 },
    { name: "Ground Coffee", sold: 89, revenue: 1155.11 },
  ];

  const salesStats = [
    { title: "Today's Sales", value: "$1,234.56", change: "+12.3%", icon: DollarSign },
    { title: "Transactions", value: "89", change: "+5.2%", icon: ShoppingBag },
    { title: "Avg. Order Value", value: "$13.87", change: "+2.1%", icon: TrendingUp },
    { title: "Customers", value: "67", change: "+8.4%", icon: Users },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-success/10 text-success border-success/20";
      case "Pending":
        return "bg-accent/10 text-accent border-accent/20";
      case "Refunded":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sales Dashboard</h1>
            <p className="text-muted-foreground">Monitor your sales performance and analytics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Sales Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {salesStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-success">{stat.change}</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Sales */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Items</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Total</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesData.map((sale) => (
                        <tr key={sale.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4 text-muted-foreground">{sale.date}</td>
                          <td className="py-3 px-4 font-medium">{sale.customer}</td>
                          <td className="py-3 px-4">{sale.items}</td>
                          <td className="py-3 px-4 font-medium">${sale.total}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(sale.status)}>
                              {sale.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.sold} units sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">${product.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sales Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Sales chart visualization would go here</p>
                <p className="text-sm text-muted-foreground">Integration with chart library like Recharts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sales;