
import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import { mockServices, getAllCategories } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "rating">(
    "rating"
  );
  const categories = getAllCategories();

  const filteredServices = useMemo(() => {
    let result = mockServices;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (service) =>
          service.name.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((service) => service.category === selectedCategory);
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              All Services
            </h1>
            <p className="text-muted-foreground">
              Browse and book from {mockServices.length} professional services
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <label className="text-sm font-semibold text-foreground block mb-3">
                    Search Services
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <label className="text-sm font-semibold text-foreground block mb-3 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Categories
                  </label>
                  <div className="space-y-2">
                    <Button
                      variant={selectedCategory === null ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        selectedCategory === null && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => setSelectedCategory(null)}
                    >
                      All Categories
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "ghost"
                        }
                        className={cn(
                          "w-full justify-start text-sm",
                          selectedCategory === category &&
                            "bg-primary text-primary-foreground"
                        )}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <label className="text-sm font-semibold text-foreground block mb-3">
                    Sort By
                  </label>
                  <div className="space-y-2">
                    <Button
                      variant={sortBy === "rating" ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        sortBy === "rating" && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => setSortBy("rating")}
                    >
                      Top Rated
                    </Button>
                    <Button
                      variant={sortBy === "price-asc" ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        sortBy === "price-asc" && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => setSortBy("price-asc")}
                    >
                      Price: Low to High
                    </Button>
                    <Button
                      variant={sortBy === "price-desc" ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        sortBy === "price-desc" &&
                          "bg-primary text-primary-foreground"
                      )}
                      onClick={() => setSortBy("price-desc")}
                    >
                      Price: High to Low
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="lg:col-span-3">
              {filteredServices.length > 0 ? (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground">
                      Showing{" "}
                      <span className="font-semibold text-foreground">
                        {filteredServices.length}
                      </span>{" "}
                      service{filteredServices.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredServices.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No services found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
