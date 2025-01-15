'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Copy, Check, Network, Zap, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { GiDuck } from 'react-icons/gi';

export function CustomConnectButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  function formatAddress(address: string) {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }

  const handleCopy = (e: React.MouseEvent, address: string) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(() => {});
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        if (!ready) {
          return (
            <Button
              variant="outline"
              disabled
              className="rounded-xl border-primary/20 bg-primary/5"
            >
              <div className="h-5 w-5 animate-pulse rounded-full bg-primary/20" />
            </Button>
          );
        }

        if (!connected) {
          return (
            <Button
              onClick={openConnectModal}
              variant="default"
              className="relative overflow-hidden rounded-xl group bg-primary hover:bg-primary/90 text-primary-foreground"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div
                    className={`transition-transform duration-300 ${
                      isHovered ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <GiDuck className="h-5 w-5" />
                  </div>
                  <div className="absolute inset-0 animate-ping opacity-30">
                    <GiDuck className="h-5 w-5" />
                  </div>
                </div>
                <span className="font-medium">Connect Wallet</span>
              </div>
            </Button>
          );
        }

        if (chain.unsupported) {
          return (
            <Button
              onClick={openChainModal}
              variant="destructive"
              className="rounded-xl"
            >
              <Network className="mr-2 h-5 w-5" />
              Wrong Network
            </Button>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <Button
              onClick={openChainModal}
              variant="outline"
              size="sm"
              className="rounded-xl border-primary/20 bg-primary/5 text-xs font-medium hover:bg-primary/10"
            >
              <div className="flex items-center gap-2">
                {chain.hasIcon && (
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    {chain.iconUrl && (
                      <img
                        alt={chain.name ?? 'Chain icon'}
                        src={chain.iconUrl}
                        className="h-4 w-4"
                      />
                    )}
                  </div>
                )}
                <span>{chain.name}</span>
              </div>
            </Button>

            <Button
              onClick={openAccountModal}
              variant="outline"
              size="sm"
              className="rounded-xl border-primary/20 bg-primary/5 hover:bg-primary/10 group"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 group-hover:bg-primary/30">
                  <Wallet className="h-3 w-3 text-primary" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium">
                    {account.displayBalance}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] opacity-70">
                      {formatAddress(account.address)}
                    </span>
                    <button
                      onClick={(e) => handleCopy(e, account.address)}
                      className="group/copy"
                    >
                      {isCopied ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 opacity-50 group-hover/copy:opacity-100 transition-opacity" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
