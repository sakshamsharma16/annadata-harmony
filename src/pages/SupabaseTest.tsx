
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";

const SupabaseTest = () => {
  const [logOutput, setLogOutput] = useState<string>("");

  function logResult(text: string) {
    setLogOutput(text);
  }

  async function testSelect() {
    const { data, error } = await supabase.from('users').select('*').limit(5);
    logResult(error ? '❌ ' + JSON.stringify(error, null, 2) : '✅ ' + JSON.stringify(data, null, 2));
  }

  async function testInsert() {
    // Create user object matching the expected schema
    const userData = {
      full_name: 'Test Farmer',
      phone_number: '9999999999',
      role: 'farmer'
    };
    
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select();
      
    logResult(error ? '❌ ' + JSON.stringify(error, null, 2) : '✅ ' + JSON.stringify(data, null, 2));
  }

  async function testLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'testuser@annadata.in',
      password: 'yourpasswordhere' // Use actual password of the test user
    });
    logResult(error ? '❌ ' + JSON.stringify(error, null, 2) : '✅ Logged in: ' + JSON.stringify(data, null, 2));
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#138808]">✅ Supabase Live Test Panel - Annadata</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <button 
            onClick={testSelect} 
            className="px-4 py-2 bg-[#138808] text-white rounded-md hover:bg-[#0c6606] transition-colors"
          >
            🔍 Test SELECT (Read)
          </button>
          
          <button 
            onClick={testInsert} 
            className="px-4 py-2 bg-[#138808] text-white rounded-md hover:bg-[#0c6606] transition-colors"
          >
            📝 Test INSERT (Write)
          </button>
          
          <button 
            onClick={testLogin} 
            className="px-4 py-2 bg-[#138808] text-white rounded-md hover:bg-[#0c6606] transition-colors"
          >
            🔐 Test LOGIN
          </button>
        </div>

        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 min-h-[200px] overflow-auto">
          <pre className="whitespace-pre-wrap text-sm">{logOutput || "Results will appear here..."}</pre>
        </div>
      </div>
    </div>
  );
};

export default SupabaseTest;
