import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import FloatingElements from "./FloatingElements";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsJoined(true);
      setEmail("");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-background">
      <FloatingElements />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Announcement Badge */}
        <div className="mb-8 animate-fade-in-up">
          <Badge 
            variant="outline" 
            className="bg-card/50 border-border text-muted-foreground px-4 py-2 text-sm backdrop-blur-sm"
          >
            Announcing our $1.4M Fundraise
          </Badge>
        </div>

        {/* Hero Text */}
        <div className="max-w-5xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-foreground">Dimension is the new</span>
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              standard for collaboration
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Chat, code, cloud, deployments, and more.
          </p>
        </div>

        {/* Email Signup */}
        <div className="max-w-md mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {!isJoined ? (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder="Email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
                required
              />
              <Button 
                type="submit"
                className="bg-gradient-primary text-white border-none hover:opacity-90 transition-opacity px-6"
              >
                Join waitlist
              </Button>
            </form>
          ) : (
            <div className="bg-card/50 border border-border rounded-lg p-4 backdrop-blur-sm">
              <p className="text-foreground">You've joined the waitlist!</p>
            </div>
          )}
        </div>

        {/* App Preview */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-1 shadow-2xl animate-glow">
              <div className="bg-card rounded-xl overflow-hidden">
                <div className="h-96 bg-gradient-to-b from-card to-background/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-primary rounded-2xl mx-auto mb-4 animate-float"></div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Collaboration Interface</h3>
                    <p className="text-muted-foreground">A preview of Dimension app.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <p className="text-muted-foreground mb-8">
            Join the maintainers and contributors to the largest open-source projects on our waitlist.
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="w-12 h-12 bg-muted rounded-lg"></div>
            <div className="w-12 h-12 bg-muted rounded-lg"></div>
            <div className="w-12 h-12 bg-muted rounded-lg"></div>
            <div className="w-12 h-12 bg-muted rounded-lg"></div>
            <div className="w-12 h-12 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;