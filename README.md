# Hifi Deployers

Deployer scripts for the Hifi protocol.

## Usage

### Deploy ChainlinkOperator

```sh
yarn hardhat --network "..." deploy:ChainlinkOperator
```

### Deploy HifiFlashUniswapV2

```sh
yarn hardhat --network "..." deploy:HifiProxyTaHifiFlashUniswapV2 --balance-sheet "0x..." --uniswap-v2-pair "0x..."
```

### Deploy HifiPool

```sh
yarn hardhat --network "..." deploy:HifiPool --name "..." --symbol "..." --h-token "0x..."
```

### Deploy HifiProxyTarget

```sh
yarn hardhat --network "..." deploy:HifiProxyTarget
```

### Deploy HToken

```sh
yarn hardhat --network "..." deploy:HToken --name "..." --symbol "..." --maturity "..." --balance-sheet "0x..." ---underlying "0x..."
```

### Deploy SimplePriceFeed

```sh
yarn hardhat --network "..." deploy:SimplePriceFeed --description "..."
```

### Deploy StablecoinPriceFeed

```sh
yarn hardhat --network "..." deploy:StablecoinPriceFeed --price "..." --description "..."
```
