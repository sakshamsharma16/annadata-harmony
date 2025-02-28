
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Camera, Loader2, Upload } from "lucide-react";

const CATEGORIES = [
  { id: "grains", label: "Grains & Cereals" },
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "dairy", label: "Dairy & Protein" },
  { id: "spices", label: "Spices & Herbs" },
];

type ProductFormProps = {
  onSuccess?: () => void;
  initialData?: {
    name: string;
    description: string;
    price: string;
    quantity: string;
    category: string;
    image?: string;
  };
};

const ProductForm = ({ onSuccess, initialData }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    quantity: initialData?.quantity || "",
    category: initialData?.category || "",
    image: initialData?.image || "",
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // In a real implementation, this would upload to a backend API
      // For now, we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: initialData ? "Product Updated" : "Product Added",
        description: `${formData.name} has been ${initialData ? "updated" : "added"} successfully.`,
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="product-image">Product Image</Label>
          <div className="flex items-center gap-4">
            <div 
              className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
              onClick={() => document.getElementById("product-image")?.click()}
            >
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Product preview" 
                  className="h-full w-full rounded-md object-cover" 
                />
              ) : (
                <Camera className="h-8 w-8 text-gray-400" />
              )}
              <input
                type="file"
                id="product-image"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>Click to upload an image</p>
              <p>JPG, PNG or GIF, max 5MB</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product"
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (₹/kg)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="1"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity (kg)</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="0"
            required
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={formData.category} 
            onValueChange={handleCategoryChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={submitting}
          className="bg-[#138808] hover:bg-[#138808]/90"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialData ? "Updating..." : "Adding..."}
            </>
          ) : (
            <>{initialData ? "Update Product" : "Add Product"}</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
