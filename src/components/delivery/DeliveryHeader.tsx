import { Bike, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';

interface DeliveryHeaderProps {
  isOnline: boolean;
  onToggleOnline: () => void;
  onLogout: () => void;
}

export function DeliveryHeader({ isOnline, onToggleOnline, onLogout }: DeliveryHeaderProps) {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 text-white p-2 rounded-lg">
              <Bike className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-orange-600">Entregador</h1>
              <p className="text-sm text-gray-500">Painel de Entregas</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Status</span>
              <Switch
                checked={isOnline}
                onCheckedChange={onToggleOnline}
              />
              <Badge className={isOnline ? 'bg-green-500' : 'bg-gray-500'}>
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
            </div>
            <Button variant="ghost" onClick={onLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
