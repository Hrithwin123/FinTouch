import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"


export default function VendorLogin(){

        const [name, setName] = useState("")
        const [password, setPassword] = useState("")

    
        const nav = useNavigate()
    
    
        async function submit(){
    
            const response = await fetch("http://localhost:3000/vendorLogin", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({name, password})
            })
            const data = await response.json()
            console.log(data)
            if(data.url){
                nav(data.url)
            }
        }
    
        return(
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col items-center justify-center p-6">
                <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <span className="text-white text-2xl font-bold">F</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Login to your Account</h1>
                        <p className="text-gray-600 text-sm">Access FingerPay to make secure transactions</p>
                    </div>
    
                    {/* Form */}
                    <div className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200" 
                                onChange={(e) => setName(e.target.value)}  
                                type="text" 
                                placeholder="Enter your full name"
                                value={name}
                            />
                        </div>
    
                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200" 
                                onChange={(e) => setPassword(e.target.value)}  
                                type="password" 
                                placeholder="Create a secure password"
                                value={password}
                            />
                        </div>
    
                        {/* Submit Button */}
                        <button 
                            className={`w-full py-4 px-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                                name && password 
                                    ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            onClick={submit}
                            disabled={!name || !password}
                        >
                            <div className="flex items-center justify-center">
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                ACCESS FINGER PAY
                            </div>
                        </button>
                    </div>
    
                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            Dont have an account ? 
                            <span onClick={() => nav("/signup")} className="text-orange-500 select-none cursor-pointer font-medium">&nbsp; Create One</span>
                        </p>
                    </div>
                </div>
    
                {/* Security Badge */}
                <div className="mt-6 flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Secured with 256-bit encryption
                </div>
            </div>
        )
    }



