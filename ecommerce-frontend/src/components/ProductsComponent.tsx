import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/feathersClient";
import CreateProductComponent from "./CreateProductComponent";
import EditProductComponent from "./EditProductComponent";
import ProductDetailComponent from "./ProductDetailComponent";

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category: string;
  stock: number;
  image?: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const result = await api.service("products").find();
      setProducts(result.data || result);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.service("products").remove(id);
        fetchProducts();
      } catch (err: any) {
        setError(err.message || "Failed to delete product");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 mt-6">Loading products...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 mt-6 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <Button onClick={() => setShowCreateForm(true)}>Add Product</Button>
        </div>

        <div className="shadow-lg rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price ($)</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product._id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm" onClick={() => { console.log('View clicked for product:', product); setViewingProduct(product); }}>View</Button>
                    <Button size="sm" variant="secondary" onClick={() => { console.log('Edit clicked for product:', product); setEditingProduct(product); }}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => { console.log('Delete clicked for product:', product._id); handleDelete(product._id); }}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {showCreateForm && (
        <CreateProductComponent
          onProductCreated={fetchProducts}
          onClose={() => setShowCreateForm(false)}
        />
      )}
      {editingProduct && (
        <EditProductComponent
          product={editingProduct}
          onProductUpdated={fetchProducts}
          onClose={() => setEditingProduct(null)}
        />
      )}
      {viewingProduct && (
        <ProductDetailComponent
          product={viewingProduct}
          onClose={() => setViewingProduct(null)}
        />
      )}
    </>
  );
}
