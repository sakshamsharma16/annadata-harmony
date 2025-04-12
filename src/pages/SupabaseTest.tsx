
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

export default function SupabaseTest() {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({
    full_name: '',
    phone_number: '',
    role: 'user',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('users').select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function addUser() {
    try {
      setLoading(true);
      
      // Generate a UUID for the id field
      const userId = uuidv4();
      
      const { error } = await supabase.from('users').insert({
        id: userId,  // Add the id field
        full_name: newUser.full_name,
        phone_number: newUser.phone_number,
        role: newUser.role,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'User added successfully',
      });
      
      // Clear the form and refetch users
      setNewUser({
        full_name: '',
        phone_number: '',
        role: 'user',
      });
      
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: 'Error',
        description: 'Failed to add user',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Supabase Integration Test</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
            <CardDescription>Enter details to add a new user to the database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={newUser.full_name}
                  onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  value={newUser.phone_number}
                  onChange={(e) => setNewUser({ ...newUser, phone_number: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={addUser} disabled={loading}>
              {loading ? 'Adding...' : 'Add User'}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Existing Users</CardTitle>
            <CardDescription>List of users in the database</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : users.length > 0 ? (
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="border rounded p-3">
                    <p><strong>Name:</strong> {user.full_name}</p>
                    <p><strong>Phone:</strong> {user.phone_number || 'Not provided'}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No users found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
