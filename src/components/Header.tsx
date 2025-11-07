import { ShoppingCart, MapPin, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white px-3 py-2 rounded-lg">
              🍔
            </div>
            <span className="text-orange-500">DeliveryApp</span>
          </div>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">Rua dos Delivery, 123</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Buscar restaurantes..." 
                className="pl-10 w-64"
              />
            </div>
            
            <Button 
              variant="outline" 
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-4 md:hidden">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Rua dos Delivery, 123</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Buscar restaurantes..." 
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
