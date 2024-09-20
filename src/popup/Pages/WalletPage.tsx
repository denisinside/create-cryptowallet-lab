import React, { useState } from 'react'
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { NavLink } from 'react-router-dom'

const WalletPage: React.FC = () => {
  const network = 'https://api.devnet.solana.com';

  const [pubKeyInput, setPublicKey] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [balance, setBalance] = useState<number>(0)
  const [isValid, setIsValid] = useState<boolean>(false)

  const generateAddress = async () => {
    try {
      const pubKey = new PublicKey(pubKeyInput)
      setAddress(pubKey.toString())
      setIsValid(true)

      const connection = new Connection(network, "confirmed");
      const balanceInLamports = await connection.getBalance(pubKey);
      setBalance(balanceInLamports / LAMPORTS_PER_SOL);
      console.log(connection.getAccountInfo(pubKey));
    } catch (err) {
      setIsValid(false)
      alert('Incorrect public key.')
    }
  }

  return (
    <div>
      <div className=" bg-gray-200 flex items-center justify-center border border-gray-400">
        <h1 className="text-xl font-bold">Wallet Page</h1>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <h3>Public key</h3>
          <input
            type="text"
            value={pubKeyInput}
            onChange={(e) => setPublicKey(e.target.value)}
            className="w-full p-2 mb-1 mt-1 border rounded"
          />
          <button className="w-full bg-blue-500 text-white p-2" onClick={generateAddress}>
            Submit
          </button>
          {isValid && (
            <div className="mt-5 items-center">
              <h3 className="text-green-500">Valid Address:</h3>
              <p className="break-all">{address}</p>
              <h3 className="text-fuchsia-900">Balance:</h3>
              <p className="break-all">{balance} SOL</p>
              <NavLink
                className="active"
                to={'https://explorer.solana.com/address/' + address + '?cluster=devnet'}
              >
                Check on Explorer
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WalletPage
