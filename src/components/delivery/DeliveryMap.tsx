import { MapPin, Navigation } from 'lucide-react';
import { Card } from '../ui/card';

export function DeliveryMap() {
  return (
    <Card className="p-4 bg-gray-100 h-64 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Navigation className="w-12 h-12 text-orange-500 mx-auto mb-2 animate-pulse" />
          <p className="text-sm text-gray-600">Simulação de Mapa</p>
          <p className="text-xs text-gray-500 mt-1">
            Em produção, aqui seria integrado com Google Maps ou similar
          </p>
        </div>
      </div>
      
      {/* Simulated map markers */}
      <div className="absolute top-8 left-12">
        <MapPin className="w-8 h-8 text-blue-500 drop-shadow-lg" />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 w-2 h-2 rounded-full" />
      </div>
      
      <div className="absolute bottom-8 right-12">
        <MapPin className="w-8 h-8 text-green-500 drop-shadow-lg" />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 w-2 h-2 rounded-full" />
      </div>

      {/* Simulated route line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line
          x1="15%"
          y1="25%"
          x2="85%"
          y2="75%"
          stroke="orange"
          strokeWidth="3"
          strokeDasharray="10,5"
          opacity="0.6"
        />
      </svg>
    </Card>
  );
}
