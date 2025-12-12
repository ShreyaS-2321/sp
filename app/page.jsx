import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { MapPin, Home, Users, Star } from "lucide-react"

export default function LandingPage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 to-background px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Find Your Perfect <span className="text-primary">PG Home</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover verified paying guest accommodations with filters for location, budget, and lifestyle preferences
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/explore">
              <Button size="lg" className="w-full sm:w-auto">
                Explore PGs
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                List Your Property
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section id="features" className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How We Help</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Easy Discovery", desc: "Find PGs near you with advanced filtering options" },
              {
                icon: Home,
                title: "Verified Listings",
                desc: "All properties are verified for authenticity and quality",
              },
              { icon: Users, title: "Community Driven", desc: "Connect with other residents and owners safely" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">What Users Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Priya", role: "Student", review: "Found my perfect room in just 2 days!" },
              { name: "Raj", role: "Young Professional", review: "Great platform with reliable owners" },
              { name: "Meera", role: "Working Professional", review: "Best PG hunting experience ever" },
            ].map((testimonial, i) => (
              <div key={i} className="p-6 bg-card rounded-lg border border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.review}"</p>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
