import { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface Location {
  lat: number;
  lng: number;
}

interface RealTimeMapProps {
  pickup: Location;
  delivery: Location;
  currentLocation?: Location;
}

export function RealTimeMap({ pickup, delivery, currentLocation }: RealTimeMapProps) {
  const [deliveryPosition, setDeliveryPosition] = useState(currentLocation || pickup);

  // Simulate real-time movement
  useEffect(() => {
    if (!currentLocation) return;

    const interval = setInterval(() => {
      setDeliveryPosition(prev => {
        // Simulate movement towards delivery location
        const latDiff = delivery.lat - prev.lat;
        const lngDiff = delivery.lng - prev.lng;
        
        return {
          lat: prev.lat + (latDiff * 0.1),
          lng: prev.lng + (lngDiff * 0.1),
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [delivery, currentLocation]);

  return (
    <div className="space-y-4">
      {/* Map Container - In production, replace with Google Maps */}
      <Card className="relative h-96 bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6">
            <Navigation className="w-12 h-12 text-orange-500 mx-auto mb-4 animate-pulse" />
            <h3 className="mb-2">Mapa em Tempo Real</h3>
            <p className="text-sm text-gray-600 mb-4">
              Para integrar o Google Maps, adicione a chave da API:
            </p>
            <code className="text-xs bg-gray-200 px-3 py-1 rounded">
              GOOGLE_MAPS_API_KEY=sua_chave_aqui
            </code>
            <div className="mt-6 text-left max-w-md mx-auto">
              <p className="text-sm mb-2">Documentação:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Adicione o script do Google Maps no HTML</li>
                <li>• Use @googlemaps/react-wrapper ou google-map-react</li>
                <li>• Implemente markers para pickup, delivery e rider</li>
                <li>• Use Directions API para rota otimizada</li>
                <li>• Ative Geolocation API para rastreamento em tempo real</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Simulated map markers */}
        <div className="absolute top-12 left-12 z-10">
          <div className="relative">
            <MapPin className="w-10 h-10 text-blue-500 drop-shadow-lg fill-blue-500" />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              Retirada
            </div>
          </div>
        </div>

        {deliveryPosition && (
          <div 
            className="absolute z-10 transition-all duration-1000"
            style={{
              left: `${40 + (deliveryPosition.lng - pickup.lng) * 200}%`,
              top: `${30 + (deliveryPosition.lat - pickup.lat) * 200}%`,
            }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                Entregador
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-12 right-12 z-10">
          <div className="relative">
            <MapPin className="w-10 h-10 text-green-500 drop-shadow-lg fill-green-500" />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              Destino
            </div>
          </div>
        </div>

        {/* Simulated route */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="orange" opacity="0.6" />
            </marker>
          </defs>
          <path
            d="M 15% 25% Q 50% 10%, 85% 75%"
            stroke="orange"
            strokeWidth="4"
            fill="none"
            strokeDasharray="10,5"
            opacity="0.6"
            markerEnd="url(#arrowhead)"
          />
        </svg>
      </Card>

      {/* Map Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full">
          <Navigation className="w-4 h-4 mr-2" />
          Abrir no Google Maps
        </Button>
        <Button variant="outline" className="w-full">
          <Phone className="w-4 h-4 mr-2" />
          Ligar para Cliente
        </Button>
      </div>

      {/* Distance Info */}
      <Card className="p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-1">Distância</p>
            <p className="text-orange-600">2.3 km</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Tempo Estimado</p>
            <p className="text-orange-600">12 min</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Status</p>
            <p className="text-green-600">Em rota</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
