import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Package, Search, Plus, Filter, AlertTriangle } from "lucide-react";

const Inventory = () => {
  // Sample inventory data
  const inventoryItems = [
    { id: 1, name: "Organic Apples", category: "Produce", stock: 150, minStock: 50, price: 3.99, status: "In Stock" },
    { id: 2, name: "Whole Wheat Bread", category: "Bakery", stock: 25, minStock: 30, price: 2.49, status: "Low Stock" },
    { id: 3, name: "Fresh Milk 1L", category: "Dairy", stock: 85, minStock: 40, price: 1.89, status: "In Stock" },
    { id: 4, name: "Ground Coffee", category: "Beverages", stock: 8, minStock: 15, price: 12.99, status: "Low Stock" },
    { id: 5, name: "Chicken Breast", category: "Meat", stock: 0, minStock: 20, price: 8.99, status: "Out of Stock" },
    { id: 6, name: "Bananas", category: "Produce", stock: 200, minStock: 75, price: 1.29, status: "In Stock" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-success/10 text-success border-success/20";
      case "Low Stock":
        return "bg-accent/10 text-accent border-accent/20";
      case "Out of Stock":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const stats = [
    { title: "Total Products", value: "1,247", icon: Package },
    { title: "Low Stock Items", value: "23", icon: AlertTriangle },
    { title: "Categories", value: "12", icon: Filter },
    { title: "Total Value", value: "$45,670", icon: Package },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
            <p className="text-muted-foreground">Manage your product stock and inventory levels</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stock</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Min Stock</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item) => (
                    <tr key={item.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{item.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{item.category}</td>
                      <td className="py-3 px-4">{item.stock}</td>
                      <td className="py-3 px-4 text-muted-foreground">{item.minStock}</td>
                      <td className="py-3 px-4">${item.price}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Restock</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;