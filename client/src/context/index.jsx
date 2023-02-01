import React, { useContext, createContext } from 'react'

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react'
import { ethers } from 'ethers'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x0491f73135fC3cd5c89D52593fBE6BB201464442')
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign')

    const address = useAddress()
    const connect = useMetamask()

    const publishCampaign = async(form) => {
        try {
            const data = await createCampaign([
                address, //owner
                form.title, //title
                form.description, //description
                form.target,
                new Date(form.deadline).getTime(), //deadline
                form.image
            ])
            console.log("Successfully called contract")
        } catch (error) {
            console.log("Contract call failure", error)
        }
    }

    return (
        <StateContext.Provider
            value={{ 
                address,
                contract,
                creamteCampaign: publishCampaign,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)