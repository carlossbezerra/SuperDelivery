import { Store, Bell, Menu, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface MerchantHeaderProps {
  storeName: string;
  pendingOrders: number;
  onLogout: () => void;
}

export function MerchantHeader({ storeName, pendingOrders, onLogout }: MerchantHeaderProps) {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 text-white p-2 rounded-lg">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-green-600">{storeName}</h1>
              <p className="text-sm text-gray-500">Painel do Lojista</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="relative">
              <Bell className="w-5 h-5" />
              {pendingOrders > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white px-2">
                  {pendingOrders}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" onClick={onLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
