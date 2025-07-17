'use client'

import { useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useTokenStore } from '@/store/tokenStore'
import { 
  Wallet, 
  Coins, 
  Copy, 
  ExternalLink,
  RefreshCw
} from 'lucide-react'
import toast from 'react-hot-toast'

export const WalletBalance = () => {
  const { publicKey } = useWallet()
  const { walletInfo, loading, fetchWalletInfo } = useTokenStore()

  useEffect(() => {
    if (publicKey) {
      fetchWalletInfo()
    }
  }, [publicKey, fetchWalletInfo])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatBalance = (amount: number, decimals: number) => {
    return (amount / Math.pow(10, decimals)).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    })
  }

  if (!publicKey) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-8 h-8 text-dark-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Wallet Not Connected</h3>
        <p className="text-dark-300">Connect your wallet to view your balance</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="card animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-dark-700 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="bg-dark-700 h-4 rounded w-1/4"></div>
              <div className="bg-dark-700 h-3 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Wallet Balance</h2>
        <button
          onClick={fetchWalletInfo}
          className="p-2 hover:bg-dark-700 rounded-lg transition-colors duration-200"
        >
          <RefreshCw className="w-5 h-5 text-dark-400" />
        </button>
      </div>

      {walletInfo && (
        <>
          {/* SOL Balance */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">SOL Balance</h3>
                  <p className="text-sm text-dark-300">Solana Native Token</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {walletInfo.balance.toFixed(4)} SOL
                </div>
                <div className="text-sm text-dark-300">
                  ≈ ${(walletInfo.balance * 100).toFixed(2)} USD
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Address */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Wallet Address</h3>
                <p className="text-sm text-dark-300 font-mono">
                  {formatAddress(walletInfo.publicKey)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyToClipboard(walletInfo.publicKey)}
                  className="p-2 hover:bg-dark-700 rounded-lg transition-colors duration-200"
                >
                  <Copy className="w-4 h-4 text-dark-400" />
                </button>
                <a
                  href={`https://explorer.solana.com/address/${walletInfo.publicKey}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-dark-700 rounded-lg transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4 text-primary-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Token Holdings */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Token Holdings</h3>
            
            {walletInfo.tokens.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Coins className="w-6 h-6 text-dark-400" />
                </div>
                <p className="text-dark-300">No tokens found in wallet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {walletInfo.tokens.map((token, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-dark-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <Coins className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {token.name || 'Unknown Token'}
                        </p>
                        <p className="text-xs text-dark-300 font-mono">
                          {token.symbol || formatAddress(token.mint)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-mono">
                        {formatBalance(token.amount, token.decimals)}
                      </p>
                      <p className="text-xs text-dark-300">
                        {token.symbol || 'TOKEN'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Network Info */}
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-400 mb-1">
                  Devnet
                </div>
                <div className="text-sm text-dark-300">Network</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {walletInfo.tokens.length}
                </div>
                <div className="text-sm text-dark-300">Tokens</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-400 mb-1">
                  Active
                </div>
                <div className="text-sm text-dark-300">Status</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 