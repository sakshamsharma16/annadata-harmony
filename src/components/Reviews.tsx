
import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Rajesh Kumar",
    role: "Farmer",
    content: "Annadata has transformed how I sell my produce. Direct connection with consumers means better prices and relationships.",
    rating: 5,
    image: "/image1.jpg",
  },
  {
    name: "Priya Singh",
    role: "Consumer",
    content: "Fresh produce directly from farmers at reasonable prices. The transparency and quality are exceptional.",
    rating: 5,
    image: "/image2.jpg",
  },
  {
    name: "Amit Patel",
    role: "Vendor",
    content: "The platform has helped me expand my business and build trust with both farmers and consumers.",
    rating: 5,
    image: "/image4.jpg",
  },
];

const Reviews = () => {
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("active");
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const reviewElements = reviewsRef.current?.querySelectorAll(".review-card");
    reviewElements?.forEach((el, index) => {
      observer.observe(el);
    });

    return () => {
      reviewElements?.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white via-[#F2FCE2]/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1 bg-[#F2FCE2] text-[#138808] rounded-full text-sm font-medium mb-4">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#138808] to-[#FF9933]">
            What Our Community Says
          </h2>
          <p className="text-lg text-gray-600">
            Hear from our community of farmers, vendors, and consumers about how Annadata is transforming agriculture
          </p>
        </motion.div>

        <motion.div 
          ref={reviewsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="review-card glass-card p-6 flex flex-col relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <Quote className="absolute top-4 right-4 w-12 h-12 text-[#F2FCE2] opacity-40" />
              <div className="flex items-center gap-4 mb-6">
                <div className="overflow-hidden rounded-full w-16 h-16 border-2 border-[#138808]">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <p className="text-sm text-[#FF9933] font-medium">{review.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 italic">{review.content}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <motion.button 
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Read More Stories
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
