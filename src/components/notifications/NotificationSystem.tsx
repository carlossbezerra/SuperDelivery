import { useEffect } from 'react';
import { toast } from 'sonner';
import { Package, CheckCircle, Bike, Store, AlertCircle } from 'lucide-react';

export type NotificationType = 
  | 'new_order' 
  | 'order_accepted' 
  | 'order_ready' 
  | 'delivery_assigned'
  | 'out_for_delivery'
  | 'delivered'
  | 'order_cancelled';

interface NotificationData {
  type: NotificationType;
  title: string;
  message: string;
  orderId?: string;
}

export function showNotification(data: NotificationData) {
  const icons = {
    new_order: <Package className="w-5 h-5" />,
    order_accepted: <CheckCircle className="w-5 h-5" />,
    order_ready: <Store className="w-5 h-5" />,
    delivery_assigned: <Bike className="w-5 h-5" />,
    out_for_delivery: <Bike className="w-5 h-5" />,
    delivered: <CheckCircle className="w-5 h-5" />,
    order_cancelled: <AlertCircle className="w-5 h-5" />,
  };

  toast(data.title, {
    description: data.message,
    icon: icons[data.type],
    duration: 5000,
    action: data.orderId ? {
      label: 'Ver Pedido',
      onClick: () => console.log('Ver pedido:', data.orderId),
    } : undefined,
  });

  // Play notification sound (optional)
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(data.title, {
      body: data.message,
      icon: '/notification-icon.png',
    });
  }
}

interface NotificationSystemProps {
  profile: 'customer' | 'merchant' | 'delivery';
  enabled?: boolean;
}

export function NotificationSystem({ profile, enabled = true }: NotificationSystemProps) {
  useEffect(() => {
    if (!enabled) return;

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Simulate real-time notifications based on profile
    const intervals: NodeJS.Timeout[] = [];

    if (profile === 'merchant') {
      // Simulate new orders every 30 seconds
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          showNotification({
            type: 'new_order',
            title: 'Novo Pedido!',
            message: 'Você recebeu um novo pedido. Clique para visualizar.',
            orderId: Math.random().toString(36).substring(7),
          });
        }
      }, 30000);
      intervals.push(interval);
    }

    if (profile === 'delivery') {
      // Simulate delivery requests every 40 seconds
      const interval = setInterval(() => {
        if (Math.random() > 0.6) {
          showNotification({
            type: 'delivery_assigned',
            title: 'Nova Entrega Disponível!',
            message: 'Uma nova entrega está disponível na sua região.',
            orderId: Math.random().toString(36).substring(7),
          });
        }
      }, 40000);
      intervals.push(interval);
    }

    if (profile === 'customer') {
      // Simulate order updates
      const statuses: NotificationData[] = [
        {
          type: 'order_accepted',
          title: 'Pedido Aceito',
          message: 'O restaurante aceitou seu pedido e começou a preparar.',
        },
        {
          type: 'order_ready',
          title: 'Pedido Pronto',
          message: 'Seu pedido está pronto e aguardando o entregador.',
        },
        {
          type: 'out_for_delivery',
          title: 'Saiu para Entrega',
          message: 'Seu pedido saiu para entrega. Chegará em breve!',
        },
      ];

      let statusIndex = 0;
      const interval = setInterval(() => {
        if (statusIndex < statuses.length) {
          showNotification(statuses[statusIndex]);
          statusIndex++;
        }
      }, 45000);
      intervals.push(interval);
    }

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [profile, enabled]);

  return null;
}
