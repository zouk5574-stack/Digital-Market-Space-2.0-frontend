import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';

const AnimatedStatCard = ({ icon: Icon, value, label, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="animated-stat-card glass-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
    >
      <motion.div 
        className="stat-icon"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay }}
      >
        <Icon />
      </motion.div>
      <motion.h3 
        className="stat-value"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 100, delay: delay + 0.2 }}
      >
        {value}
      </motion.h3>
      <p className="stat-label">{label}</p>
      
      {/* Ligne animée */}
      <motion.div 
        className="stat-progress"
        initial={{ width: 0 }}
        animate={inView ? { width: '100%' } : {}}
        transition={{ duration: 1, delay: delay + 0.5 }}
      />
    </motion.div>
  );
};

const AnimatedDashboard = () => {
  const stats = [
    { icon: DollarSign, value: '125.4K', label: 'Revenus Totaux' },
    { icon: Users, value: '2.4K', label: 'Utilisateurs Actifs' },
    { icon: Package, value: '856', label: 'Transactions' },
    { icon: TrendingUp, value: '+24%', label: 'Croissance' },
  ];

  return (
    <div className="animated-dashboard">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Tableau de Bord Digital Market Space
      </motion.h2>

      <div className="stats-grid adaptive-grid">
        {stats.map((stat, index) => (
          <AnimatedStatCard
            key={stat.label}
            {...stat}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Graphiques animés */}
      <motion.div
        className="animated-charts"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Intégration de graphiques avancés */}
      </motion.div>
    </div>
  );
};

export default AnimatedDashboard;
