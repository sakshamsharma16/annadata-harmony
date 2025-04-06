
import React from 'react';
import { Link } from 'react-router-dom';

const SupabaseTestLink = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link 
        to="/supabase-test" 
        className="px-3 py-2 bg-[#138808] text-white text-xs rounded-full shadow-lg hover:bg-[#0c6606] transition-colors"
      >
        Supabase Test
      </Link>
    </div>
  );
};

export default SupabaseTestLink;
