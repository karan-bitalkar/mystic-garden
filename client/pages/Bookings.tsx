// import Layout from "@/components/Layout";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { getServiceById } from "@/lib/mockData";
// import { Link } from "react-router-dom";
// import { Calendar, Clock, MapPin, Trash2, Edit2, CheckCircle, Clock as ClockIcon } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import { Input } from "@/components/ui/input";  // 
// import { Label } from "@/components/ui/label";  

// interface Booking {
//   id: string;
//   userId: string;
//   serviceId: string;
//   serviceName: string;
//   date: string;
//   time: string;
//   address: string;
//   status: "pending" | "confirmed" | "completed" | "cancelled";
//   price: number;
//   paymentMethod: "online" | "cash";
//   createdAt: string;
// }

// export default function Bookings() {
//   const { user } = useAuth();
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch user's bookings on mount
//   useEffect(() => {
//     const loadBookings = () => {
//       // Simulate API call to fetch bookings for current user
//       const userBookings = localStorage.getItem(`bookings_${user?.id}`) || "[]";
//       try {
//         setBookings(JSON.parse(userBookings));
//       } catch (error) {
//         console.error("Failed to load bookings:", error);
//       }
//       setIsLoading(false);
//     };

//     if (user?.id) {
//       loadBookings();
//     }
//   }, [user?.id]);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "bg-success/10 text-success border-success/20";
//       case "confirmed":
//         return "bg-primary/10 text-primary border-primary/20";
//       case "pending":
//         return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
//       case "cancelled":
//         return "bg-red-500/10 text-red-600 border-red-500/20";
//       default:
//         return "bg-muted text-muted-foreground";
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircle className="w-4 h-4" />;
//       case "confirmed":
//         return <CheckCircle className="w-4 h-4" />;
//       case "pending":
//         return <ClockIcon className="w-4 h-4" />;
//       default:
//         return null;
//     }
//   };

//   const handleCancelBooking = (id: string) => {
//     if (!user?.id) return;

//     const updatedBookings = bookings.map((booking) =>
//       booking.id === id ? { ...booking, status: "cancelled" as const } : booking
//     );
//     setBookings(updatedBookings);

//     // Save to localStorage
//     localStorage.setItem(`bookings_${user.id}`, JSON.stringify(updatedBookings));
//   };

//   const activeBookings = bookings.filter(
//     (b) => b.status === "pending" || b.status === "confirmed"
//   );
//   const pastBookings = bookings.filter(
//     (b) => b.status === "completed" || b.status === "cancelled"
//   );

//   return (
//     <Layout>
//       <div className="min-h-screen bg-background">
//         {/* Page Header */}
//         <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-8 md:py-12">
//           <div className="container mx-auto px-4">
//             <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
//               My Bookings
//             </h1>
//             <p className="text-muted-foreground">
//               Manage and track all your service bookings
//             </p>
//           </div>
//         </section>

//         <div className="container mx-auto px-4 py-8 md:py-12">
//           {isLoading ? (
//             <Card className="text-center py-16">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
//               <p className="text-muted-foreground">Loading your bookings...</p>
//             </Card>
//           ) : bookings.length === 0 ? (
//             <Card className="text-center py-16">
//               <h2 className="text-2xl font-bold text-foreground mb-4">
//                 No bookings yet
//               </h2>
//               <p className="text-muted-foreground mb-6">
//                 Start booking services to see them here
//               </p>
//               <Link to="/services">
//                 <Button className="bg-primary hover:bg-primary/90">
//                   Browse Services
//                 </Button>
//               </Link>
//             </Card>
//           ) : (
//             <div className="space-y-12">
//               {/* Active Bookings */}
//               {activeBookings.length > 0 && (
//                 <div>
//                   <h2 className="text-2xl font-bold text-foreground mb-6">
//                     Upcoming Bookings
//                   </h2>
//                   <div className="space-y-4">
//                     {activeBookings.map((booking) => (
//                       <Card
//                         key={booking.id}
//                         className="p-6 border-l-4 border-l-primary hover:shadow-md transition-shadow"
//                       >
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                           {/* Service Info */}
//                           <div className="md:col-span-2">
//                             <h3 className="text-lg font-bold text-foreground mb-4">
//                               {booking.serviceName}
//                             </h3>
//                             <div className="space-y-3">
//                               <div className="flex items-center gap-3 text-sm">
//                                 <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//                                 <span className="text-foreground">
//                                   {new Date(booking.date).toLocaleDateString(
//                                     "en-US",
//                                     {
//                                       month: "long",
//                                       day: "numeric",
//                                       year: "numeric",
//                                     }
//                                   )}
//                                 </span>
//                               </div>
//                               <div className="flex items-center gap-3 text-sm">
//                                 <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//                                 <span className="text-foreground">
//                                   {booking.time}
//                                 </span>
//                               </div>
//                               <div className="flex items-center gap-3 text-sm">
//                                 <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//                                 <span className="text-foreground">
//                                   {booking.address}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Status & Price */}
//                           <div className="md:col-span-1">
//                             <p className="text-xs text-muted-foreground mb-2 uppercase font-semibold">
//                               Status
//                             </p>
//                             <div
//                               className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}
//                             >
//                               {getStatusIcon(booking.status)}
//                               {booking.status.charAt(0).toUpperCase() +
//                                 booking.status.slice(1)}
//                             </div>
//                             <p className="text-xs text-muted-foreground mt-4 uppercase font-semibold">
//                               Amount
//                             </p>
//                             <p className="text-2xl font-bold text-primary">
//                               ${booking.price}
//                             </p>
//                           </div>

//                           {/* Actions */}
//                           <div className="md:col-span-1 flex flex-col gap-3 justify-end">
//                             <Button variant="outline" className="gap-2">
//                               <Edit2 className="w-4 h-4" />
//                               Reschedule
//                             </Button>
//                             <Button
//                               variant="outline"
//                               className="gap-2 text-destructive hover:text-destructive"
//                               onClick={() => handleCancelBooking(booking.id)}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Cancel
//                             </Button>
//                           </div>
//                         </div>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Past Bookings */}
//               {pastBookings.length > 0 && (
//                 <div>
//                   <h2 className="text-2xl font-bold text-foreground mb-6">
//                     Past Bookings
//                   </h2>
//                   <div className="space-y-4">
//                     {pastBookings.map((booking) => (
//                       <Card
//                         key={booking.id}
//                         className={`p-6 border-l-4 ${
//                           booking.status === "completed"
//                             ? "border-l-success"
//                             : "border-l-destructive"
//                         } opacity-75`}
//                       >
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                           {/* Service Info */}
//                           <div className="md:col-span-2">
//                             <h3 className="text-lg font-bold text-foreground mb-4">
//                               {booking.serviceName}
//                             </h3>
//                             <div className="space-y-3">
//                               <div className="flex items-center gap-3 text-sm">
//                                 <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//                                 <span className="text-foreground">
//                                   {new Date(booking.date).toLocaleDateString(
//                                     "en-US",
//                                     {
//                                       month: "long",
//                                       day: "numeric",
//                                       year: "numeric",
//                                     }
//                                   )}
//                                 </span>
//                               </div>
//                               <div className="flex items-center gap-3 text-sm">
//                                 <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//                                 <span className="text-foreground">
//                                   {booking.time}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Status & Price */}
//                           <div className="md:col-span-1">
//                             <p className="text-xs text-muted-foreground mb-2 uppercase font-semibold">
//                               Status
//                             </p>
//                             <div
//                               className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}
//                             >
//                               {getStatusIcon(booking.status)}
//                               {booking.status.charAt(0).toUpperCase() +
//                                 booking.status.slice(1)}
//                             </div>
//                             <p className="text-xs text-muted-foreground mt-4 uppercase font-semibold">
//                               Amount
//                             </p>
//                             <p className="text-2xl font-bold text-foreground">
//                               ${booking.price}
//                             </p>
//                           </div>

//                           {/* Actions */}
//                           <div className="md:col-span-1 flex flex-col gap-3 justify-end">
//                             {booking.status === "completed" && (
//                               <>
//                                 <Button
//                                   variant="outline"
//                                   className="gap-2"
//                                   onClick={() => {
//                                     // Book same service again
//                                   }}
//                                 >
//                                   Book Again
//                                 </Button>
//                                 <Button 
//                                   variant="outline"
//                                   className="gap-2"
//                                   onClick={() => {
//                                     // Leave review
//                                   }}
//                                 >
//                                   Leave Review
//                                 </Button>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// }



import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServiceById } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Trash2, Edit2, CheckCircle, Clock as ClockIcon, X } from "lucide-react";  // ← X added
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";  // ← नया import
import { Label } from "@/components/ui/label";  // ← नया import

interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  address: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  price: number;
  paymentMethod: "online" | "cash";
  createdAt: string;
}

export default function Bookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ← नया: Reschedule modal states
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleBookingId, setRescheduleBookingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newAddress, setNewAddress] = useState("");

  // Fetch user's bookings on mount
  useEffect(() => {
    const loadBookings = () => {
      const userBookings = localStorage.getItem(`bookings_${user?.id}`) || "[]";
      try {
        setBookings(JSON.parse(userBookings));
      } catch (error) {
        console.error("Failed to load bookings:", error);
      }
      setIsLoading(false);
    };

    if (user?.id) {
      loadBookings();
    }
  }, [user?.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "confirmed":
        return "bg-primary/10 text-primary border-primary/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <ClockIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleCancelBooking = (id: string) => {
    if (!user?.id) return;

    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: "cancelled" as const } : booking
    );
    setBookings(updatedBookings);

    localStorage.setItem(`bookings_${user.id}`, JSON.stringify(updatedBookings));
  };

  // ← नया: Reschedule functions
  const openRescheduleModal = (id: string) => {
    setRescheduleBookingId(id);
    setShowRescheduleModal(true);

    const booking = bookings.find(b => b.id === id);
    if (booking) {
      setNewDate(booking.date);
      setNewTime(booking.time);
      setNewAddress(booking.address);
    }
  };

  const handleReschedule = () => {
    if (!rescheduleBookingId || !newDate || !newTime || !newAddress || !user?.id) return;

    const updatedBookings = bookings.map((booking) =>
      booking.id === rescheduleBookingId
        ? { ...booking, date: newDate, time: newTime, address: newAddress }
        : booking
    );

    setBookings(updatedBookings);
    localStorage.setItem(`bookings_${user.id}`, JSON.stringify(updatedBookings));

    setShowRescheduleModal(false);
    setRescheduleBookingId(null);
    setNewDate("");
    setNewTime("");
    setNewAddress("");
  };

  const closeModal = () => {
    setShowRescheduleModal(false);
    setRescheduleBookingId(null);
    setNewDate("");
    setNewTime("");
    setNewAddress("");
  };

  const activeBookings = bookings.filter(
    (b) => b.status === "pending" || b.status === "confirmed"
  );
  const pastBookings = bookings.filter(
    (b) => b.status === "completed" || b.status === "cancelled"
  );

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              My Bookings
            </h1>
            <p className="text-muted-foreground">
              Manage and track all your service bookings
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 md:py-12">
          {isLoading ? (
            <Card className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your bookings...</p>
            </Card>
          ) : bookings.length === 0 ? (
            <Card className="text-center py-16">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                No bookings yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Start booking services to see them here
              </p>
              <Link to="/services">
                <Button className="bg-primary hover:bg-primary/90">
                  Browse Services
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-12">
              {/* Active Bookings */}
              {activeBookings.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Upcoming Bookings
                  </h2>
                  <div className="space-y-4">
                    {activeBookings.map((booking) => (
                      <Card
                        key={booking.id}
                        className="p-6 border-l-4 border-l-primary hover:shadow-md transition-shadow"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          {/* Service Info */}
                          <div className="md:col-span-2">
                            <h3 className="text-lg font-bold text-foreground mb-4">
                              {booking.serviceName}
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 text-sm">
                                <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                <span className="text-foreground">
                                  {new Date(booking.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-sm">
                                <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                <span className="text-foreground">
                                  {booking.time}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-sm">
                                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                <span className="text-foreground">
                                  {booking.address}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Status & Price */}
                          <div className="md:col-span-1">
                            <p className="text-xs text-muted-foreground mb-2 uppercase font-semibold">
                              Status
                            </p>
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}
                            >
                              {getStatusIcon(booking.status)}
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </div>
                            <p className="text-xs text-muted-foreground mt-4 uppercase font-semibold">
                              Amount
                            </p>
                            <p className="text-2xl font-bold text-primary">
                              ${booking.price}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="md:col-span-1 flex flex-col gap-3 justify-end">
                            <Button
                              variant="outline"
                              className="gap-2"
                              onClick={() => openRescheduleModal(booking.id)}  // ← अब काम करता है
                            >
                              <Edit2 className="w-4 h-4" />
                              Reschedule
                            </Button>
                            <Button
                              variant="outline"
                              className="gap-2 text-destructive hover:text-destructive"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Bookings */}
              {pastBookings.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Past Bookings
                  </h2>
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <Card
                        key={booking.id}
                        className={`p-6 border-l-4 ${
                          booking.status === "completed"
                            ? "border-l-success"
                            : "border-l-destructive"
                        } opacity-75`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          {/* Service Info */}
                          <div className="md:col-span-2">
                            <h3 className="text-lg font-bold text-foreground mb-4">
                              {booking.serviceName}
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 text-sm">
                                <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                <span className="text-foreground">
                                  {new Date(booking.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-sm">
                                <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                <span className="text-foreground">
                                  {booking.time}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Status & Price */}
                          <div className="md:col-span-1">
                            <p className="text-xs text-muted-foreground mb-2 uppercase font-semibold">
                              Status
                            </p>
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}
                            >
                              {getStatusIcon(booking.status)}
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </div>
                            <p className="text-xs text-muted-foreground mt-4 uppercase font-semibold">
                              Amount
                            </p>
                            <p className="text-2xl font-bold text-foreground">
                              ${booking.price}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="md:col-span-1 flex flex-col gap-3 justify-end">
                            {booking.status === "completed" && (
                              <>
                                <Button
                                  variant="outline"
                                  className="gap-2"
                                  onClick={() => {
                                    // Book same service again
                                  }}
                                >
                                  Book Again
                                </Button>
                                <Button 
                                  variant="outline"
                                  className="gap-2"
                                  onClick={() => {
                                    // Leave review
                                  }}
                                >
                                  Leave Review
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ← नया: Reschedule Modal (date, time, address change) */}
        {showRescheduleModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-6 bg-card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-foreground">Reschedule Booking</h3>
                <button
                  onClick={closeModal}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-date">New Date</Label>
                  <Input
                    type="date"
                    id="new-date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="new-time">New Time</Label>
                  <Input
                    type="time"
                    id="new-time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="new-address">New Service Address</Label>
                  <Input
                    type="text"
                    id="new-address"
                    placeholder="Enter new address"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleReschedule}
                  disabled={!newDate || !newTime || !newAddress}
                >
                  Update Schedule
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}