import { getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { kairos as network } from 'viem/chains';
import { http } from 'wagmi';

const { wallets } = getDefaultWallets();

const walletConfig = getDefaultConfig({
  appName: 'DuckAI',
  projectId: '751b1d4c011ba8ed39b66aa84166a7ec',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [trustWallet, ledgerWallet],
    },
  ],
  chains: [network],
  transports: {
    [network.id]: http(''),
  },
  ssr: true,
});

export default walletConfig;
export { network };
