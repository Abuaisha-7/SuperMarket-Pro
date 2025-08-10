import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Package, BarChart3, Users, TrendingUp } from "lucide-react";
import heroImage from "@/assets/supermarket-hero.jpg";

const Home = () => {
  const features = [
    {
      icon: Package,
      title: "Inventory Management",
      description: "Track your products, stock levels, and manage suppliers efficiently.",
    },
    {
      icon: BarChart3,
      title: "Sales Analytics",
      description: "Monitor sales performance with detailed reports and insights.",
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Manage your staff and assign roles with precision.",
    },
    {
      icon: TrendingUp,
      title: "Growth Tracking",
      description: "Track your business growth and identify opportunities.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96  bg-gradient-to-r from-primary to-primary-glow overflow-hidden">
        <div 
          className="absolute  inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.4)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              SuperMarket Pro
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Complete inventory management system for modern supermarkets. 
              Streamline your operations and boost efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/80 ">
                <Link to="/inventory">View Inventory</Link>
              </Button>
              <Button asChild size="lg"  className="bg-white text-primary hover:bg-white/80 hover:text-primary ">
                <Link to="/sales">View Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Manage Your Store
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to run a successful supermarket operation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of supermarket owners who trust SuperMarket Pro for their inventory management.
          </p>
          <Button asChild size="lg">
            <Link to="/login">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
