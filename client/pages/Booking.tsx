import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { mockServices, getServiceById } from "@/lib/mockData";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Star,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function Booking() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const service = serviceId ? getServiceById(serviceId) : null;
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    address: "",
    phone: "",
    paymentMethod: "online" as "online" | "cash",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Service not found
            </h1>
            <p className="text-muted-foreground mb-6">
              The service you're looking for doesn't exist
            </p>
            <Link to="/services">
              <Button className="bg-primary hover:bg-primary/90">
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.date || !formData.time || !formData.address || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!user?.id || !service) {
      toast({
        title: "Error",
        description: "Unable to create booking. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Create booking object
      const newBooking = {
        id: `booking_${Date.now()}`,
        userId: user.id,
        serviceId: service.id,
        serviceName: service.name,
        date: formData.date,
        time: formData.time,
        address: formData.address,
        phone: formData.phone,
        price: service.price,
        paymentMethod: formData.paymentMethod,
        status: "pending" as const,
        createdAt: new Date().toISOString(),
      };

      // Save booking to localStorage (in production, save to backend)
      const userBookingsKey = `bookings_${user.id}`;
      const existingBookings = localStorage.getItem(userBookingsKey) || "[]";
      const bookings = JSON.parse(existingBookings);
      bookings.push(newBooking);
      localStorage.setItem(userBookingsKey, JSON.stringify(bookings));

      setIsSubmitting(false);
      toast({
        title: "Booking Confirmed!",
        description: "Your booking has been confirmed. Check your bookings page for details.",
      });
      navigate("/bookings");
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Link
            to="/services"
            className="text-primary hover:text-primary/90 transition-colors mb-6 inline-block"
          >
            ← Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service Image */}
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden h-64 md:h-80">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1581092918692-8d1d08394400?w=600&h=400&fit=crop";
                  }}
                />
              </div>

              {/* Service Info */}
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {service.name}
                    </h1>
                    <p className="text-secondary font-semibold">
                      {service.category}
                    </p>
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="text-lg font-bold text-foreground">
                      {service.rating}
                    </span>
                    <span className="text-muted-foreground">
                      ({service.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-foreground mb-8 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-semibold text-foreground">
                        {service.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-4">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Satisfaction
                      </p>
                      <p className="font-semibold text-foreground">
                        100% Guaranteed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <Card className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Book This Service
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Date */}
                  <div>
                    <Label htmlFor="date" className="text-foreground font-semibold">
                      Preferred Date *
                    </Label>
                    <Input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <Label htmlFor="time" className="text-foreground font-semibold">
                      Preferred Time *
                    </Label>
                    <Input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <Label
                      htmlFor="address"
                      className="text-foreground font-semibold"
                    >
                      Service Address *
                    </Label>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="123 Main Street, City, State"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-foreground font-semibold">
                      Phone Number *
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="(123) 456-7890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <Label className="text-foreground font-semibold block mb-3">
                      Payment Method *
                    </Label>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        style={{borderColor: formData.paymentMethod === 'online' ? 'var(--primary)' : ''}}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          checked={formData.paymentMethod === "online"}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div>
                          <p className="font-semibold text-foreground">
                            Pay Online
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Secure payment now
                          </p>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        style={{borderColor: formData.paymentMethod === 'cash' ? 'var(--primary)' : ''}}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === "cash"}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div>
                          <p className="font-semibold text-foreground">
                            Pay on Service
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Pay after service is completed
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-900">
                      By booking, you agree to our terms of service and confirm
                      that the service address is accessible.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Booking..." : "Confirm Booking"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Booking Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Service Price</span>
                      <span className="font-semibold text-foreground">
                        ${service.price}
                      </span>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-foreground">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          ${service.price}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formData.paymentMethod === "online"
                          ? "Payment will be processed immediately"
                          : "Payment due after service completion"}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Benefits Card */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    What's Included
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">
                        Verified Professional
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">
                        Quality Guarantee
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">
                        Customer Support
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">
                        Safe & Secure
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
