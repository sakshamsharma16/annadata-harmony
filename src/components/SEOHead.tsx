
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  lang?: string;
}

const SEOHead = ({ 
  title = 'Annadata - Connecting Farmers, Vendors, and Consumers',
  description = 'An integrated digital platform that seamlessly connects farmers, vendors, and consumers, ensuring transparency, security, and an exceptional agricultural marketplace experience.',
  keywords = 'agriculture, farmers, vendors, consumers, marketplace, farm products, organic, local produce',
  ogImage = '/og-image.png', 
  ogUrl = 'https://annadata.com',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  lang = 'en',
}: SEOHeadProps) => {
  const fullTitle = `${title} | Annadata`;
  const finalCanonicalUrl = canonicalUrl || ogUrl;

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#138808" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Annadata" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* PWA related tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Annadata" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Performance and security related tags */}
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Structured data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Annadata",
          "url": "https://annadata.com",
          "logo": "https://annadata.com/logo.png",
          "sameAs": [
            "https://www.facebook.com/annadata",
            "https://twitter.com/annadata",
            "https://www.instagram.com/annadata"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-98765-43210",
            "contactType": "customer service"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "India"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
