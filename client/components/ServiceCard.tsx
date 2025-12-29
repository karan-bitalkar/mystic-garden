import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Star, MapPin } from "lucide-react";
import { Service } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  variant?: "default" | "compact";
}

export default function ServiceCard({
  service,
  variant = "default",
}: ServiceCardProps) {
  if (variant === "compact") {
    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-32 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1581092918692-8d1d08394400?w=400&h=300&fit=crop";
            }}
          />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm text-foreground line-clamp-1">
            {service.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {service.category}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold text-primary">${service.price}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span className="text-xs font-medium">{service.rating}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1581092692692-8d1d08394400?w=400&h=300&fit=crop";
          }}
        />
        <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold">
          {service.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-foreground mb-2">
          {service.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {service.description}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-3 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-semibold text-foreground">
              {service.rating}
            </span>
            <span className="text-muted-foreground">
              ({service.reviews} reviews)
            </span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{service.duration}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">Starting at</span>
            <p className="text-2xl font-bold text-primary">${service.price}</p>
          </div>
          <Link to={`/booking/${service.id}`}>
            <Button className="bg-primary hover:bg-primary/90">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
