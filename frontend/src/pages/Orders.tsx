import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import client from "@/lib/feathersClient";
import { useQuery } from "@tanstack/react-query";

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: orders = [], isLoading, error, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await client.service('orders').find();
      return response.data;
    }
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await client.service('orders').patch(orderId, { status: newStatus });
      refetch();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDelete = async (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await client.service('orders').remove(orderId);
        refetch();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success/10 text-success";
      case "Processing":
        return "bg-warning/10 text-warning";
      case "Pending":
        return "bg-muted text-muted-foreground";
      case "Cancelled":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="shadow-lg rounded-lg overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: any) => (
                <TableRow key={order._id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">#{order._id.slice(-6)}</TableCell>
                  <TableCell>{order.customerName || 'N/A'}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status || 'Pending'}
                      onValueChange={(value) => handleStatusChange(order._id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right font-medium">${order.totalPrice || 0}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(order._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
