import { useState } from 'react';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  available: boolean;
  category: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela, manjericão',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1624632961345-c555acdf847e?w=400',
    stock: 50,
    available: true,
    category: 'Pizzas',
  },
  {
    id: '2',
    name: 'Hambúrguer Clássico',
    description: 'Pão, hambúrguer, queijo, alface',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1722125680299-783f98369451?w=400',
    stock: 30,
    available: true,
    category: 'Hambúrgueres',
  },
  {
    id: '3',
    name: 'Refrigerante 2L',
    description: 'Coca-Cola, Guaraná, Fanta',
    price: 8.90,
    image: 'https://images.unsplash.com/photo-1624632961345-c555acdf847e?w=400',
    stock: 0,
    available: false,
    category: 'Bebidas',
  },
];

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const toggleAvailability = (productId: string) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, available: !product.available }
          : product
      )
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2>Produtos ({products.length})</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Produto</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name">Nome do Produto</Label>
                <Input id="name" placeholder="Ex: Pizza Margherita" />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input id="description" placeholder="Descrição do produto" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
                <div>
                  <Label htmlFor="stock">Estoque</Label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Input id="category" placeholder="Ex: Pizzas" />
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Salvar Produto
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white">Sem Estoque</span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-green-600">R$ {product.price.toFixed(2)}</span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package className="w-4 h-4" />
                  <span>{product.stock} unid.</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={product.available}
                    onCheckedChange={() => toggleAvailability(product.id)}
                  />
                  <span className="text-sm text-gray-600">
                    {product.available ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
