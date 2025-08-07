const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Build software </span>
            <span className="bg-gradient-hero bg-clip-text text-transparent">faster, together.</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            The most complete developer experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Feature 1 - Collaboration */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/50 transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl mb-4 animate-float"></div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Collaborate on everything.
              </h3>
              <p className="text-muted-foreground">
                From deployments to tasks, work with your team every step of the way.
              </p>
            </div>
          </div>

          {/* Feature 2 - Integrations */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/50 transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl mb-4 animate-float" style={{ animationDelay: "0.5s" }}></div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Crafted for your favorite tools
              </h3>
              <p className="text-muted-foreground">
                Connect your tools - we'll handle the rest. Many integrations, with more to come.
              </p>
            </div>
            
            {/* Integration logos grid */}
            <div className="grid grid-cols-4 gap-4 mt-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-12 h-12 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;