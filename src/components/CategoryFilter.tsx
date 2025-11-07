import { Button } from './ui/button';

const categories = [
  { id: 'all', name: 'Todos', icon: '🍽️' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'burger', name: 'Hambúrguer', icon: '🍔' },
  { id: 'sushi', name: 'Japonês', icon: '🍣' },
  { id: 'pasta', name: 'Massas', icon: '🍝' },
  { id: 'healthy', name: 'Saudável', icon: '🥗' },
  { id: 'dessert', name: 'Sobremesas', icon: '🍰' },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={`flex items-center gap-2 whitespace-nowrap ${
                selectedCategory === category.id 
                  ? 'bg-orange-500 hover:bg-orange-600' 
                  : ''
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
