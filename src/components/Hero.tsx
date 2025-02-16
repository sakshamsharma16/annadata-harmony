
const Hero = () => {
  return (
    <section className="pt-24 pb-16 hero-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-up">
            <span className="font-hindi block mb-2">अन्नदाता – किसानों का विश्वास, ग्राहकों का अधिकार।</span>
            <span className="block">Empowering Farmers, Enriching Communities</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Join the revolution that connects farmers directly with vendors and consumers, creating a sustainable ecosystem for all.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <button className="btn-primary">
              <span className="font-hindi">शामिल हों</span> | Register as Farmer
            </button>
            <button className="btn-secondary">Download App</button>
            <button className="btn-accent">Join the Movement</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
