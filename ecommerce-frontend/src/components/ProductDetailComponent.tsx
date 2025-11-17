import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category: string;
  stock: number;
  image?: string;
}

interface ProductDetailComponentProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailComponent({ product, onClose }: ProductDetailComponentProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Product Details</h2>
        <div className="space-y-4">
          <div>
            <strong>ID:</strong> {product._id}
          </div>
          <div>
            <strong>Name:</strong> {product.name}
          </div>
          <div>
            <strong>Price:</strong> ${product.price}
          </div>
          <div>
            <strong>Description:</strong> {product.description || "No description"}
          </div>
          <div>
            <strong>Category:</strong> {product.category}
          </div>
          <div>
            <strong>Stock:</strong> {product.stock}
          </div>
          {product.image && (
            <div>
              <strong>Image:</strong>
              <img src={product.image} alt={product.name} className="mt-2 max-w-full h-auto" />
            </div>
          )}
        </div>
        <div className="mt-6">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
