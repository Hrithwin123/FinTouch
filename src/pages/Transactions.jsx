import { useEffect, useState } from "react"
import { ArrowLeft, Plus, ChevronDown, ChevronUp, ExternalLink, Copy, Check } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { QRCodeCanvas } from "qrcode.react"
import { motion, AnimatePresence } from "framer-motion"

export default function Transaction() {
    const [allTransactions, setAllTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [expandedId, setExpandedId] = useState(null)
    const [copiedId, setCopiedId] = useState(null)

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
        return `₹${amount.toLocaleString('en-IN')}`
    }

    const getTransactionIcon = (from, to) => {
        return "💰"
    }

    const toggleExpand = (index) => {
        setExpandedId(expandedId === index ? null : index)
    }

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    let delay = 0
    const showTransactions = reverseTransactions.map((transaction, index) => {
        const isExpanded = expandedId === index
        const explorerUrl = `https://explorer.solana.com/tx/${transaction.signature}?cluster=devnet`
        const transactionId = transaction.signature?.slice(0, 8) + '...' + transaction.signature?.slice(-8)

        return (
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: delay += 0.1 }}
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
                {/* Main Transaction Card */}
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        {/* Left Section - User Info */}
                        <div className="flex items-center space-x-4 flex-1">
                            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md">
                                {getInitials(transaction.to)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-semibold text-gray-800 text-lg">
                                        {transaction.to}
                                    </span>
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                                    <span className="text-sm text-gray-500">
                                        Payment sent
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-gray-500">
                                    <span>
                                        {new Date(transaction.date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                    <span>
                                        {new Date(transaction.date).toLocaleTimeString('en-IN', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <div className="mt-2 text-xs text-gray-400">
                                    From: <span className="font-medium">{transaction.from}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Amount & Status */}
                        <div className="text-right mr-4">
                            <div className="font-bold text-2xl text-gray-900 mb-1">
                                {formatAmount(transaction.amount)}
                            </div>
                            <div className="inline-flex items-center space-x-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>Completed</span>
                            </div>
                        </div>

                        {/* Expand Button */}
                        <button
                            onClick={() => toggleExpand(index)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label={isExpanded ? "Hide details" : "Show details"}
                        >
                            {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-gray-600" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-gray-600" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Expandable Section - QR Code & Details */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-orange-50/30"
                        >
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                    {/* QR Code Section */}
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className="bg-white p-4 rounded-2xl shadow-md border-2 border-orange-100">
                                            <QRCodeCanvas
                                                value={explorerUrl}
                                                size={160}
                                                level="H"
                                                includeMargin={true}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm font-medium text-gray-700 mb-1">
                                                Scan to view on Solana Explorer
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Devnet Transaction
                                            </div>
                                        </div>
                                    </div>

                                    {/* Transaction Details */}
                                    <div className="flex-1 space-y-4 w-full">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                                Transaction Details
                                            </h4>
                                            <div className="space-y-3">
                                                {/* Transaction ID */}
                                                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                                                    <div className="flex-1">
                                                        <div className="text-xs text-gray-500 mb-1">
                                                            Transaction ID
                                                        </div>
                                                        <div className="text-sm font-mono text-gray-700">
                                                            {transactionId}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(transaction.signature, `sig-${index}`)}
                                                        className="ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                        aria-label="Copy transaction signature"
                                                    >
                                                        {copiedId === `sig-${index}` ? (
                                                            <Check className="w-4 h-4 text-green-600" />
                                                        ) : (
                                                            <Copy className="w-4 h-4 text-gray-600" />
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Network */}
                                                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                                                    <div>
                                                        <div className="text-xs text-gray-500 mb-1">
                                                            Network
                                                        </div>
                                                        <div className="text-sm font-medium text-gray-700">
                                                            Solana Devnet
                                                        </div>
                                                    </div>
                                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                </div>

                                                {/* View on Explorer Button */}
                                                <a
                                                    href={explorerUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center space-x-2 w-full p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                                >
                                                    <span>View on Solana Explorer</span>
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        )
    })

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
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
                        {allTransactions.length > 0 && (
                            <p className="text-sm text-gray-500">
                                Click any transaction to view details and QR code
                            </p>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                        </div>
                    ) : allTransactions.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className="text-3xl">💸</div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">No transactions yet</h3>
                            <p className="text-gray-500 mb-6">Start your first payment with just a touch</p>
                            <button
                                onClick={() => nav('/payments')}
                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                            >
                                Make Payment
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {showTransactions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}