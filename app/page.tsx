'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { TokenCreator } from '@/components/TokenCreator'
import { TokenList } from '@/components/TokenList'
import { WalletBalance } from '@/components/WalletBalance'
import { useTokenStore } from '@/store/tokenStore'
import { 
  Plus, 
  Coins, 
  TrendingUp,
  Users,
  Zap
} from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('create')
  const { tokens, loading } = useTokenStore()

  const tabs = [
    { id: 'create', name: 'Create Token', icon: Plus },
    { id: 'manage', name: 'My Tokens', icon: Coins },
    { id: 'balance', name: 'Wallet', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Create</span>
              <br />
              <span className="text-white">Solana Tokens</span>
            </h1>
            <p className="text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
              Easily create, manage, and track your SPL tokens on the Solana blockchain. 
              No coding required!
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                {tokens.length}
              </div>
              <div className="text-sm text-dark-300">Tokens Created</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-secondary-400 mb-2">
                0.01 SOL
              </div>
              <div className="text-sm text-dark-300">Creation Cost</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                < 1 min
              </div>
              <div className="text-sm text-dark-300">Creation Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg mx-2 mb-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-800 text-dark-300 hover:text-white hover:bg-dark-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="card">
            {activeTab === 'create' && <TokenCreator />}
            {activeTab === 'manage' && <TokenList />}
            {activeTab === 'balance' && <WalletBalance />}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose Our Token Manager?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-dark-300">Create tokens in seconds with Solana's high-speed blockchain</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Low Cost</h3>
              <p className="text-dark-300">Minimal fees compared to other blockchains</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">User Friendly</h3>
              <p className="text-dark-300">Simple interface, no technical knowledge required</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 