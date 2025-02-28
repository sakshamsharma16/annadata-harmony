
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, PencilLine, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import ProductForm from "@/components/products/ProductForm";
import { toast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockProducts = [
  {
    id: "1",
    name: "Premium Organic Rice",
    description: "Sustainably grown by local farmers using traditional methods",
    price: "120",
    quantity: "1000",
    category: "grains",
    image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=2070&auto=format&fit=crop",
    status: "active",
  },
  {
    id: "2",
    name: "Fresh Seasonal Vegetables",
    description: "Farm-to-table vegetables harvested daily",
    price: "80",
    quantity: "500",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=2069&auto=format&fit=crop",
    status: "active",
  },
];

const ManageProducts = () => {
  const [products, setProducts] = useState(mockProducts);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<string | null>(null);

  const handleAddProduct = () => {
    setIsAddingProduct(true);
  };

  const handleEditProduct = (productId: string) => {
    setEditingProduct(productId);
  };

  const handleDeleteProduct = async (productId: string) => {
    setDeletingProduct(productId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    setDeletingProduct(null);
    toast({
      title: "Product Deleted",
      description: "Your product has been deleted successfully.",
    });
  };

  const handleAddSuccess = () => {
    setIsAddingProduct(false);
    // In a real application, we would fetch updated products from the server
    toast({
      title: "Success",
      description: "Product added successfully.",
    });
  };

  const handleEditSuccess = () => {
    setEditingProduct(null);
    // In a real application, we would fetch updated products from the server
    toast({
      title: "Success",
      description: "Product updated successfully.",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Products</h1>
          <p className="text-muted-foreground">Add, update or remove your products from the marketplace</p>
        </div>
        <Button 
          onClick={handleAddProduct} 
          className="bg-[#138808] hover:bg-[#138808]/90 self-start"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {isAddingProduct ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>Fill in the details for your new product</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductForm onSuccess={handleAddSuccess} />
          </CardContent>
        </Card>
      ) : editingProduct ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
            <CardDescription>Update your product details</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductForm 
              initialData={products.find(p => p.id === editingProduct)} 
              onSuccess={handleEditSuccess} 
            />
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="active">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active Products</TabsTrigger>
            <TabsTrigger value="sold">Sold Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            {products.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="mb-4 rounded-full bg-yellow-100 p-3">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">No products available</h3>
                  <p className="mb-4 text-center text-muted-foreground">
                    You haven't added any products to your marketplace yet.
                  </p>
                  <Button onClick={handleAddProduct}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add your first product
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Active
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Price</p>
                          <p className="font-medium">₹{product.price}/kg</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Available</p>
                          <p className="font-medium">{product.quantity} kg</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <PencilLine className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleDeleteProduct(product.id)}
                        disabled={deletingProduct === product.id}
                      >
                        {deletingProduct === product.id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="mr-2 h-4 w-4" />
                        )}
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sold">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="mb-4 rounded-full bg-blue-100 p-3">
                  <AlertTriangle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium">No sold products yet</h3>
                <p className="text-center text-muted-foreground">
                  Products that have been sold will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ManageProducts;
