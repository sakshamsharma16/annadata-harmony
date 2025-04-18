
import React, { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Edit, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  trend: string;
  change: string;
}

interface InventoryManagementProps {
  products: Product[];
  onDeleteProduct: (id: number) => void;
}

const InventoryManagement: React.FC<InventoryManagementProps> = ({ products, onDeleteProduct }) => {
  const [inventoryView, setInventoryView] = useState<"grid" | "table">("grid");

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="border-b bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Inventory Management</CardTitle>
            <CardDescription>Manage your products and inventory</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant={inventoryView === "grid" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setInventoryView("grid")}
            >
              Grid
            </Button>
            <Button 
              variant={inventoryView === "table" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setInventoryView("table")}
            >
              Table
            </Button>
            <Link to="/farmer/products">
              <Button className="bg-[#138808] hover:bg-[#138808]/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {inventoryView === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{product.name}</h4>
                  <span className={`flex items-center ${
                    product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.trend === 'up' ? (
                      <ArrowUpRight size={16} />
                    ) : (
                      <ArrowDownRight size={16} />
                    )}
                    {product.change}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Quantity</p>
                    <p className="font-medium">{product.quantity} kg</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Price/kg</p>
                    <p className="font-medium">₹{product.price}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity (kg)</TableHead>
                  <TableHead>Price (₹/kg)</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>
                      <span className={`flex items-center ${
                        product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.trend === 'up' ? (
                          <ArrowUpRight size={16} className="mr-1" />
                        ) : (
                          <ArrowDownRight size={16} className="mr-1" />
                        )}
                        {product.change}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => onDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryManagement;
