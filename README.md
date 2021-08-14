Start the example!

Deploy on testnet
```
near login -> login to vanhiepdam.testnet
yarn deploy:dev
```

## To run example

```
- Add candidate
near call dev-1628947128667-27216166287904 --accountId vanhiepdam.testnet addCandidate '{"code": "c1"}'
near call dev-1628947128667-27216166287904 --accountId vanhiepdam.testnet addCandidate '{"code": "c2"}'
near call dev-1628947128667-27216166287904 --accountId vanhiepdam.testnet addCandidate '{"code": "c3"}'

- Find winners
near call dev-1628947128667-27216166287904 --accountId vanhiepdam.testnet findWinners '{}'

- Vote for candidate
near call dev-1628947128667-27216166287904 --accountId vanhiepdam.testnet vote '{"candidateCode": "c3"}'

- Find winners
near call dev-1628947128667-27216166287904 --accountId vanhiepdam.testnet findWinners '{}'

Expected output: candidate c3

- Login to another account | hieptest01.testnet
near login
near call dev-1628947128667-27216166287904 --accountId hieptest01.testnet vote '{"candidateCode": "c1"}'

- Login to another account | hieptest02.testnet
near login
near call dev-1628947128667-27216166287904 --accountId hieptest02.testnet vote '{"candidateCode": "c1"}'

- Find winners
near call dev-1628947128667-27216166287904 --accountId vanhiepdam.testnet findWinners '{}'

Expected output: candidate c1
```
