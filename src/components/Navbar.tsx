import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-semibold text-foreground">Dimension</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#ai-toolkit" className="text-muted-foreground hover:text-foreground transition-colors">AI Tools</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
          </div>

          {/* CTA Button */}
          <Button 
            variant="outline" 
            className="bg-gradient-primary text-white border-none hover:opacity-90 transition-opacity"
          >
            Join waitlist
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;