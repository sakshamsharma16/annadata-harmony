
import React from "react";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  {
    title: "Top 5 Crops for Small Farmers in North India",
    to: "/blog/top-5-crops-north-india"
  },
  {
    title: "How to Use Krishi Mitra: A Step-By-Step Guide",
    to: "/blog/krishi-mitra-guide"
  },
  {
    title: "Revolutionizing the Hawker System in India: Annadata's Success Stories",
    to: "/blog/hawker-system-india"
  },
  {
    title: "How AI Can Solve India’s Agricultural Inefficiency",
    to: "/blog/ai-solve-india-agriculture"
  },
  {
    title: "Soil Health: Simple Techniques Every Farmer Should Know",
    to: "/blog/soil-health-simple-techniques"
  }
];

const BlogKnowledgeCentre: React.FC = () => (
  <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-amber-50 to-white" id="blog-knowledge">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-10">
        <Badge className="mb-2" variant="outline">
          <BookOpen className="w-4 h-4 inline-block mr-1 mb-0.5" />
          Blog & Knowledge Centre
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Grow Your Knowledge, Empower Your Farm</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-3">
          Expert tips, how-tos, success stories &amp; market trends for Indian farmers, vendors, and consumers.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {articles.map((article, idx) => (
          <Link
            key={article.to}
            to={article.to}
            className="block p-5 bg-white rounded-lg border shadow-sm hover:shadow-md transition animate-fade-in"
            style={{ animationDelay: `${0.1 * idx}s` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#FF9933]" />
              <span className="font-semibold">{article.title}</span>
            </div>
            <div className="text-xs text-gray-400">Click to read &rarr;</div>
          </Link>
        ))}
      </div>
      <div className="text-center">
        <Link to="/blog" className="inline-block underline text-[#138808] font-medium hover:text-[#FF9933] transition">
          See all articles
        </Link>
      </div>
    </div>
  </section>
);

export default BlogKnowledgeCentre;
