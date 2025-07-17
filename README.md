# 🪙 Solana Token Manager

A simple yet powerful tool for creating and managing SPL tokens on the Solana blockchain. Perfect for developers and non-technical users who want to create their own tokens without complex coding.

## ✨ Features

### 🚀 Core Functionality
- **Token Creation** - Create SPL tokens with custom name, symbol, and supply
- **Token Management** - View and manage all your created tokens
- **Wallet Integration** - Connect with Phantom, Solflare, and other Solana wallets
- **Balance Tracking** - Monitor SOL balance and token holdings
- **Copy & Share** - Easy copying of token addresses and wallet info

### 🎯 User-Friendly Features
- **Simple Interface** - Clean, intuitive design for all skill levels
- **Real-time Updates** - Live balance and token information
- **Mobile Responsive** - Works perfectly on all devices
- **No Coding Required** - Point-and-click token creation

### 🔧 Technical Features
- **Solana Devnet** - Test your tokens safely
- **SPL Token Standard** - Industry-standard token implementation
- **Wallet Adapter** - Multi-wallet support
- **TypeScript** - Type-safe development

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management

### Blockchain
- **Solana Web3.js** - Solana blockchain interaction
- **SPL Token** - Token creation and management
- **Wallet Adapter** - Multi-wallet support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Phantom or Solflare wallet
- Solana Devnet SOL (free from faucet)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/solana-token-manager.git
cd solana-token-manager
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
solana-token-manager/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── TokenCreator.tsx   # Token creation form
│   ├── TokenList.tsx      # Token management
│   ├── WalletBalance.tsx  # Wallet info display
│   └── WalletProvider.tsx # Wallet connection
├── store/                 # State management
│   └── tokenStore.ts      # Token state store
├── types/                 # TypeScript types
│   └── index.ts           # Type definitions
└── public/                # Static assets
```

## 🎯 How to Use

### 1. Connect Your Wallet
- Click "Connect Wallet" in the header
- Choose your preferred Solana wallet (Phantom, Solflare, etc.)
- Approve the connection

### 2. Create a Token
- Navigate to the "Create Token" tab
- Fill in the token details:
  - **Name**: Your token's full name
  - **Symbol**: Short symbol (3-10 characters)
  - **Decimals**: Usually 9 for most tokens
  - **Total Supply**: Number of tokens to create
  - **Description**: Optional description
  - **Website**: Optional website URL
- Click "Create Token"
- Approve the transaction in your wallet

### 3. Manage Your Tokens
- View all your created tokens in the "My Tokens" tab
- Copy token addresses for sharing
- View token details and status
- Access external links (website, explorer)

### 4. Check Your Balance
- View your SOL balance in the "Wallet" tab
- See all token holdings
- Copy wallet address
- View network information

## 💰 Costs

- **Token Creation**: ~0.01 SOL (approximately $1-2)
- **Network**: Solana Devnet (free for testing)
- **Mainnet**: Switch to mainnet for real tokens

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Adding Features

1. **Create new components** in `components/`
2. **Add types** in `types/index.ts`
3. **Update store** in `store/tokenStore.ts`
4. **Test thoroughly** before deployment

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Your app will be live at `https://your-app.vercel.app`

### Environment Variables
```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_RPC_ENDPOINT=https://api.devnet.solana.com
```

## 📊 Why This Project?

### Perfect for Portfolio
- **Demonstrates Solana Knowledge** - Shows understanding of SPL tokens
- **Real Blockchain Interaction** - Actual Solana transactions
- **Modern Tech Stack** - Next.js, TypeScript, Tailwind
- **User-Friendly** - Accessible to non-technical users
- **Production Ready** - Can be deployed and used immediately

### Career Benefits
- **Web3 Development Skills** - Highly sought after
- **Solana Ecosystem** - Growing blockchain platform
- **Full-Stack Experience** - Frontend + blockchain integration
- **User Experience** - Clean, professional interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Solana Labs](https://solana.com/) for the blockchain platform
- [SPL Token](https://spl.solana.com/token) for token standards
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

- **Documentation**: [docs.tokenmanager.com](https://docs.tokenmanager.com)
- **Discord**: [Join our community](https://discord.gg/tokenmanager)
- **Email**: support@tokenmanager.com
- **Twitter**: [@TokenManager](https://twitter.com/TokenManager)

---

**Built with ❤️ for the Solana ecosystem**

*Perfect for developers looking to showcase their Solana skills!* 