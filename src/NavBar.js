import React from 'react';
import { Button, Flex, Image, Link} from "@chakra-ui/react";
import Twitter from "./assets/twiitter.png";
import Etherscan from "./assets/etherscan.png";
import Opensea from "./assets/opensea.png";
import { ethers } from 'ethers';
import contractNft from './contract.json';

const contractAddress = "0x03c8974f24b2fedf1960ab045c9e8cc268f03386";
const chainId = 1;

const NavBar = ({accounts, setAccounts, totalMintCount, setTotalMintCount}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setAccounts(accounts);

            if (window.ethereum.networkVersion !== chainId) {
                  await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: "0x1" }]
                  });
            }
            

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(
              contractAddress,
              contractNft,
              signer
            );
    
            let totalMintCount = await connectedContract.totalSupply();
            setTotalMintCount(totalMintCount)
          }

        }


    return (
        <Flex justify="space-between" align="center" padding="25px" >
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://twitter.com/GentlemenPFP">
                    <Image src={Twitter} boxSize="75px" margin="0 15px"></Image>
                </Link>
            </Flex>
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://etherscan.io/address/0x03c8974f24b2fedf1960ab045c9e8cc268f03386">
                    <Image src={Etherscan} boxSize="75px" margin="0 15px"></Image>
                </Link>
            </Flex>
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://opensea.io/collection/gentlemenpfp">
                    <Image src={Opensea} boxSize="75px" margin="0 15px"></Image>
                </Link>
            </Flex>

            

            {isConnected ? (
                <Flex justify="space-around" width="40%" padding="0 75px">
                    <Button 
                        backgroundColor="#ff8cdf" 
                        onClick={connectAccount}
                        fontFamily="inherit"
                        fontSize="40px"
                        padding="10px"
                        margin="0 15px"
                        boxShadow="0 2px 2px 1px #0093ff">
                    Connected</Button>
            </Flex>
            ) : (<Flex justify="space-around" width="40%" padding="0 75px">
                    <Button 
                    backgroundColor="#ff8cdf" 
                    onClick={connectAccount}
                    fontFamily="inherit"
                    fontSize="40px"
                    padding="10px"
                    margin="0 15px"
                    boxShadow="0 2px 2px 1px #0093ff">
                        Connect</Button>
                </Flex>)}
        </Flex>
    )
}

export default NavBar;