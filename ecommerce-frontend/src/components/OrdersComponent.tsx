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

interface Order {
  _id: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt?: string;
  updatedAt?: string;
}

export default function OrdersComponent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const result = await api.service("orders").find();
      setOrders(result.data || result);
    } catch (err: any) {
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    try {
      await api.service("orders").patch(orderId, { status: newStatus });
      fetchOrders();
    } catch (err: any) {
      setError(err.message || "Failed to update order status");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await api.service("orders").remove(id);
        fetchOrders();
      } catch (err: any) {
        setError(err.message || "Failed to delete order");
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 mt-6">Loading orders...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 mt-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      <div className="shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell>
                  {order.products.map((product, idx) => (
                    <div key={idx} className="text-sm">
                      Product {product.productId}: {product.quantity} x ${product.price}
                    </div>
                  ))}
                </TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value as Order['status'])}
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(order._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
