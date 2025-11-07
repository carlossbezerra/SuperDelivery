import { CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';

interface OrderConfirmationProps {
  orderNumber: string;
  onBackToHome: () => void;
}

const orderSteps = [
  { id: 1, name: 'Pedido confirmado', icon: '✓' },
  { id: 2, name: 'Preparando', icon: '👨‍🍳' },
  { id: 3, name: 'Saiu para entrega', icon: '🏍️' },
  { id: 4, name: 'Entregue', icon: '🎉' },
];

export function OrderConfirmation({ orderNumber, onBackToHome }: OrderConfirmationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 4) return prev + 1;
        return prev;
      });
      setProgress((prev) => {
        if (prev < 100) return prev + 25;
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-green-600 mb-2">Pedido Confirmado!</h1>
          <p className="text-gray-600">
            Pedido #{orderNumber}
          </p>
        </div>

        <Card className="p-4 mb-6 bg-orange-50 border-orange-200">
          <p className="text-sm text-gray-700">
            Tempo estimado de entrega
          </p>
          <p className="text-orange-600">30-40 minutos</p>
        </Card>

        <div className="mb-6">
          <Progress value={progress} className="mb-4" />
          
          <div className="space-y-4">
            {orderSteps.map((step) => (
              <div 
                key={step.id}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  currentStep >= step.id 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-gray-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                  currentStep >= step.id 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200'
                }`}>
                  {step.icon}
                </div>
                <span className={currentStep >= step.id ? 'text-green-700' : 'text-gray-500'}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600"
          onClick={onBackToHome}
        >
          Voltar ao Início
        </Button>
      </Card>
    </div>
  );
}
