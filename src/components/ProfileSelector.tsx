import { ShoppingBag, Store, Bike } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

export type UserProfile = 'customer' | 'merchant' | 'delivery';

interface ProfileSelectorProps {
  onSelectProfile: (profile: UserProfile) => void;
}

const profiles = [
  {
    id: 'customer' as UserProfile,
    name: 'Cliente',
    description: 'Faça pedidos e acompanhe entregas',
    icon: ShoppingBag,
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
  },
  {
    id: 'merchant' as UserProfile,
    name: 'Lojista',
    description: 'Gerencie produtos e pedidos',
    icon: Store,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
  },
  {
    id: 'delivery' as UserProfile,
    name: 'Entregador',
    description: 'Aceite e realize entregas',
    icon: Bike,
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600',
  },
];

export function ProfileSelector({ onSelectProfile }: ProfileSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <div className="inline-block bg-white px-6 py-3 rounded-full mb-4">
            <span className="text-3xl">🚀</span>
          </div>
          <h1 className="text-white mb-2">SuperDelivery</h1>
          <p className="text-white text-lg opacity-90">
            Conectando consumidores, comércios e entregadores
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {profiles.map((profile) => {
            const Icon = profile.icon;
            return (
              <Card
                key={profile.id}
                className="p-8 hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2"
                onClick={() => onSelectProfile(profile.id)}
              >
                <div className={`${profile.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-center mb-2">{profile.name}</h2>
                <p className="text-center text-gray-600 text-sm mb-6">
                  {profile.description}
                </p>
                <Button 
                  className={`w-full ${profile.color} ${profile.hoverColor} text-white`}
                >
                  Entrar como {profile.name}
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-white text-sm opacity-75">
            Selecione um perfil para começar
          </p>
        </div>
      </div>
    </div>
  );
}
