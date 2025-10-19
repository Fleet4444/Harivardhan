import React, { useMemo } from 'react';
import { products, users } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { BadgeCheckIcon } from '../components/icons';

interface MarketplaceProps {
  searchTerm: string;
}

const Marketplace: React.FC<MarketplaceProps> = ({ searchTerm }) => {

  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return products;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return products.filter(product => {
        const seller = users.find(u => u.id === product.sellerId);
        return (
            product.name.toLowerCase().includes(lowercasedTerm) ||
            (seller && seller.name.toLowerCase().includes(lowercasedTerm))
        );
    });
  }, [searchTerm]);

  return (
    <div className="space-y-8 mb-20">
      <div>
        <h2 className="text-3xl font-bold text-brand-dark mb-2">Artisan Marketplace</h2>
        <p className="text-gray-600">Discover unique, handcrafted goods from our talented community.</p>
      </div>

      <div className="bg-gradient-to-r from-brand-secondary/20 to-brand-green/20 p-6 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded-full">
                 <BadgeCheckIcon className="w-8 h-8 text-brand-secondary"/>
            </div>
            <div>
                <h3 className="font-bold text-brand-dark text-lg">Become a Verified Seller</h3>
                <p className="text-brand-text-dark text-sm">Build trust and sell more by getting your SkillConnect verification badge.</p>
            </div>
        </div>
        <button className="bg-brand-secondary text-white font-bold py-2 px-5 rounded-lg hover:bg-opacity-90 transition-colors duration-200 flex-shrink-0">
            Learn More
        </button>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
      ) : (
         <div className="text-center py-16 bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300">
            <h3 className="text-xl font-semibold text-brand-dark">No Products Found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your search query.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;