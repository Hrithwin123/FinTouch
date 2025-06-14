import { useState } from "react"
import { toast } from "react-toastify"
import { CreditCard, Receipt, UserPlus, LogIn, Eye, EyeOff, Settings, Lock, Fingerprint, Save, RotateCcw } from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"

export default function DoneLogin() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const [image, setImage] = useState("")   //BMPBase64
    const [template, setTemplate] = useState("")
    const [isScanning, setIsScanning] = useState(false)
    const [activeNav, setActiveNav] = useState('Settings')
    
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
    const [isUpdatingFingerprint, setIsUpdatingFingerprint] = useState(false)

    const {id} = useParams()

    const nav = useNavigate()

    const navItems = [
        { id: 'payments', label: 'Payments', icon: CreditCard, path: "/payments"},
        { id: 'transactions', label: 'Transactions', icon: Receipt, path: "/transactions"},
        { id: 'Signup', label: 'Signup', icon: UserPlus, path: "/signup"},
        { id: 'Login', label: 'Login', icon: LogIn, path: "/login"},
        { id: 'Settings', label: 'Settings', icon: Settings, path: "/settings"},
    ];

    async function scanFinger() {
        setIsScanning(true)
        try {
            const response = await fetch("http://localhost:3000/scanFinger")
            const result = await response.json()
            setImage(result.BMPBase64)
            setTemplate(result.TemplateBase64)
        } catch (error) {
            console.error("Scan failed:", error)
            toast.error("Failed to scan fingerprint. Please try again.")
        } finally {
            setIsScanning(false)
        }
    }

    async function updatePassword() {
        if (newPassword !== confirmPassword) {
            toast.success("New passwords don't match")
            return
        }
     
        setIsUpdatingPassword(true)

            const response = await fetch("http://localhost:3000/updatePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    newPassword,
                    currentPassword
                })
            })
            const data = await response.json()
            
          
                toast.success(data.message)
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")
                setIsUpdatingPassword(false)
           
     
    }

    async function updateFingerprint() {
        if (!template) {
            toast.success("Please scan your fingerprint first")
            return
        }

        setIsUpdatingFingerprint(true)
        try {
            const response = await fetch("http://localhost:3000/updateFingerprint", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ template , id})
            })
            const data = await response.json()
            
            if (response.ok) {
                toast.success("Fingerprint updated successfully")
            } else {
                toast.error(data.message || "Failed to update fingerprint")
            }
        } catch (error) {
            console.error("Fingerprint update failed:", error)
            toast.error("Failed to update fingerprint. Please try again.")
        } finally {
            setIsUpdatingFingerprint(false)
        }
    }

    const displayImage = image === "" ? null : (
        <div className="relative">
            <img 
                className="h-32 w-32 object-cover rounded-2xl border-2 border-orange-200 shadow-md" 
                src={`data:image/bmp;base64,${image}`}
                alt="Fingerprint scan"
            />
            <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                ✓
            </div>
        </div>
    );

    const isPasswordFormValid = currentPassword && newPassword && confirmPassword && newPassword === confirmPassword;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
            {/* Navigation Bar */}
            <nav className="bg-white/80 backdrop-blur-lg border-b border-orange-100 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Title */}
                        <div onClick={() => nav("/")} className="flex items-center space-x-3 cursor-pointer">
                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">$</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-orange-500">FIN<span className="text-gray-800">TOUCH</span></h1>
                                <p className="text-xs text-gray-500">Biometric Payments</p>
                            </div>
                        </div>
                        
                        {/* Navigation Items */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {setActiveNav(item.id); nav(item.path)} }
                                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-2 hover:scale-105 active:scale-95 ${
                                            activeNav === item.id
                                                ? "bg-orange-100 text-orange-700 shadow-sm"
                                                : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                        }`}
                                    >
                                        <IconComponent size={16} />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button className="text-gray-600 hover:text-orange-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center p-6 pt-12">
                <div className="w-full max-w-4xl space-y-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Settings className="text-white" size={32} />
                        </div>
                        <h1 className="text-xl font-bold text-gray-800">FINTOUCH</h1>
                        <p className="text-gray-600">Update your security preferences</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Password Update Section */}
                        <div className="bg-white rounded-3xl shadow-2xl p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <Lock className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
                                    <p className="text-gray-600 text-sm">Update your account password</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Current Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                    <div className="relative">
                                        <input 
                                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                                            onChange={(e) => setCurrentPassword(e.target.value)}  
                                            type={showCurrentPassword ? "text" : "password"}
                                            placeholder="Enter current password"
                                            value={currentPassword}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        >
                                            {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* New Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                    <div className="relative">
                                        <input 
                                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                                            onChange={(e) => setNewPassword(e.target.value)}  
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="Enter new password"
                                            value={newPassword}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                    <div className="relative">
                                        <input 
                                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                                            onChange={(e) => setConfirmPassword(e.target.value)}  
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm new password"
                                            value={confirmPassword}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Password Validation */}
                                {newPassword && confirmPassword && newPassword !== confirmPassword && (
                                    <p className="text-red-500 text-sm">Passwords don't match</p>
                                )}

                                {/* Update Password Button */}
                                <button 
                                    className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center ${
                                        isPasswordFormValid && !isUpdatingPassword
                                            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                                    onClick={updatePassword}
                                    disabled={!isPasswordFormValid || isUpdatingPassword}
                                >
                                    {isUpdatingPassword ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent mr-2"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={20} className="mr-2" />
                                            Update Password
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Fingerprint Update Section */}
                        <div className="bg-white rounded-3xl shadow-2xl p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-orange-100 p-3 rounded-full mr-4">
                                    <Fingerprint className="text-orange-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Update Fingerprint</h2>
                                    <p className="text-gray-600 text-sm">Change your biometric authentication</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Current Fingerprint Status */}
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <div className="flex items-center">
                                        <div className="bg-green-500 rounded-full p-1 mr-3">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-green-800">Fingerprint Active</p>
                                            <p className="text-sm text-green-600">Your account is secured with fingerprint authentication</p>
                                        </div>
                                    </div>
                                </div>

                                {/* New Fingerprint Section */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">New Fingerprint</label>
                                    <div className="bg-gray-50 rounded-xl p-6 text-center flex flex-col items-center justify-center gap-6">
                                        {displayImage || (
                                            <div className="py-4">
                                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Fingerprint className="text-orange-500" size={32} />
                                                </div>
                                                <p className="text-gray-600 text-sm mb-4">Scan your new fingerprint</p>
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
                                                    <RotateCcw size={20} className="mr-2" />
                                                    Scan Again
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center">
                                                    <Fingerprint size={20} className="mr-2" />
                                                    Scan New Fingerprint
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Update Fingerprint Button */}
                                <button 
                                    className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center ${
                                        template && !isUpdatingFingerprint
                                            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                                    onClick={updateFingerprint}
                                    disabled={!template || isUpdatingFingerprint}
                                >
                                    {isUpdatingFingerprint ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent mr-2"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={20} className="mr-2" />
                                            Update Fingerprint
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Security Info */}
                    <div className="mt-8 flex items-center justify-center text-gray-600 text-sm">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        All security updates are encrypted and stored securely
                    </div>
                </div>
            </div>
        </div>
    )
}