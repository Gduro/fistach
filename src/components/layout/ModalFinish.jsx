import React from 'react'
import { useNavigate } from 'react-router-dom'
 const ModalFinish = ({handleModal}) => {
    const navigate = useNavigate();
  return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={handleModal}></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="mt-3">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="mt-2 text-center">
                            <h4 className="text-base font-medium text-gray-800">
                                 Gratulację!
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                    Właśnie ukończyłeś powtarzanie zestawu!
                            </p>
                        </div>
                    </div>
                    <div className="items-center gap-2 mt-3 sm:flex">
                        <button className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                            onClick={handleModal}
                        >
                            Powtórz
                        </button>
                        <button className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                            onClick={()=>{navigate("/")}}
                        >
                            Wyjdź
                        </button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ModalFinish;