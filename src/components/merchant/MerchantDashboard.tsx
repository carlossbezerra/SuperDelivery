import { useState } from 'react';
import { Package, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MerchantHeader } from './MerchantHeader';
import { OrdersListWithNotifications } from './OrdersListWithNotifications';
import { ProductsManager } from './ProductsManager';
import { ChatWidget } from '../chat/ChatWidget';
import { NotificationSystem } from '../notifications/NotificationSystem';

interface MerchantDashboardProps {
  onLogout: () => void;
}

export function MerchantDashboard({ onLogout }: MerchantDashboardProps) {
  const [activeTab, setActiveTab] = useState('orders');

  const stats = [
    {
      label: 'Pedidos Hoje',
      value: '24',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Faturamento',
      value: 'R$ 1.247,00',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Ticket Médio',
      value: 'R$ 52,00',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Tempo Médio',
      value: '32 min',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MerchantHeader 
        storeName="Minha Loja"
        pendingOrders={3}
        onLogout={onLogout}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrdersListWithNotifications />
          </TabsContent>

          <TabsContent value="products">
            <ProductsManager />
          </TabsContent>
        </Tabs>
      </div>
      
      <ChatWidget currentProfile="merchant" orderId="001" />
      <NotificationSystem profile="merchant" />
    </div>
  );
}
