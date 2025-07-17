'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  Clock,
  Star
} from 'lucide-react'

const stats = [
  {
    id: 1,
    name: 'Total NFTs',
    value: '12,847',
    change: '+12%',
    changeType: 'positive',
    icon: ShoppingBag,
  },
  {
    id: 2,
    name: 'Total Volume',
    value: '$2.4M',
    change: '+8.2%',
    changeType: 'positive',
    icon: DollarSign,
  },
  {
    id: 3,
    name: 'Active Users',
    value: '8,234',
    change: '+15%',
    changeType: 'positive',
    icon: Users,
  },
  {
    id: 4,
    name: 'Floor Price',
    value: '2.5 SOL',
    change: '+5.3%',
    changeType: 'positive',
    icon: TrendingUp,
  },
  {
    id: 5,
    name: 'Active Auctions',
    value: '156',
    change: '+3.1%',
    changeType: 'positive',
    icon: Clock,
  },
  {
    id: 6,
    name: 'Featured Collections',
    value: '24',
    change: '+2',
    changeType: 'positive',
    icon: Star,
  },
]

export const Stats = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Marketplace Statistics
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Real-time data from our thriving NFT marketplace
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card group hover:border-primary-500 transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-dark-300">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-primary-400" />
                </div>
              </div>
              
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' 
                    ? 'text-green-400' 
                    : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-dark-300 ml-2">
                  from last month
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-400 mb-2">
              99.9%
            </div>
            <div className="text-sm text-dark-300">
              Uptime
            </div>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl font-bold text-secondary-400 mb-2">
              24/7
            </div>
            <div className="text-sm text-dark-300">
              Support
            </div>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              0.1%
            </div>
            <div className="text-sm text-dark-300">
              Platform Fee
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 