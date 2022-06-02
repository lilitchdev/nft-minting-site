import React from 'react';
import { Button, Flex, Image, Link} from "@chakra-ui/react";
import Twitter from "./assets/twiitter.png";
import Etherscan from "./assets/etherscan.png";
import Opensea from "./assets/opensea.png";


const NavBar = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setAccounts(accounts);
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
                <Link href="https://rinkeby.etherscan.io/address/0xde031ff3Bc9798EBe8Cb408DEe012AAf110881Bf">
                    <Image src={Etherscan} boxSize="75px" margin="0 15px"></Image>
                </Link>
            </Flex>
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://testnets.opensea.io/collection/last-testing-bro">
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