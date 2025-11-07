import { Star, Clock, DollarSign } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  tags: string[];
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback 
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {restaurant.deliveryFee === 0 && (
          <Badge className="absolute top-3 right-3 bg-green-500">
            Grátis
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="mb-2">{restaurant.name}</h3>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {restaurant.tags.map((tag, index) => (
            <span key={index} className="text-xs text-gray-500">
              {tag}{index < restaurant.tags.length - 1 ? ' •' : ''}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
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
    </Card>
  );
}
