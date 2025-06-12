import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function Signup(){
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")   //BMPBase64
    const [template, setTemplate] = useState("")
    const [isScanning, setIsScanning] = useState(false)

    const nav = useNavigate()

    async function scanFinger(){
        setIsScanning(true)
        try {
            const response = await fetch("http://localhost:3000/scanFinger")
            const result = await response.json()
            setImage(result.BMPBase64)
            setTemplate(result.TemplateBase64)
        } catch (error) {
            console.error("Scan failed:", error)
        } finally {
            setIsScanning(false)
        }
    }

    async function submit(){

        const response = await fetch("http://localhost:3000/signup", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({name, password, template})
        })
        const data = await response.json()
        console.log(data)
        if(data.url){
            nav(data.url)
        }
    }

    const displayImage = ( image == "" ? null : 
        <div className="relative">
            <img className="h-40 w-40 object-cover rounded-2xl border-2 border-orange-200 shadow-md" src={`data:image/bmp;base64,${image}`}/>
            <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                ✓
            </div>
        </div>
    );

    return(
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-white text-2xl font-bold">F</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
                    <p className="text-gray-600 text-sm">Join FingerPay for secure transactions</p>
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

                    {/* Fingerprint Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fingerprint Authentication</label>
                        <div className="bg-gray-50 rounded-xl p-6 text-center flex flex-col items-center justify-center gap-7 ">
                            {displayImage || (
                                <div className="py-8">
                                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4">Secure your account with fingerprint</p>
                                </div>
                            )}
                            
                            <button 
                                className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                                    isScanning 
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                        : image 
                                            ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                            : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl'
                                }`}
                                onClick={scanFinger}
                                disabled={isScanning}
                            >
                                {isScanning ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent mr-2"></div>
                                        Scanning...
                                    </div>
                                ) : image ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Scan Again
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Scan Fingerprint
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        className={`w-full py-4 px-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                            name && password && template
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={submit}
                        disabled={!name || !password || !template}
                    >
                        <div className="flex items-center justify-center">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            CREATE ACCOUNT
                        </div>
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        By creating an account, you agree to our 
                        <span className="text-orange-500 font-medium"> Terms & Privacy Policy</span>
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