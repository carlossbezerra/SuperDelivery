import { ArrowLeft, Star, Clock, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Restaurant } from './RestaurantCard';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface RestaurantMenuProps {
  restaurant: Restaurant;
  menuItems: MenuItem[];
  onBack: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export function RestaurantMenu({ restaurant, menuItems, onBack, onAddToCart }: RestaurantMenuProps) {
  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback 
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <Button
          variant="secondary"
          className="absolute top-4 left-4"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-white mb-2">{restaurant.name}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{restaurant.deliveryFee === 0 ? 'Grátis' : `R$ ${restaurant.deliveryFee.toFixed(2)}`}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="mb-4">{category}</h2>
            <div className="grid gap-4">
              {menuItems
                .filter(item => item.category === category)
                .map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <h3 className="mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                        <span className="text-green-600">R$ {item.price.toFixed(2)}</span>
                      </div>
                      
                      <div className="w-32 h-32 flex-shrink-0 relative">
                        <ImageWithFallback 
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 bg-orange-500 hover:bg-orange-600 rounded-full w-8 h-8 p-0"
                          onClick={() => onAddToCart(item)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
