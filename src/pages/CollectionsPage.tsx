import React from 'react';
import { CollectionSection } from '../components/CollectionSection';
import { useShop } from '../context/ShopContext';

interface CollectionsPageProps {
  onNavigate: (view: string) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ onNavigate }) => {
  const { setSelectedCategory } = useShop();

  return (
    <div className="py-6 sm:py-10">
      <CollectionSection
        isStandalonePage={true}
        onSelectCollection={cat => {
          setSelectedCategory(cat);
          onNavigate('products');
        }}
      />
    </div>
  );
};
