// import Layout from "@/components/Layout";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import {
//   Mail,
//   Lock,
//   User,
//   Phone,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   AlertCircle,
// } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth";
// import { toast } from "@/components/ui/use-toast";

// export default function Register() {
//   const navigate = useNavigate();
//   const { register } = useAuth();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Clear error for this field
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Full name is required";
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email || !emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid email";
//     }

//     const phoneRegex = /^\d{10}$/;
//     if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
//       newErrors.phone = "Please enter a valid phone number";
//     }

//     if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       // Create new user account
//       const newUser = {
//         id: `user_${Date.now()}`,
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         role: "user" as const,
//       };
//       const mockSessionId = `session_${Date.now()}`;

//       register(newUser, mockSessionId);
//       toast({
//         title: "Account Created!",
//         description: `Welcome ${formData.name}! Your account has been created.`,
//       });
//       setIsLoading(false);
//       navigate("/bookings");
//     }, 1500);
//   };

//   const passwordStrength =
//     formData.password.length >= 8 ? "strong" : "weak";

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center py-12 px-4">
//         <div className="w-full max-w-md">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <Link to="/" className="inline-block mb-6">
//               <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-xl">HS</span>
//               </div>
//             </Link>
//             <h1 className="text-3xl font-bold text-foreground mb-2">
//               Create Account
//             </h1>
//             <p className="text-muted-foreground">
//               Join HomeServe and book services easily
//             </p>
//           </div>

//           {/* Register Card */}
//           <Card className="p-8 border border-border">
//             {/* Registration Form */}
//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Full Name */}
//               <div>
//                 <Label htmlFor="name" className="text-foreground font-semibold">
//                   Full Name
//                 </Label>
//                 <div className="relative mt-2">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="text"
//                     id="name"
//                     name="name"
//                     placeholder="John Doe"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
//                     required
//                   />
//                 </div>
//                 {errors.name && (
//                   <p className="text-sm text-red-500 mt-1">{errors.name}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <Label htmlFor="email" className="text-foreground font-semibold">
//                   Email Address
//                 </Label>
//                 <div className="relative mt-2">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="you@example.com"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
//                     required
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="text-sm text-red-500 mt-1">{errors.email}</p>
//                 )}
//               </div>

//               {/* Phone */}
//               <div>
//                 <Label htmlFor="phone" className="text-foreground font-semibold">
//                   Phone Number
//                 </Label>
//                 <div className="relative mt-2">
//                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     placeholder="(123) 456-7890"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
//                     required
//                   />
//                 </div>
//                 {errors.phone && (
//                   <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
//                 )}
//               </div>

//               {/* Password */}
//               <div>
//                 <Label
//                   htmlFor="password"
//                   className="text-foreground font-semibold"
//                 >
//                   Password
//                 </Label>
//                 <div className="relative mt-2">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     name="password"
//                     placeholder="••••••••"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className={`pl-10 pr-10 ${
//                       errors.password ? "border-red-500" : ""
//                     }`}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-sm text-red-500 mt-1">{errors.password}</p>
//                 )}
//                 <div className="mt-2 flex items-center gap-2">
//                   {formData.password && (
//                     <>
//                       <div className="flex-1 h-1 bg-gray-300 rounded-full">
//                         <div
//                           className={`h-full rounded-full transition-all ${
//                             passwordStrength === "strong"
//                               ? "w-full bg-success"
//                               : "w-1/2 bg-yellow-500"
//                           }`}
//                         ></div>
//                       </div>
//                       <span className="text-xs text-muted-foreground">
//                         {passwordStrength} password
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <Label
//                   htmlFor="confirmPassword"
//                   className="text-foreground font-semibold"
//                 >
//                   Confirm Password
//                 </Label>
//                 <div className="relative mt-2">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type={showConfirmPassword ? "text" : "password"}
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     placeholder="••••••••"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     className={`pl-10 pr-10 ${
//                       errors.confirmPassword ? "border-red-500" : ""
//                     }`}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowConfirmPassword(!showConfirmPassword)
//                     }
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="text-sm text-red-500 mt-1">
//                     {errors.confirmPassword}
//                   </p>
//                 )}
//                 {formData.password &&
//                   formData.confirmPassword &&
//                   formData.password === formData.confirmPassword && (
//                     <p className="text-sm text-success mt-1 flex items-center gap-1">
//                       <CheckCircle className="w-4 h-4" />
//                       Passwords match
//                     </p>
//                   )}
//               </div>

//               {/* Terms */}
//               <div className="flex items-start gap-2">
//                 <input type="checkbox" id="terms" className="mt-1" required />
//                 <label htmlFor="terms" className="text-sm text-muted-foreground">
//                   I agree to the{" "}
//                   <a href="#" className="text-primary hover:underline">
//                     Terms of Service
//                   </a>{" "}
//                   and{" "}
//                   <a href="#" className="text-primary hover:underline">
//                     Privacy Policy
//                   </a>
//                 </label>
//               </div>

//               {/* Register Button */}
//               <Button
//                 type="submit"
//                 size="lg"
//                 className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Creating Account..." : "Create Account"}
//               </Button>
//             </form>

//             {/* Divider */}
//             <div className="relative my-6">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-border"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-card text-muted-foreground">
//                   Or sign up with
//                 </span>
//               </div>
//             </div>

//             {/* OAuth Buttons */}
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="gap-2"
//                 onClick={() => {
//                   // Google OAuth
//                   const mockUser = {
//                     id: `user_${Date.now()}`,
//                     name: "Google User",
//                     email: `user_${Date.now()}@gmail.com`,
//                     role: "user" as const,
//                   };
//                   const mockSessionId = `session_${Date.now()}`;
//                   register(mockUser, mockSessionId);
//                   toast({
//                     title: "Google Sign Up",
//                     description: "Account created with Google (Demo Mode)",
//                   });
//                   navigate("/bookings");
//                 }}
//               >
//                 <svg
//                   className="w-5 h-5"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                   <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                   <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                   <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                 </svg>
//                 Google
//               </Button>
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="gap-2"
//                 onClick={() => {
//                   // Facebook OAuth
//                   const mockUser = {
//                     id: `user_${Date.now()}`,
//                     name: "Facebook User",
//                     email: `user_${Date.now()}@facebook.com`,
//                     role: "user" as const,
//                   };
//                   const mockSessionId = `session_${Date.now()}`;
//                   register(mockUser, mockSessionId);
//                   toast({
//                     title: "Facebook Sign Up",
//                     description: "Account created with Facebook (Demo Mode)",
//                   });
//                   navigate("/bookings");
//                 }}
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                 </svg>
//                 Facebook
//               </Button>
//             </div>

//             {/* Login Link */}
//             <p className="text-center text-sm text-muted-foreground">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-semibold text-primary hover:text-primary/90 transition-colors"
//               >
//                 Login
//               </Link>
//             </p>
//           </Card>
//         </div>
//       </div>
//     </Layout>
//   );
// }













// import Layout from "@/components/Layout";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import {
//   Mail,
//   Lock,
//   User,
//   Phone,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   AlertCircle,
// } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth";
// import { toast } from "@/components/ui/use-toast";

// export default function Register() {
//   const navigate = useNavigate();
//   const { register } = useAuth(); // agar register function hai useAuth mein
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Full name is required";
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email || !emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid email";
//     }

//     const phoneRegex = /^\d{10}$/;
//     if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
//       newErrors.phone = "Please enter a valid phone number";
//     }

//     if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//           confirmPassword: formData.confirmPassword, // backend mein check ke liye
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         toast({
//           title: "Registration Failed",
//           description: data.error || data.message || "Something went wrong",
//           variant: "destructive",
//         });
//         setIsLoading(false);
//         return;
//       }

//       // Optional: agar useAuth mein register function hai toh call karo
//       // register(data.user, data.token || null);

//       toast({
//         title: "Account Created Successfully! 🎉",
//         description: `Welcome ${formData.name}! Redirecting to login...`,
//       });

//       // Direct Login page pe bhej do
//       navigate("/login");
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Network error. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const passwordStrength =
//     formData.password.length >= 8 ? "strong" : "weak";

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center py-12 px-4">
//         <div className="w-full max-w-md">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <Link to="/" className="inline-block mb-6">
//               <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-xl">HS</span>
//               </div>
//             </Link>
//             <h1 className="text-3xl font-bold text-foreground mb-2">
//               Create Account
//             </h1>
//             <p className="text-muted-foreground">
//               Join HomeServe and book services easily
//             </p>
//           </div>

//           {/* Register Card */}
//           <Card className="p-8 border border-border">
//             {/* Registration Form */}
//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Full Name */}
//               <div>
//                 <Label htmlFor="name" className="text-foreground font-semibold">
//                   Full Name
//                 </Label>
//                 <div className="relative mt-2">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="text"
//                     id="name"
//                     name="name"
//                     placeholder="John Doe"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
//                     required
//                   />
//                 </div>
//                 {errors.name && (
//                   <p className="text-sm text-red-500 mt-1">{errors.name}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <Label htmlFor="email" className="text-foreground font-semibold">
//                   Email Address
//                 </Label>
//                 <div className="relative mt-2">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="you@example.com"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
//                     required
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="text-sm text-red-500 mt-1">{errors.email}</p>
//                 )}
//               </div>

//               {/* Phone */}
//               <div>
//                 <Label htmlFor="phone" className="text-foreground font-semibold">
//                   Phone Number
//                 </Label>
//                 <div className="relative mt-2">
//                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     placeholder="(123) 456-7890"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
//                     required
//                   />
//                 </div>
//                 {errors.phone && (
//                   <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
//                 )}
//               </div>

//               {/* Password */}
//               <div>
//                 <Label
//                   htmlFor="password"
//                   className="text-foreground font-semibold"
//                 >
//                   Password
//                 </Label>
//                 <div className="relative mt-2">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     name="password"
//                     placeholder="••••••••"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className={`pl-10 pr-10 ${
//                       errors.password ? "border-red-500" : ""
//                     }`}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-sm text-red-500 mt-1">{errors.password}</p>
//                 )}
//                 <div className="mt-2 flex items-center gap-2">
//                   {formData.password && (
//                     <>
//                       <div className="flex-1 h-1 bg-gray-300 rounded-full">
//                         <div
//                           className={`h-full rounded-full transition-all ${
//                             passwordStrength === "strong"
//                               ? "w-full bg-success"
//                               : "w-1/2 bg-yellow-500"
//                           }`}
//                         ></div>
//                       </div>
//                       <span className="text-xs text-muted-foreground">
//                         {passwordStrength} password
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <Label
//                   htmlFor="confirmPassword"
//                   className="text-foreground font-semibold"
//                 >
//                   Confirm Password
//                 </Label>
//                 <div className="relative mt-2">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type={showConfirmPassword ? "text" : "password"}
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     placeholder="••••••••"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     className={`pl-10 pr-10 ${
//                       errors.confirmPassword ? "border-red-500" : ""
//                     }`}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowConfirmPassword(!showConfirmPassword)
//                     }
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="text-sm text-red-500 mt-1">
//                     {errors.confirmPassword}
//                   </p>
//                 )}
//                 {formData.password &&
//                   formData.confirmPassword &&
//                   formData.password === formData.confirmPassword && (
//                     <p className="text-sm text-success mt-1 flex items-center gap-1">
//                       <CheckCircle className="w-4 h-4" />
//                       Passwords match
//                     </p>
//                   )}
//               </div>

//               {/* Terms */}
//               <div className="flex items-start gap-2">
//                 <input type="checkbox" id="terms" className="mt-1" required />
//                 <label htmlFor="terms" className="text-sm text-muted-foreground">
//                   I agree to the{" "}
//                   <a href="#" className="text-primary hover:underline">
//                     Terms of Service
//                   </a>{" "}
//                   and{" "}
//                   <a href="#" className="text-primary hover:underline">
//                     Privacy Policy
//                   </a>
//                 </label>
//               </div>

//               {/* Register Button */}
//               <Button
//                 type="submit"
//                 size="lg"
//                 className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Creating Account..." : "Create Account"}
//               </Button>
//             </form>

//             {/* Divider */}
//             <div className="relative my-6">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-border"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-card text-muted-foreground">
//                   Or sign up with
//                 </span>
//               </div>
//             </div>

//             {/* OAuth Buttons */}
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="gap-2"
//                 onClick={() => {
//                   const mockUser = {
//                     id: `user_${Date.now()}`,
//                     name: "Google User",
//                     email: `user_${Date.now()}@gmail.com`,
//                     role: "user" as const,
//                   };
//                   const mockSessionId = `session_${Date.now()}`;
//                   register(mockUser, mockSessionId);
//                   toast({
//                     title: "Google Sign Up",
//                     description: "Account created with Google (Demo Mode)",
//                   });
//                   navigate("/bookings");
//                 }}
//               >
//                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                   <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                   <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                   <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                 </svg>
//                 Google
//               </Button>
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="gap-2"
//                 onClick={() => {
//                   const mockUser = {
//                     id: `user_${Date.now()}`,
//                     name: "Facebook User",
//                     email: `user_${Date.now()}@facebook.com`,
//                     role: "user" as const,
//                   };
//                   const mockSessionId = `session_${Date.now()}`;
//                   register(mockUser, mockSessionId);
//                   toast({
//                     title: "Facebook Sign Up",
//                     description: "Account created with Facebook (Demo Mode)",
//                   });
//                   navigate("/bookings");
//                 }}
//               >
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                 </svg>
//                 Facebook
//               </Button>
//             </div>

//             {/* Login Link */}
//             <p className="text-center text-sm text-muted-foreground">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-semibold text-primary hover:text-primary/90 transition-colors"
//               >
//                 Login
//               </Link>
//             </p>
//           </Card>
//         </div>
//       </div>
//     </Layout>
//   );
// }




import { apiFetch } from "@/lib/api";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";  // ← useEffect added
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ← नया: Page load पर form खाली कर दो
  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsLoading(true);

  try {
    const { res, data } = await apiFetch("api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      }),
    });

    if (!res.ok || !data.success) {
      toast({
        title: "Registration Failed",
        description: data.error || data.message || "Something went wrong",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Account Created 🎉",
      description: "Please login now",
    });

    navigate("/login");
  } catch {
    toast({
      title: "Error",
      description: "Network error. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


  const passwordStrength =
    formData.password.length >= 8 ? "strong" : "weak";

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">HS</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground">
              Join HomeServe and book services easily
            </p>
          </div>

          <Card className="p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <Label htmlFor="name" className="text-foreground font-semibold">
                  Full Name
                </Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                    autoComplete="off"
                    required
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-foreground font-semibold">
                  Email Address
                </Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                    autoComplete="off"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-foreground font-semibold">
                  Phone Number
                </Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                    autoComplete="off"
                    required
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-foreground font-semibold">
                  Password
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
                <div className="mt-2 flex items-center gap-2">
                  {formData.password && (
                    <>
                      <div className="flex-1 h-1 bg-gray-300 rounded-full">
                        <div
                          className={`h-full rounded-full transition-all ${
                            passwordStrength === "strong"
                              ? "w-full bg-success"
                              : "w-1/2 bg-yellow-500"
                          }`}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {passwordStrength} password
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword" className="text-foreground font-semibold">
                  Confirm Password
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
                {formData.password &&
                  formData.confirmPassword &&
                  formData.password === formData.confirmPassword && (
                    <p className="text-sm text-success mt-1 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Passwords match
                    </p>
                  )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="mt-1" required />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => {
                  const mockUser = {
                    id: `user_${Date.now()}`,
                    name: "Google User",
                    email: `user_${Date.now()}@gmail.com`,
                    role: "user" as const,
                  };
                  const mockSessionId = `session_${Date.now()}`;
                  register(mockUser, mockSessionId);
                  toast({
                    title: "Google Sign Up",
                    description: "Account created with Google (Demo Mode)",
                  });
                  navigate("/bookings");
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => {
                  const mockUser = {
                    id: `user_${Date.now()}`,
                    name: "Facebook User",
                    email: `user_${Date.now()}@facebook.com`,
                    role: "user" as const,
                  };
                  const mockSessionId = `session_${Date.now()}`;
                  register(mockUser, mockSessionId);
                  toast({
                    title: "Facebook Sign Up",
                    description: "Account created with Facebook (Demo Mode)",
                  });
                  navigate("/bookings");
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary hover:text-primary/90 transition-colors"
              >
                Login
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
}