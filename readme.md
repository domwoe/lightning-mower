### Introduction

Digital currencies have promised to enable instant micropayments over the internet. Micropayments allow direct payments and settlement instead of cumbersome accounting and reconciliation processes. Furthermore, micropayments enables new kinds of trades between strangers since payers do not need to advance much payment and trust in the payee. 

However, decentralized digital currencies rely on a global consensus between many nodes to prevent double spending. Thus, payment transactions can't be instant and shouldn't be free, because each transaction represents a load on the network.

Bitcoin is the oldest decentralized digital currency and has the greatest diffusion. Bitcoin transactions are considered final after some (typical six) confirmations, which translates into about 1 hour,  and transaction costs are around 0.15$ currently.

There are multiple projects developing Layer 2 systems and networks on top of decentralized digital currencies to enable instant micropayments without giving up much of the security features. The most advanced project is the Lightning Network which sits on top of Bitcoin or Bitcoin-like network. During this hackathon we wanted to try the clients and libraries that are being built for the lightning network to get a feeling for the current state and what can be done with it. 

#### Use Case

We decided to upgrade the Bosch Indego autonomous lawn mower to accept lightning payments. The owner is able to set a price per second and then the Indego can be paid-per-use by the second. 
While this might seem not very useful at first, there are cases where pay per use models are very important. For example in sub saharan africa or south eastern asia a lot of solar home systems are on a pay per use basis, since most of the population is not able to pay for such a system at once, and the financial service industry is not able to serve them. Payments are handled with mobile payments based on mobile minutes, but trading against other currencies is expensive and the system is gated and a single point of failure. Payments based on decentralized digital currencies would provide many advantagages to current centralized systems.

### Technology Stack

The following graphic illustrates our technology stack

![alt text](https://raw.githubusercontent.com/domwoe/lightning-mower/master/assets/stack.png)


### Learnings