import { useWeb3React } from "@web3-react/core"
import { injected } from "../components/wallet/Connectors"
import React, { useState, useEffect } from 'react';
import mintingPic from '../public/minting.gif'
let Web3 = require('web3');

export default function Home() {
  const [web3, setWeb3] = useState(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [mintAmount, setMintAmount] = useState("3");
  const [contract, setContract] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);
  const [imgDim, setImgDim] = useState(0);

  const abi = [{ "inputs": [{ "internalType": "string", "name": "_initBaseURI", "type": "string" }, { "internalType": "string", "name": "_initNotRevealedUri", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseExtension", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cost", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "freeMint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_address", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amount", "type": "uint256[]" }], "name": "freeMintAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "freeMinters", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxMintAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_mintAmount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "notRevealedUri", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "reveal", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "revealed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_newBaseExtension", "type": "string" }], "name": "setBaseExtension", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_newBaseURI", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newCost", "type": "uint256" }], "name": "setCost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_notRevealedURI", "type": "string" }], "name": "setNotRevealedURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "_state", "type": "bool" }], "name": "setOnlyWhitelisted", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "_state", "type": "bool" }], "name": "setPause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_whitelistedSupply", "type": "uint256" }], "name": "setWhitelistedSupply", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newmaxMintAmount", "type": "uint256" }], "name": "setmaxMintAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }], "name": "walletOfOwner", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "whiteList", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_address", "type": "address[]" }], "name": "whitelistAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_mintAmount", "type": "uint256" }], "name": "whitelistMint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "whitelistOnly", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "whitelistedSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "payable", "type": "function" }];
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT;

  async function selectMintType() {
    setSelected(true);
  }

  async function mint() {
    setLoading(true);
    window.ethereum ?
      ethereum.request({ method: "eth_requestAccounts" }).then((account) => {
        let gasLimit = mintAmount > 1 ? 200000 + (100000 * mintAmount) : 250000;
        contract.methods.mint(mintAmount).send({
          gasLimit: gasLimit,
          to: contractAddress,
          from: account.toString(),
          value: Web3.utils.toWei((0.055 * mintAmount).toString(), "ether")
        }).then((receipt) => {
          console.log(receipt);
          setLoading(false);
        }).catch((err) => {
          setLoading(false);
          console.log(err)
        });
      }).catch((err) => console.log(err)) : console.log("Please install MetaMask");
  }

  async function connect() {
    window.ethereum ?
      ethereum.request({ method: "eth_requestAccounts" }).then((account) => {
        setConnected(true);
        let w3 = new Web3(ethereum);
        let contract = new w3.eth.Contract(abi, contractAddress);
        setContract(contract);

        // set totalSupply
        contract.methods.totalSupply().call().then((_supply) => {
          setTotalSupply(_supply);
        }).catch((err) => console.log(err));

      }).catch((err) => console.log(err))
      : setConnected(false);
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  function renderMint() {
    return (
      <div>
        <h3 className="text-white self-start font-sans font-semibold mb-4">
          Select how many EKKOs you want to mint
        </h3>

        <label className="text-black font-mono flex items-center bg-white rounded p-3 mb-3 hover:bg-gray-200 cursor-pointer">
          <div className="flex -space-x-3 overflow-hidden ml-2">
            {renderEKKOLogo()}
          </div>
          <span className="font-bold ml-2 mr-1">1</span> EKKO
          <input
            type="radio" name="nft_amount"
            value="1"
            checked={mintAmount === "1"}
            onChange={(e) => setMintAmount(e.target.value)}
            className="ml-auto"
          />
        </label>
        <label className="text-black font-mono flex items-center bg-white rounded p-3 mb-3 hover:bg-gray-200 cursor-pointer">
          <div className="flex -space-x-3 overflow-hidden ml-2">
            {renderEKKOLogo()}
            {renderEKKOLogo()}
          </div>
          <span className="font-bold ml-2 mr-1">2</span> EKKOs
          <input
            type="radio" name="nft_amount"
            value="2"
            checked={mintAmount === "2"}
            onChange={(e) => setMintAmount(e.target.value)}
            className="ml-auto"
          />
        </label>
        <label className="text-black font-mono flex items-center bg-white rounded p-3 mb-3 hover:bg-gray-200 cursor-pointer">
          <div className="flex -space-x-3 overflow-hidden ml-2">
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
          </div>
          <span className="font-bold ml-2 mr-1">3</span> EKKOs
          <input
            type="radio" name="nft_amount"
            value="3"
            checked={mintAmount === "3"}
            onChange={(e) => setMintAmount(e.target.value)}
            className="ml-auto"
          />
        </label>
        <label className="text-black font-mono flex items-center bg-white rounded p-3 mb-3 hover:bg-gray-200 cursor-pointer">
          <div className="flex -space-x-3 overflow-hidden ml-2">
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
          </div>
          <span className="font-bold ml-2 mr-1">4</span> EKKOs
          <input
            type="radio" name="nft_amount"
            value="4"
            checked={mintAmount === "4"}
            onChange={(e) => setMintAmount(e.target.value)}
            className="ml-auto"
          />
        </label>
        <label className="text-black font-mono flex items-center bg-white rounded p-3 mb-3 hover:bg-gray-200 cursor-pointer">
          <div className="flex -space-x-3 overflow-hidden ml-2">
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
          </div>
          <span className="font-bold ml-2 mr-1">5</span> EKKOs
          <input
            type="radio" name="nft_amount"
            value="5"
            checked={mintAmount === "5"}
            onChange={(e) => setMintAmount(e.target.value)}
            className="ml-auto"
          />
        </label>
        {/* <label className="text-black font-mono flex items-center bg-white rounded p-3 mb-3 hover:bg-gray-200 cursor-pointer">
          <div className="flex -space-x-3 overflow-hidden ml-2">
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
          </div>
          <span className="font-bold ml-2 mr-1">6</span> EKKOs
          <input
            type="radio" name="nft_amount"
            value="6"
            checked={mintAmount === "6"}
            onChange={(e) => setMintAmount(e.target.value)}
            className="ml-auto"
          />
        </label>
        <label className="text-black font-mono flex items-center bg-white rounded p-3 mb-3 hover:bg-gray-200 cursor-pointer">
          <div className="flex -space-x-3 overflow-hidden ml-2">
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
          </div>
          <span className="font-bold ml-2 mr-1">7</span> EKKOs
          <input
            type="radio" name="nft_amount"
            value="7"
            checked={mintAmount === "7"}
            onChange={(e) => setMintAmount(e.target.value)}
            className="ml-auto"
          />
        </label>
        <label className="text-black font-mono flex items-center bg-white rounded p-3 mb-3 hover:bg-gray-200 cursor-pointer">
          <div className="flex -space-x-3 overflow-hidden ml-2">
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
            {renderEKKOLogo()}
          </div>
          <span className="font-bold ml-2 mr-1">8</span> EKKOs
          <input
            type="radio" name="nft_amount"
            value="8"
            checked={mintAmount === "8"}
            onChange={(e) => setMintAmount(e.target.value)}
            className="ml-auto"
          />
        </label> */}
        <div className="flex">
          <button
            className="btn btn bg-gray-700 hover:bg-gray-800 text-white"
            onClick={(e) => {
              e.preventDefault();
              setConnected(false);
              setLoading(false);
            }}
          >← Go back</button>
          <button
            className="btn bg-green-500 hover:bg-green-400 text-white ml-auto flex items-center"
            onClick={(e) => {
              e.preventDefault();
              mint();
            }}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Mint {mintAmount} <span className="text-gray-200 ml-2 mt-0.5">{parseFloat(mintAmount * 0.055).toFixed(3)}Ξ</span>
          </button>
        </div>
        <div className="mt-6">
          <p className="text-gray-400">By minting, you agree to the <a
            href="https://ekko-academy.com/terms.html"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400"
          >terms and conditions</a>
          </p>
        </div>
        <div className="mt-8">
          <a
            href="https://ekko-academy.com/howtomint.html"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400"
          >Questions? Learn how to mint</a>
        </div>
      </div>
    )
  }

  function renderEKKOLogo() {
    return (
      <img
        className="w-6 h-6 rounded-full ring-2 ring-white"
        src="/ekko_mint_logo.jpg"
        alt="ekko logo"
      />
    )
  }

  function renderConnect() {
    return (
      <div className="md:text-left md:mt-0 mt-4 text-center">
        <button
          className="bg-gray-700 rounded-lg px-8 font-bold tracking-wid bg-blue-500 font-medium p-4 text-white sm:text-center"
          onClick={(e) => {
            e.preventDefault();
            setConnected(true);
            connect();
          }}
        >Connect wallet</button>
        <div className="mt-8">
          <a
            href="https://ekko-academy.com/howtomint.html"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400"
          >Questions? Learn how to mint</a>
        </div>
      </div>
    );
  }

  function renderSelectMintType() {
    return (
      <div>
        <button
          className="btn btn--white text-white ml-2"
          onClick={selectMintType}
        >Mint</button>
      </div>
    )
  }

  function renderContent() {
    if (connected === false) { return renderConnect(); }
    if (connected === true) { return renderMint(); }
    // if (selected === false) return renderSelectMintType();

  }

  return (
    <main>
      <div className="h-screen bg-red flex sm:px-0 px-2">
        <div className="App w-full flex flex-col justify-center items-center">
          <h1 className="text-white text-sm md:text-xl xl:text-4xl font-bold">
            You are about to mint your E.K.K.O. NFT(s).
          </h1>
          <p className="text-gray-400 mt-6 font-sans">E.K.K.O’s minted</p>
          <h1 className="text-white mb-12 font-sans mb-2">{totalSupply ? totalSupply : "please connect your wallet"} / 5555</h1>
          <div className="grid justify-items-center md:grid-cols-2 md:gap-12 items-center max-w-800px">
            <img
              className="rounded-lg"
              src="/minting.gif"
              alt="ekko hero"
              height={320}
              width={320}
            />
            {renderContent()}
          </div>
        </div>
      </div>
    </main>
  )
}