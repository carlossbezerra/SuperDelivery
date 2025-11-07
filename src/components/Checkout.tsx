import { ArrowLeft, CreditCard, Wallet, Banknote } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { CartItem } from './Cart';
import { useState } from 'react';

interface CheckoutProps {
  items: CartItem[];
  deliveryFee: number;
  onBack: () => void;
  onConfirm: () => void;
}

export function Checkout({ items, deliveryFee, onBack, onConfirm }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <h1 className="mb-6">Finalizar Pedido</h1>

        <Card className="p-6 mb-4">
          <h2 className="mb-4">Endereço de Entrega</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input 
                id="address" 
                placeholder="Rua dos Delivery, 123"
                defaultValue="Rua dos Delivery, 123"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="number">Número</Label>
                <Input id="number" placeholder="123" />
              </div>
              <div>
                <Label htmlFor="complement">Complemento</Label>
                <Input id="complement" placeholder="Apto 45" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-4">
          <h2 className="mb-4">Forma de Pagamento</h2>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-3 p-3 border rounded-lg mb-2 hover:bg-gray-50">
              <RadioGroupItem value="credit" id="credit" />
              <Label htmlFor="credit" className="flex items-center gap-2 cursor-pointer flex-1">
                <CreditCard className="w-5 h-5" />
                Cartão de Crédito
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg mb-2 hover:bg-gray-50">
              <RadioGroupItem value="debit" id="debit" />
              <Label htmlFor="debit" className="flex items-center gap-2 cursor-pointer flex-1">
                <CreditCard className="w-5 h-5" />
                Cartão de Débito
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg mb-2 hover:bg-gray-50">
              <RadioGroupItem value="pix" id="pix" />
              <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer flex-1">
                <Wallet className="w-5 h-5" />
                PIX
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                <Banknote className="w-5 h-5" />
                Dinheiro
              </Label>
            </div>
          </RadioGroup>
        </Card>

        <Card className="p-6 mb-4">
          <h2 className="mb-4">Resumo do Pedido</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.quantity}x {item.name}
                </span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            
            <Separator />
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Taxa de entrega</span>
              <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                {deliveryFee === 0 ? 'Grátis' : `R$ ${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600"
          onClick={onConfirm}
        >
          Confirmar Pedido
        </Button>
      </div>
    </div>
  );
}
