import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import { Link } from "react-router-dom";
import { mockServices, getAllCategories } from "@/lib/mockData";
import {
  Wrench,
  Zap,
  Wind,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
} from "lucide-react";

const featuredServices = mockServices.slice(0, 6);
const categories = getAllCategories();

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Your Home{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    Care
                  </span>{" "}
                  Solution
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                  Book trusted professionals for all your home service needs.
                  From plumbing to painting, we've got you covered 24/7.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/services">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
                  >
                    Browse Services
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm text-foreground">
                    Verified & Trusted Professionals
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm text-foreground">
                    Quick Booking & Instant Confirmation
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm text-foreground">
                    24/7 Customer Support
                  </span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-md h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl blur-3xl"></div>
                <div className="relative grid grid-cols-2 gap-4 h-full p-8">
                  <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                    <Wrench className="w-16 h-16 text-primary" />
                  </div>
                  <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center">
                    <Zap className="w-16 h-16 text-secondary" />
                  </div>
                  <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                    <Wind className="w-16 h-16 text-primary" />
                  </div>
                  <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-secondary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                32+
              </div>
              <p className="text-muted-foreground">Home Services</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                5000+
              </div>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                24/7
              </div>
              <p className="text-muted-foreground">Available Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from a wide range of home services offered by our vetted
              professionals
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category) => (
              <Link key={category} to={`/services?category=${category}`}>
                <div className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary hover:shadow-md transition-all cursor-pointer">
                  <h3 className="font-semibold text-foreground text-sm md:text-base">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Our top-rated services trusted by thousands of homeowners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose HomeServe?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make home service booking simple, safe, and reliable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">
                Verified Professionals
              </h3>
              <p className="text-muted-foreground">
                All service providers are thoroughly vetted, background-checked,
                and highly rated by our community.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <Clock className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">
                Fast & Easy Booking
              </h3>
              <p className="text-muted-foreground">
                Book a service in minutes. Choose your preferred date, time, and
                get instant confirmation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <Sparkles className="w-12 h-12 text-success mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">
                Quality Guaranteed
              </h3>
              <p className="text-muted-foreground">
                Unsatisfied with the service? We offer satisfaction guarantee
                and full customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Your Home Fixed?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust HomeServe for their
            home service needs.
          </p>
          <Link to="/services">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Browse Services Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
