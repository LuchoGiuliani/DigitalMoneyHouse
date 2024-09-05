import Image from 'next/image'
import React from 'react'

const AccountData = ({accountData, handleCopy}) => {
  
  return (
    <div>
         {accountData && (
            <article className="bg-color-darker text-white p-4 rounded-md drop-shadow-md flex flex-col gap-4">
              <h2 className="text-white">
                Copia tu CVU o alias para ingresar o transferir dinero desde
                otra cuenta
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-color-primary">CVU</h2>
                    <h3>{accountData.cvu}</h3>
                  </div>
                  <button
                    onClick={() => handleCopy(accountData.cvu)}
                    className=" text-white p-2 rounded"
                  >
                    <Image
                      width={22}
                      height={22}
                      alt="iconoCopy"
                      src="/copy.svg"
                      className="w-auto h-auto"
                    />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-color-primary">Alias</h2>
                    <h3>{accountData.alias}</h3>
                  </div>
                  <button
                    onClick={() => handleCopy(accountData.alias)}
                    className=" text-white p-2 rounded"
                  >
                    <Image
                      width={22}
                      height={22}
                      alt="iconoCopy"
                      src="/copy.svg"
                      className="w-auto h-auto"
                    />
                  </button>
                </div>
              </div>
            </article>
          )}
    </div>
  )
}

export default AccountData