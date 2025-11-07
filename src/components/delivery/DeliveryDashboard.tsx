import { useState } from 'react';
import { Bike, MapPin, DollarSign, Clock, Navigation } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DeliveryHeader } from './DeliveryHeader';
import { DeliveryMap } from './DeliveryMap';
import { RealTimeMap } from './RealTimeMap';
import { ChatWidget } from '../chat/ChatWidget';
import { NotificationSystem, showNotification } from '../notifications/NotificationSystem';

interface DeliveryOrder {
  id: string;
  restaurant: string;
  customer: string;
  pickup: string;
  delivery: string;
  distance: string;
  payment: number;
  status: 'available' | 'accepted' | 'picking' | 'delivering' | 'completed';
}

const mockOrders: DeliveryOrder[] = [
  {
    id: '001',
    restaurant: 'Pizza Prime',
    customer: 'João Silva',
    pickup: 'Rua das Pizzas, 100',
    delivery: 'Rua das Flores, 123',
    distance: '2.3 km',
    payment: 8.50,
    status: 'available',
  },
  {
    id: '002',
    restaurant: 'Burger House',
    customer: 'Maria Santos',
    pickup: 'Av. Principal, 200',
    delivery: 'Rua do Comércio, 456',
    distance: '1.8 km',
    payment: 7.00,
    status: 'available',
  },
  {
    id: '003',
    restaurant: 'Sushi Express',
    customer: 'Pedro Costa',
    pickup: 'Rua Japão, 50',
    delivery: 'Av. Brasil, 789',
    distance: '3.5 km',
    payment: 10.00,
    status: 'available',
  },
];

interface DeliveryDashboardProps {
  onLogout: () => void;
}

export function DeliveryDashboard({ onLogout }: DeliveryDashboardProps) {
  const [orders, setOrders] = useState<DeliveryOrder[]>(mockOrders);
  const [activeDelivery, setActiveDelivery] = useState<DeliveryOrder | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  const acceptOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setOrders(prev =>
        prev.map(o =>
          o.id === orderId ? { ...o, status: 'accepted' } : o
        )
      );
      setActiveDelivery({ ...order, status: 'accepted' });
      
      showNotification({
        type: 'delivery_assigned',
        title: 'Entrega Aceita',
        message: `Você aceitou a entrega do pedido #${orderId}`,
        orderId,
      });
    }
  };

  const updateDeliveryStatus = (status: DeliveryOrder['status']) => {
    if (activeDelivery) {
      const updated = { ...activeDelivery, status };
      setActiveDelivery(updated);
      setOrders(prev =>
        prev.map(o => (o.id === updated.id ? updated : o))
      );
      
      if (status === 'picking') {
        showNotification({
          type: 'order_ready',
          title: 'Chegou no Restaurante',
          message: 'Aguardando retirada do pedido.',
          orderId: activeDelivery.id,
        });
      } else if (status === 'delivering') {
        showNotification({
          type: 'out_for_delivery',
          title: 'Saiu para Entrega',
          message: 'Pedido em rota de entrega ao cliente.',
          orderId: activeDelivery.id,
        });
      } else if (status === 'completed') {
        showNotification({
          type: 'delivered',
          title: 'Entrega Concluída',
          message: 'Pedido entregue com sucesso!',
          orderId: activeDelivery.id,
        });
        setTimeout(() => setActiveDelivery(null), 2000);
      }
    }
  };

  const stats = [
    {
      label: 'Entregas Hoje',
      value: '12',
      icon: Bike,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Ganhos Hoje',
      value: 'R$ 98,50',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Tempo Online',
      value: '4h 32min',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const availableOrders = orders.filter(o => o.status === 'available');

  return (
    <div className="min-h-screen bg-gray-50">
      <DeliveryHeader
        isOnline={isOnline}
        onToggleOnline={() => setIsOnline(!isOnline)}
        onLogout={onLogout}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">{stat.label}</span>
                  <div className={`${stat.bgColor} p-2 rounded-lg`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <p className={stat.color}>{stat.value}</p>
              </Card>
            );
          })}
        </div>

        {activeDelivery ? (
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2>Entrega Ativa</h2>
              <Badge className="bg-orange-500">
                {activeDelivery.status === 'accepted' && 'Indo buscar'}
                {activeDelivery.status === 'picking' && 'No restaurante'}
                {activeDelivery.status === 'delivering' && 'Em rota de entrega'}
              </Badge>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full mt-1">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Retirada</p>
                  <p>{activeDelivery.restaurant}</p>
                  <p className="text-sm text-gray-500">{activeDelivery.pickup}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full mt-1">
                  <MapPin className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Entrega</p>
                  <p>{activeDelivery.customer}</p>
                  <p className="text-sm text-gray-500">{activeDelivery.delivery}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Distância: {activeDelivery.distance}</span>
                <span className="text-green-600">R$ {activeDelivery.payment.toFixed(2)}</span>
              </div>
            </div>

            <RealTimeMap
              pickup={{ lat: -23.550520, lng: -46.633308 }}
              delivery={{ lat: -23.561684, lng: -46.656139 }}
              currentLocation={{ lat: -23.555000, lng: -46.640000 }}
            />

            <div className="grid grid-cols-2 gap-3 mt-6">
              {activeDelivery.status === 'accepted' && (
                <Button
                  className="col-span-2 bg-orange-500 hover:bg-orange-600"
                  onClick={() => updateDeliveryStatus('picking')}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Cheguei no Restaurante
                </Button>
              )}
              {activeDelivery.status === 'picking' && (
                <Button
                  className="col-span-2 bg-orange-500 hover:bg-orange-600"
                  onClick={() => updateDeliveryStatus('delivering')}
                >
                  <Bike className="w-4 h-4 mr-2" />
                  Saí para Entrega
                </Button>
              )}
              {activeDelivery.status === 'delivering' && (
                <Button
                  className="col-span-2 bg-green-500 hover:bg-green-600"
                  onClick={() => updateDeliveryStatus('completed')}
                >
                  Pedido Entregue
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div>
            <h2 className="mb-4">
              Pedidos Disponíveis ({availableOrders.length})
            </h2>
            
            {!isOnline ? (
              <Card className="p-12 text-center">
                <Bike className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Você está offline</p>
                <p className="text-sm text-gray-500 mt-2">
                  Ative o modo online para receber pedidos
                </p>
              </Card>
            ) : availableOrders.length === 0 ? (
              <Card className="p-12 text-center">
                <Bike className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum pedido disponível</p>
                <p className="text-sm text-gray-500 mt-2">
                  Aguarde novos pedidos aparecerem
                </p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {availableOrders.map((order) => (
                  <Card key={order.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3>{order.restaurant}</h3>
                        <p className="text-sm text-gray-600">
                          Pedido #{order.id}
                        </p>
                      </div>
                      <Badge className="bg-green-500">
                        R$ {order.payment.toFixed(2)}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-blue-500 mt-1" />
                        <div className="text-sm">
                          <p className="text-gray-600">Retirada</p>
                          <p>{order.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-green-500 mt-1" />
                        <div className="text-sm">
                          <p className="text-gray-600">Entrega</p>
                          <p>{order.delivery}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        📍 {order.distance}
                      </span>
                      <Button
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => acceptOrder(order.id)}
                      >
                        Aceitar Entrega
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      <ChatWidget currentProfile="delivery" orderId={activeDelivery?.id} />
      <NotificationSystem profile="delivery" enabled={isOnline} />
    </div>
  );
}
