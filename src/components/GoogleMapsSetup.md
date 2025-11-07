# Guia de Integração com Google Maps

## 📍 Passo a Passo para Integrar Google Maps Real

### 1. Configuração Inicial

#### 1.1 Obter API Key
1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione um existente
3. Ative as seguintes APIs:
   - Maps JavaScript API
   - Directions API
   - Geolocation API
   - Distance Matrix API

4. Vá em "Credenciais" e crie uma chave de API
5. Restrinja a chave para seu domínio (segurança)

#### 1.2 Instalar Dependências
```bash
npm install @googlemaps/react-wrapper
npm install @googlemaps/js-api-loader
```

### 2. Criar Variável de Ambiente

Crie um arquivo `.env.local`:
```env
VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

### 3. Implementação do Componente de Mapa

Crie o arquivo `/components/delivery/GoogleMap.tsx`:

```tsx
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  pickup: { lat: number; lng: number };
  delivery: { lat: number; lng: number };
  currentLocation?: { lat: number; lng: number };
}

export function GoogleMap({ pickup, delivery, currentLocation }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<{
    pickup?: google.maps.Marker;
    delivery?: google.maps.Marker;
    rider?: google.maps.Marker;
  }>({});

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const googleMap = new google.maps.Map(mapRef.current, {
          center: pickup,
          zoom: 14,
          disableDefaultUI: false,
          zoomControl: true,
        });

        // Marcador de Retirada (Azul)
        const pickupMarker = new google.maps.Marker({
          position: pickup,
          map: googleMap,
          title: 'Ponto de Retirada',
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          },
        });

        // Marcador de Entrega (Verde)
        const deliveryMarker = new google.maps.Marker({
          position: delivery,
          map: googleMap,
          title: 'Destino de Entrega',
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          },
        });

        // Marcador do Entregador (Laranja)
        let riderMarker;
        if (currentLocation) {
          riderMarker = new google.maps.Marker({
            position: currentLocation,
            map: googleMap,
            title: 'Entregador',
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
            },
          });
        }

        // Desenhar rota
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          map: googleMap,
          suppressMarkers: true, // Não mostrar markers padrão
        });

        directionsService.route(
          {
            origin: pickup,
            destination: delivery,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === 'OK' && result) {
              directionsRenderer.setDirections(result);
            }
          }
        );

        setMap(googleMap);
        setMarkers({
          pickup: pickupMarker,
          delivery: deliveryMarker,
          rider: riderMarker,
        });
      }
    });
  }, []);

  // Atualizar posição do entregador em tempo real
  useEffect(() => {
    if (markers.rider && currentLocation) {
      markers.rider.setPosition(currentLocation);
      map?.panTo(currentLocation);
    }
  }, [currentLocation, markers.rider, map]);

  return <div ref={mapRef} className="w-full h-96 rounded-lg" />;
}
```

### 4. Usar o Componente

No arquivo `RealTimeMap.tsx`, substitua o conteúdo por:

```tsx
import { GoogleMap } from './GoogleMap';
import { Button } from '../ui/button';
import { Navigation, Phone } from 'lucide-react';
import { Card } from '../ui/card';

interface RealTimeMapProps {
  pickup: { lat: number; lng: number };
  delivery: { lat: number; lng: number };
  currentLocation?: { lat: number; lng: number };
}

export function RealTimeMap({ pickup, delivery, currentLocation }: RealTimeMapProps) {
  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${pickup.lat},${pickup.lng}&destination=${delivery.lat},${delivery.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4">
      <GoogleMap 
        pickup={pickup}
        delivery={delivery}
        currentLocation={currentLocation}
      />

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={openInGoogleMaps}>
          <Navigation className="w-4 h-4 mr-2" />
          Abrir no Google Maps
        </Button>
        <Button variant="outline">
          <Phone className="w-4 h-4 mr-2" />
          Ligar para Cliente
        </Button>
      </div>

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
```

### 5. Implementar Geolocalização em Tempo Real

```tsx
// No DeliveryDashboard.tsx
useEffect(() => {
  if (!activeDelivery) return;

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const newLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      
      // Atualizar estado local
      setCurrentLocation(newLocation);
      
      // Em produção, enviar para backend (Supabase)
      // supabase.from('deliveries').update({
      //   lat: newLocation.lat,
      //   lng: newLocation.lng,
      //   updated_at: new Date()
      // }).eq('id', activeDelivery.id);
    },
    (error) => console.error('Error getting location:', error),
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );

  return () => navigator.geolocation.clearWatch(watchId);
}, [activeDelivery]);
```

### 6. Calcular Distância e Tempo Real

```tsx
import { Loader } from '@googlemaps/js-api-loader';

async function calculateRouteInfo(origin: {lat: number, lng: number}, destination: {lat: number, lng: number}) {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: 'weekly',
  });

  await loader.load();

  const service = new google.maps.DistanceMatrixService();
  
  const result = await service.getDistanceMatrix({
    origins: [origin],
    destinations: [destination],
    travelMode: google.maps.TravelMode.DRIVING,
  });

  if (result.rows[0]?.elements[0]) {
    const element = result.rows[0].elements[0];
    return {
      distance: element.distance?.text,
      duration: element.duration?.text,
      distanceValue: element.distance?.value, // em metros
      durationValue: element.duration?.value, // em segundos
    };
  }

  return null;
}
```

### 7. Adicionar Autocomplete de Endereços

```tsx
import { useEffect, useRef } from 'react';
import { Input } from '../ui/input';

export function AddressAutocomplete({ onSelect }: { onSelect: (place: any) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      if (inputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: 'br' },
          fields: ['address_components', 'geometry', 'name'],
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          onSelect(place);
        });
      }
    });
  }, []);

  return <Input ref={inputRef} placeholder="Digite o endereço..." />;
}
```

## 🔒 Segurança

### Restringir API Key

No Google Cloud Console:
1. Vá em Credenciais > sua API Key
2. Em "Restrições de aplicativo", escolha "Referências HTTP"
3. Adicione seus domínios permitidos:
   - `http://localhost:*` (desenvolvimento)
   - `https://seudominio.com` (produção)

### Limitar APIs
Restrinja a chave apenas às APIs necessárias:
- Maps JavaScript API
- Directions API
- Geolocation API
- Distance Matrix API
- Places API (se usar autocomplete)

## 💰 Custos

- Google Maps oferece $200 de crédito gratuito por mês
- Monitore o uso no Google Cloud Console
- Implemente caching de rotas para reduzir custos
- Use a calculadora de preços: https://mapsplatform.google.com/pricing/

## 📚 Recursos Adicionais

- [Documentação oficial do Google Maps](https://developers.google.com/maps/documentation)
- [React Wrapper Examples](https://googlemaps.github.io/react-wrapper/)
- [Exemplos de código](https://github.com/googlemaps/js-samples)
