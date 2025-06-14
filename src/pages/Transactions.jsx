import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Transaction() {
    const [allTransactions, setAllTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    const nav = useNavigate()

    useEffect(() => {
        fetch("http://localhost:3000/getTransactions")
            .then(res => res.json())
            .then(data => {
                setAllTransactions(data.transactions)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    const reverseTransactions = [...allTransactions].reverse()

    const formatAmount = (amount) => {
        return `₹${amount}`
    }

    const getTransactionIcon = (from, to) => {
        return "💰"
    }

    const showTransactions = reverseTransactions.map((transaction, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {getTransactionIcon(transaction.from, transaction.to)}
                    </div>
                    <div>
                        <div className="font-semibold text-gray-800 text-lg">
                            {transaction.from} → {transaction.to}
                        </div>
                        <div className="text-gray-500 text-sm">
                            {new Date(transaction.date).toLocaleDateString('en-IN', { 
                                day: 'numeric', 
                                month: 'short', 
                                hour: '2-digit', 
                                minute: '2-digit' 
                            })} 
   
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="font-bold text-xl text-gray-800">
                        {formatAmount(transaction.amount)}
                    </div>
                    <div className="text-green-600 text-sm font-medium">
                        Completed
                    </div>
                </div>
            </div>
        </div>
    ))

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button onClick={() => nav("/payments")} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <ArrowLeft className="w-6 h-6 text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
                                <p className="text-gray-500">Your recent payments and transfers</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => nav("/payments")}
                            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            <span>New Payment</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* FingerPay Branding */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">$</span>
                    </div>
                    <span className="text-2xl font-bold text-orange-500">FIN<span className="text-gray-800">TOUCH</span></span>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="text-gray-500 text-sm font-medium">Total Transactions</div>
                        <div className="text-2xl font-bold text-gray-800">{allTransactions.length}</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="text-gray-500 text-sm font-medium">This Month</div>
                        <div className="text-2xl font-bold text-gray-800">
                            {allTransactions.filter(() => true).length} 
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="text-gray-500 text-sm font-medium">Status</div>
                        <div className="text-2xl font-bold text-green-600">Active</div>
                    </div>
                </div>

                {/* Transaction List */}
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Transactions</h2>
                    
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                        </div>
                    ) : allTransactions.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ArrowRight className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">No transactions yet</h3>
                            <p className="text-gray-500 mb-6">Start your first payment with just a touch</p>
                            <button 
                                onClick={() => window.location.href = '/payments'}
                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                            >
                                Make Payment
                            </button>
                        </div>
                    ) : (
                        showTransactions
                    )}
                </div>
            </div>
        </div>
    )
}