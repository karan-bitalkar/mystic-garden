import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function Admin() {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage services, bookings, and platform operations
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Stats Cards */}
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Services</p>
              <p className="text-3xl font-bold text-primary">32</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Bookings</p>
              <p className="text-3xl font-bold text-primary">156</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Active Users</p>
              <p className="text-3xl font-bold text-primary">2,345</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
              <p className="text-3xl font-bold text-primary">$45,670</p>
            </Card>
          </div>

          {/* Admin Panels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Services Management */}
            <Card className="p-8 text-center">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Services Management
              </h2>
              <p className="text-muted-foreground mb-6">
                Add, edit, or delete home services from the platform
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                Manage Services
              </Button>
            </Card>

            {/* Bookings Management */}
            <Card className="p-8 text-center">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Bookings Management
              </h2>
              <p className="text-muted-foreground mb-6">
                View and update booking statuses from pending to completed
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                Manage Bookings
              </Button>
            </Card>

            {/* Users Management */}
            <Card className="p-8 text-center">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Users Management
              </h2>
              <p className="text-muted-foreground mb-6">
                View user profiles, manage accounts, and handle support tickets
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                Manage Users
              </Button>
            </Card>

            {/* Reports & Analytics */}
            <Card className="p-8 text-center">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Reports & Analytics
              </h2>
              <p className="text-muted-foreground mb-6">
                View sales reports, user analytics, and platform performance
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                View Reports
              </Button>
            </Card>
          </div>

          {/* Coming Soon Notice */}
          <Card className="mt-8 p-6 bg-blue-50 border border-blue-200 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Admin Panel Features Coming Soon
              </h3>
              <p className="text-sm text-blue-800 mb-4">
                The admin dashboard is currently a placeholder. Full admin
                functionality including service management, booking controls,
                user administration, and analytics will be available soon.
              </p>
              <Link to="/">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Back to Home
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
