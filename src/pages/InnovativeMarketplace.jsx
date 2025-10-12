import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Sparkles } from 'lucide-react';

const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="innovative-product-card glass-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="product-image"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <img src={product.image} alt={product.name} />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="product-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button className="holographic-button">Voir Détails</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        className="product-info"
        animate={{ y: isHovered ? -5 : 0 }}
      >
        <h3>{product.name}</h3>
        <p className="product-price">{product.price} XOF</p>
        <motion.div
          className="product-rating"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          {'★'.repeat(product.rating)}
        </motion.div>
      </motion.div>

      {/* Effet de particules au hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="particle-effect"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InnovativeMarketplace = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = useMemo(() => {
    // Données simulées - à remplacer par l'API
    return Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `Produit Innovant ${i + 1}`,
      price: Math.floor(Math.random() * 100000) + 5000,
      rating: Math.floor(Math.random() * 3) + 3,
      image: `https://picsum.photos/300/200?random=${i}`,
      category: ['tech', 'fashion', 'home', 'digital'][i % 4]
    }));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    );
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="innovative-marketplace">
      {/* Header animé */}
      <motion.header
        className="marketplace-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>
          <Sparkles className="sparkle-icon" />
          Marketplace Digital Space
          <Sparkles className="sparkle-icon" />
        </h1>
        <p>Découvrez l'innovation à chaque clic</p>
      </motion.header>

      {/* Contrôles de recherche avancés */}
      <motion.div
        className="search-controls glass-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="search-bar">
          <Search />
          <input
            type="text"
            placeholder="Rechercher l'innovation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="controls-right">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Toutes catégories</option>
            <option value="tech">Technologie</option>
            <option value="fashion">Mode</option>
            <option value="home">Maison</option>
            <option value="digital">Digital</option>
          </select>

          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <Grid />
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <List />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Grille de produits animée */}
      <motion.div
        className={`products-grid ${viewMode}`}
        layout
      >
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Message vide animé */}
      <AnimatePresence>
        {filteredProducts.length === 0 && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <h3>Aucun produit trouvé</h3>
            <p>Essayez de modifier vos critères de recherche</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InnovativeMarketplace;
