import { useEffect, useState } from "react";
import { ethers, BigNumber } from 'ethers';
import contractNft from './contract.json';
import { Button, Flex, Box, Text, Input} from "@chakra-ui/react";

const contractAddress = "0xde031ff3Bc9798EBe8Cb408DEe012AAf110881Bf";

const Mainmint = ({accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const [totalMintCount, setTotalMintCount] = useState(0);
    const isConnected = Boolean(accounts[0]);

    const getTotalNFTsMintedSoFar = async () => {
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(
              contractAddress,
              contractNft,
              signer
            );
    
            let totalMinted = await connectedContract.totalSupply();
            setTotalMintCount(totalMinted)
          }
        } catch (error) {
          console.log(error);
        }
      };

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(
                contractAddress,
                contractNft,
                signer
            )


            try {
                if (mintAmount === 1) {
                    const response = await contract.mint(window.ethereum.selectedAddress, BigNumber.from(mintAmount));
                    console.log("resp: ", response);
                } else {
                    const price = (mintAmount - 1) * 0.005;
                    const response = await contract.mint(window.ethereum.selectedAddress, BigNumber.from(mintAmount), {value: ethers.utils.parseEther(String(price))});
                    console.log("resp: ", response);
                }
            } catch (err) {
                console.log("err: ", err);
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount >= 10) return;
        setMintAmount(mintAmount + 1);
    }

    useEffect(() => {
        getTotalNFTsMintedSoFar();
      }, []);

    return (
        <Flex position="absolute" left="65%" top="40%">
            <Box>
                <div>
                    <Text fontFamily="Ready Player 2P" fontSize="80px" textShadow="0 3px #000000" margin="0 10px" color="#ff8cdf">GentlemenPFP</Text>
                    <Text fontSize="35px" margin="0 0" textShadow="0 2px #000000" color="#ff8cdf">1 mint = FREE</Text>
                    <Text fontSize="35px" margin="0 0" textShadow="0 2px #000000" color="#ff8cdf">More = +0.005ETH Each</Text>

                    {isConnected ? (
                        <div>
                            <div>
                                <Text fontSize="25px" textShadow="0 1px #000000" color="#FFFFFF" fontSize="40px" marginTop="10px" marginBottom="10px">
                                    Total Mints: {Number(totalMintCount)}/ 3333
                                </Text>
                            </div>
                            <div>
                                <Button 
                                    onClick={handleDecrement}
                                    backgroundColor="#ff8cdf"
                                    fontFamily="inherit"
                                    boxShadow="0 2px 2px 1px #0F0F0F"
                                    color="white"
                                    cursor="pointer"
                                    height="50px"
                                    width="50px"
                                    fontSize="25px"
                                    >-</Button>
                                <Input 
                                    type="number"
                                    value={mintAmount}
                                    readOnly
                                    fontFamily="inherit"
                                    width="150px"
                                    height="50px"
                                    textAlign="center"
                                    paddingLeft="20px"
                                    marginTop="15px"
                                    
                                     />
                                <Button 
                                    onClick={handleIncrement}
                                    backgroundColor="#ff8cdf"
                                    fontFamily="inherit"
                                    boxShadow="0 2px 2px 1px #0F0F0F"
                                    color="white"
                                    cursor="pointer"
                                    height="50px"
                                    width="50px"
                                    fontSize="25px"
                                    >+</Button>
                            </div>
                            <Button 
                                    onClick={handleMint}
                                    backgroundColor="#ff8cdf"
                                    width="150px"
                                    fontFamily="inherit"
                                    boxShadow="0 2px 2px 1px #0F0F0F"
                                    color="white"
                                    cursor="pointer"
                                    padding="5px"
                                    marginTop="15px"
                                    fontSize="35px"
                                    >Mint</Button>
                        </div>) : (
                            <Text fontSize="45px">Not connected</Text>
                        )}
                </div>
            </Box>
        </Flex>
    );
}

export default Mainmint;