import { useState } from 'react';
import { ProfileSelector, UserProfile } from './components/ProfileSelector';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { RestaurantCard, Restaurant } from './components/RestaurantCard';
import { RestaurantMenu, MenuItem } from './components/RestaurantMenu';
import { Cart, CartItem } from './components/Cart';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';
import { MerchantDashboard } from './components/merchant/MerchantDashboard';
import { DeliveryDashboard } from './components/delivery/DeliveryDashboard';
import { ChatWidget } from './components/chat/ChatWidget';
import { NotificationSystem } from './components/notifications/NotificationSystem';
import { Toaster } from './components/ui/sonner';

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Prime',
    category: 'pizza',
    rating: 4.8,
    deliveryTime: '30-40 min',
    deliveryFee: 0,
    image: 'https://images.unsplash.com/photo-1624632961345-c555acdf847e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjBwaXp6YXxlbnwxfHx8fDE3NjI1MjA2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Pizza', 'Italiana', 'Massas'],
  },
  {
    id: '2',
    name: 'Burger House',
    category: 'burger',
    rating: 4.6,
    deliveryTime: '25-35 min',
    deliveryFee: 5.99,
    image: 'https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjI0MzMzMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Hambúrguer', 'Fast Food', 'Americano'],
  },
  {
    id: '3',
    name: 'Sushi Express',
    category: 'sushi',
    rating: 4.9,
    deliveryTime: '40-50 min',
    deliveryFee: 8.50,
    image: 'https://images.unsplash.com/photo-1700324822763-956100f79b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NjI1MTg1MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Japonês', 'Sushi', 'Sashimi'],
  },
  {
    id: '4',
    name: 'Trattoria Italiana',
    category: 'pasta',
    rating: 4.7,
    deliveryTime: '35-45 min',
    deliveryFee: 0,
    image: 'https://images.unsplash.com/photo-1662197480393-2a82030b7b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MjQwNDc0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Massas', 'Italiana', 'Pizza'],
  },
  {
    id: '5',
    name: 'Green Bowl',
    category: 'healthy',
    rating: 4.5,
    deliveryTime: '20-30 min',
    deliveryFee: 4.50,
    image: 'https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2MjUxNzk1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Saudável', 'Saladas', 'Vegano'],
  },
  {
    id: '6',
    name: 'Sweet Dreams',
    category: 'dessert',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 3.50,
    image: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZSUyMGNob2NvbGF0ZXxlbnwxfHx8fDE3NjI0NjU0MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Sobremesas', 'Doces', 'Bolos'],
  },
];

const mockMenuItems: { [key: string]: MenuItem[] } = {
  '1': [
    {
      id: '1-1',
      name: 'Pizza Margherita',
      description: 'Molho de tomate, mussarela, manjericão fresco',
      price: 42.90,
      image: 'https://images.unsplash.com/photo-1624632961345-c555acdf847e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjBwaXp6YXxlbnwxfHx8fDE3NjI1MjA2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Pizzas',
    },
    {
      id: '1-2',
      name: 'Pizza Pepperoni',
      description: 'Molho de tomate, mussarela, pepperoni',
      price: 48.90,
      image: 'https://images.unsplash.com/photo-1624632961345-c555acdf847e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjBwaXp6YXxlbnwxfHx8fDE3NjI1MjA2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Pizzas',
    },
    {
      id: '1-3',
      name: 'Pizza Quattro Formaggi',
      description: 'Mussarela, gorgonzola, parmesão, provolone',
      price: 52.90,
      image: 'https://images.unsplash.com/photo-1624632961345-c555acdf847e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjBwaXp6YXxlbnwxfHx8fDE3NjI1MjA2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Pizzas',
    },
    {
      id: '1-4',
      name: 'Refrigerante Lata',
      description: 'Coca-Cola, Guaraná, Fanta',
      price: 5.90,
      image: 'https://images.unsplash.com/photo-1624632961345-c555acdf847e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjBwaXp6YXxlbnwxfHx8fDE3NjI1MjA2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Bebidas',
    },
  ],
  '2': [
    {
      id: '2-1',
      name: 'Classic Burger',
      description: 'Hambúrguer 180g, queijo, alface, tomate, cebola',
      price: 28.90,
      image: 'https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjI0MzMzMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Hambúrgueres',
    },
    {
      id: '2-2',
      name: 'Bacon Burger',
      description: 'Hambúrguer 180g, bacon crocante, queijo cheddar',
      price: 34.90,
      image: 'https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjI0MzMzMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Hambúrgueres',
    },
    {
      id: '2-3',
      name: 'Batata Frita',
      description: 'Porção individual de batatas fritas crocantes',
      price: 12.90,
      image: 'https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjI0MzMzMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Acompanhamentos',
    },
  ],
};

type CustomerView = 'home' | 'menu' | 'checkout' | 'confirmation';

export default function App() {
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  
  // Customer state
  const [customerView, setCustomerView] = useState<CustomerView>('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleLogout = () => {
    setCurrentProfile(null);
    setCustomerView('home');
    setSelectedCategory('all');
    setSelectedRestaurant(null);
    setCartItems([]);
    setIsCartOpen(false);
    setOrderNumber('');
  };

  if (!currentProfile) {
    return <ProfileSelector onSelectProfile={setCurrentProfile} />;
  }

  if (currentProfile === 'merchant') {
    return <MerchantDashboard onLogout={handleLogout} />;
  }

  if (currentProfile === 'delivery') {
    return <DeliveryDashboard onLogout={handleLogout} />;
  }

  // Customer flow
  const filteredRestaurants = selectedCategory === 'all' 
    ? mockRestaurants 
    : mockRestaurants.filter(r => r.category === selectedCategory);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCustomerView('checkout');
  };

  const handleConfirmOrder = () => {
    const orderNum = Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderNumber(orderNum);
    setCustomerView('confirmation');
  };

  const handleBackToHome = () => {
    setCustomerView('home');
    setSelectedRestaurant(null);
    setCartItems([]);
    setSelectedCategory('all');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const currentDeliveryFee = selectedRestaurant?.deliveryFee || 0;

  if (customerView === 'confirmation') {
    return <OrderConfirmation orderNumber={orderNumber} onBackToHome={handleBackToHome} />;
  }

  if (customerView === 'checkout') {
    return (
      <Checkout
        items={cartItems}
        deliveryFee={currentDeliveryFee}
        onBack={() => setCustomerView('menu')}
        onConfirm={handleConfirmOrder}
      />
    );
  }

  if (customerView === 'menu' && selectedRestaurant) {
    return (
      <>
        <RestaurantMenu
          restaurant={selectedRestaurant}
          menuItems={mockMenuItems[selectedRestaurant.id] || []}
          onBack={() => {
            setCustomerView('home');
            setSelectedRestaurant(null);
          }}
          onAddToCart={handleAddToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
          deliveryFee={currentDeliveryFee}
        />
        {cartItems.length > 0 && (
          <div className="fixed bottom-4 right-4 z-40">
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 flex items-center gap-2"
            >
              <span>Ver Carrinho</span>
              <span className="bg-white text-orange-500 px-2 py-1 rounded-full text-sm">
                {totalItems}
              </span>
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2>
            {selectedCategory === 'all' ? 'Todos os Restaurantes' : 'Restaurantes'}
          </h2>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Trocar Perfil
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => {
                setSelectedRestaurant(restaurant);
                setCustomerView('menu');
              }}
            />
          ))}
        </div>
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        deliveryFee={currentDeliveryFee}
      />
      
      <ChatWidget currentProfile="customer" orderId={orderNumber} />
      <NotificationSystem profile="customer" />
      <Toaster />
    </div>
  );
}
