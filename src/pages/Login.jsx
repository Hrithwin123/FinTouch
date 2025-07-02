import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { CreditCard, Receipt, UserPlus, LogIn, Eye, EyeOff } from "lucide-react"

export default function Login(){
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [activeNav, setActiveNav] = useState('Login')
    
    const nav = useNavigate()
    
    const navItems = [
        { id: 'payments', label: 'Payments', icon: CreditCard, path: "/payments"},
        { id: 'transactions', label: 'Transactions', icon: Receipt, path: "/transactions"},
        { id: 'Signup', label: 'Signup', icon: UserPlus, path: "/signup"},
        { id: 'Login', label: 'Login', icon: LogIn, path: "/login"},
    ]

    async function submit(){
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, password})
        })
        const data = await response.json()
        console.log(data.message)
        toast.success(data.message)
        if(data.url){
            nav(data.url)
        }
    }

    const handleNavClick = (item) => {
        setActiveNav(item.id)
        nav(item.path)
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
            {/* Navigation Bar */}
            <nav className="bg-white/80 backdrop-blur-lg border-b border-orange-100 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Title */}
                        <div onClick={() => nav("/")} className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform duration-200">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">
                                    <span className="text-orange-500">FIN</span>
                                    <span className="text-gray-800">TOUCH</span>
                                </h1>
                            </div>
                        </div>
                        
                        {/* Navigation Items */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map((item) => {
                                const IconComponent = item.icon
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavClick(item)}
                                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-2 hover:scale-105 active:scale-95 ${
                                            activeNav === item.id
                                                ? "bg-orange-100 text-orange-700 shadow-sm"
                                                : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                        }`}
                                    >
                                        <IconComponent size={16} />
                                        <span>{item.label}</span>
                                    </button>
                                )
                            })}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button className="text-gray-600 hover:text-orange-600 p-2 rounded-lg hover:bg-orange-50 transition-all duration-200">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Login Form */}
            <div className="flex flex-col items-center justify-center p-6 pt-12">
                <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform hover:scale-[1.01] transition-all duration-300">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <span className="text-white text-2xl font-bold">F</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">FINTOUCH</h1>
                            <p className="text-xs text-gray-500">Biometric Payments</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-300" 
                                onChange={(e) => setName(e.target.value)}  
                                type="text" 
                                placeholder="Enter your full name"
                                value={name}
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input 
                                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-300" 
                                    onChange={(e) => setPassword(e.target.value)}  
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:scale-110"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            className={`w-full py-4 px-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                                name && password 
                                    ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
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
                            Don't have an account? 
                            <span 
                                onClick={() => nav("/signup")} 
                                className="text-orange-500 select-none cursor-pointer font-medium hover:text-orange-600 transition-colors duration-200 hover:underline"
                            >
                                &nbsp; Create One
                            </span>
                        </p>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center text-gray-600 text-sm hover:text-gray-800 transition-colors duration-200">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Secured with 256-bit encryption
                </div>
            </div>
        </div>
    )
}