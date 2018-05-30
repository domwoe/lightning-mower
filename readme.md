### Introduction

Digital currencies have promised to enable instant micropayments over the internet. Micropayments allow direct payments and settlement instead of cumbersome accounting and reconciliation processes. Furthermore, micropayments enables new kinds of trades between strangers since payers do not need to advance much payment and trust in the payee. 

However, decentralized digital currencies rely on a global consensus between many nodes to prevent double spending. Thus, payment transactions can't be instant and shouldn't be free, because each transaction represents a load on the network.

Bitcoin is the oldest decentralized digital currency and has the greatest diffusion. Bitcoin transactions are considered final after some (typical six) confirmations, which translates into about 1 hour,  and transaction costs are around 0.15$ currently.

There are multiple projects developing Layer 2 systems and networks on top of decentralized digital currencies to enable instant micropayments without giving up much of the security features. The most advanced project is the Lightning Network which sits on top of Bitcoin or Bitcoin-like network. During this hackathon we wanted to try the clients and libraries that are being built for the lightning network to get a feeling for the current state and what can be done with it. 

### Use Case

We decided to upgrade the Bosch Indego autonomous lawn mower to accept lightning payments. The owner is able to set a price per second and then the Indego can be paid-per-use by the second. Of course, this model is only for demonstration, but having the ability to switch a device to a pay per use model could be very powerful. 

For example in sub saharan Africa or south east Asia a lot of solar home systems are on a pay per use basis, since most of the population is not able to pay for such a system at once, and the financial service industry is not able to serve them. Payments are handled with mobile payments based on mobile minutes, but trading against other currencies is expensive and the system is gated and a single point of failure. Payments based on decentralized digital currencies would provide many advantagages to current centralized systems.

### Technology Stack

The following graphic illustrates our technology stack.

![technology stack](https://raw.githubusercontent.com/domwoe/lightning-mower/master/assets/stack.png)

We deliberately tried to run as much as possible locally instead of the cloud. Therefore, we augmented the Indego directly with a Raspberry Pi. The Indego provides a serial interface via USB for testing and troubleshooting. We connected the Raspberry Pi and wrote software that provides some of the serial interface via a local RESTful HTTP API.

Furthermore, the Pi runs the c-lightning implementation of a lightning network node. In order to not have to sync the Bitcoin blockchain on the Pi, we only built and installed Bitcoin core locally on the Pi, but connected the bitcoin-cli to the PRC interface of a remote node running in the cloud. c-lightning is not yet able to use a Bitcoin Light node as an interface to the Bitcoin network. In contrast, the lightning network implementation of Lightning Labs lnd would be able use the Neutrino light client (at least on the Bitcoin testnet).

In order to create lighting payment requests, and to keep track of payments, we used the Lightning Charge library by Blockstream. The payment can be made by every lightning compatible wallet. In our demo we used the Android wallet Eclair.


### Demo

![Indego](https://raw.githubusercontent.com/domwoe/lightning-mower/master/assets/lightning_mower.jpg)


### Learnings

Transaction costs are crucial when offering micropayment solutions. Implementing the Lightning network on a smart device such as the lawn mower in this case we found out that transaction costs amount to … - a fraction of what today’s payment service provider charge. However, this was possible after opening a Bosch payment channel to the device directly. 
Since the official release, more 2000 nodes and 6000 channels have been opened up on the lightning main net what proves the acceptance of such a technology in the market. Despite the early state of the technology, one can observe a steady growth in nodes and channels. Therefore, the low transaction costs and network growth provide evidence that Lightning delivers a suitable infrastructure for micropayments. 


### Outlook

Micropayments hold many promises for users as well as sellers. They enable new business models such as “machine as a service”. Users and clients not need to pony up a larger sum of money to start making purchases. They only purchase what they want, and they pay when they want to. It allows transferring fixed assets (CAPEX) to OPEX. Users now can manage risks and fees better than before. 
On the other side providers such as Bosch can build up new revenue models as usage based paying and billing for example. This allows to address more customers by better serving their specific needs. In addition, payments across multiple countries for products and services can be simplified. 
Overall micropayments are an important step towards the economy of things where machines act as autonomous agents and directly communicate, negotiate and pay each other. 
Still there is room for improvement. As usability of such a solution highly depends on the individual use case, new UX concepts need to be worked out. Therefore, we plan to realize more projects to enable more machines and smart devices to accept micropayments and pave the way for better service offerings. Let us know which use case you have in mind.  
