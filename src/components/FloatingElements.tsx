const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating sparkles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gradient-primary rounded-full animate-sparkle"></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-gradient-primary rounded-full animate-sparkle" style={{ animationDelay: "0.5s" }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-gradient-primary rounded-full animate-sparkle" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-gradient-primary rounded-full animate-sparkle" style={{ animationDelay: "1.5s" }}></div>
      <div className="absolute bottom-1/4 right-1/5 w-2 h-2 bg-gradient-primary rounded-full animate-sparkle" style={{ animationDelay: "2s" }}></div>
      
      {/* Larger floating orbs */}
      <div className="absolute top-1/5 left-1/5 w-20 h-20 bg-gradient-primary rounded-full opacity-10 animate-float"></div>
      <div className="absolute bottom-1/5 right-1/6 w-32 h-32 bg-gradient-primary rounded-full opacity-5 animate-float" style={{ animationDelay: "1s" }}></div>
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[length:40px_40px]"></div>
    </div>
  );
};

export default FloatingElements;