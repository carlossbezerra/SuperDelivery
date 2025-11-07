import { useState } from 'react';
import { Clock, CheckCircle, XCircle, User, MapPin } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

interface Order {
  id: string;
  customer: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  address: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  time: string;
}

const mockOrders: Order[] = [
  {
    id: '001',
    customer: 'João Silva',
    items: [
      { name: 'Pizza Margherita', quantity: 2, price: 42.90 },
      { name: 'Refrigerante 2L', quantity: 1, price: 8.90 },
    ],
    total: 94.70,
    address: 'Rua das Flores, 123',
    status: 'pending',
    time: '14:30',
  },
  {
    id: '002',
    customer: 'Maria Santos',
    items: [
      { name: 'Hambúrguer Clássico', quantity: 1, price: 28.90 },
      { name: 'Batata Frita', quantity: 1, price: 12.90 },
    ],
    total: 41.80,
    address: 'Av. Principal, 456',
    status: 'preparing',
    time: '14:25',
  },
  {
    id: '003',
    customer: 'Pedro Costa',
    items: [
      { name: 'Sushi Combo', quantity: 1, price: 65.00 },
    ],
    total: 65.00,
    address: 'Rua do Comércio, 789',
    status: 'ready',
    time: '14:20',
  },
];

export function OrdersList() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { label: 'Novo Pedido', className: 'bg-yellow-500' },
      preparing: { label: 'Preparando', className: 'bg-blue-500' },
      ready: { label: 'Pronto', className: 'bg-green-500' },
      completed: { label: 'Entregue', className: 'bg-gray-500' },
      cancelled: { label: 'Cancelado', className: 'bg-red-500' },
    };
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getActionButtons = (order: Order) => {
    switch (order.status) {
      case 'pending':
        return (
          <>
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600"
              onClick={() => updateOrderStatus(order.id, 'preparing')}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Aceitar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => updateOrderStatus(order.id, 'cancelled')}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Recusar
            </Button>
          </>
        );
      case 'preparing':
        return (
          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600"
            onClick={() => updateOrderStatus(order.id, 'ready')}
          >
            Marcar como Pronto
          </Button>
        );
      case 'ready':
        return (
          <Button
            size="sm"
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => updateOrderStatus(order.id, 'completed')}
          >
            Pedido Saiu para Entrega
          </Button>
        );
      default:
        return null;
    }
  };

  const activeOrders = orders.filter(o => !['completed', 'cancelled'].includes(o.status));
  const completedOrders = orders.filter(o => ['completed', 'cancelled'].includes(o.status));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4">Pedidos Ativos ({activeOrders.length})</h2>
        <div className="grid gap-4">
          {activeOrders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3>{order.customer}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>{order.time}</span>
                      <span>•</span>
                      <span>Pedido #{order.id}</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(order.status)}
              </div>

              <div className="mb-4">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{order.address}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.name}
                    </span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between">
                <span className="text-green-600">Total: R$ {order.total.toFixed(2)}</span>
                <div className="flex gap-2">
                  {getActionButtons(order)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {completedOrders.length > 0 && (
        <div>
          <h2 className="mb-4">Histórico</h2>
          <div className="grid gap-4">
            {completedOrders.map((order) => (
              <Card key={order.id} className="p-6 opacity-60">
                <div className="flex items-center justify-between">
                  <div>
                    <h3>{order.customer}</h3>
                    <p className="text-sm text-gray-600">
                      Pedido #{order.id} • {order.time}
                    </p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(order.status)}
                    <p className="text-sm mt-2">R$ {order.total.toFixed(2)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
