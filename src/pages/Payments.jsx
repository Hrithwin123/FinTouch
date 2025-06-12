import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { CreditCard, Receipt, UserPlus, LogIn } from "lucide-react";

const socket = io("http://localhost:3000")

export default function Payments() {
  const [shopBalance, setShopBalance] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [money, setMoney] = useState("0");
  const [vendor, setVendor] = useState("");
  const [activeNav, setActiveNav] = useState("dashboard");

  const incrementAmount = 30;
  const nav = useNavigate()

  const navItems = [
    { id: 'payments', label: 'Payments', icon: CreditCard , path: "/payments"},
    { id: 'transactions', label: 'Transactions', icon: Receipt , path : "/transactions"},
    { id: 'Signup', label: 'Signup', icon: UserPlus , path : "/signup"},
    { id: 'Login', label: 'Login', icon: LogIn, path : "/login"},

  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  useEffect(() => {

    fetch("http://localhost:3000/getUsers")
      .then((res) => res.json())
      .then((data) => setAllUsers(data.users))
      .catch((err) => console.log(err));

    fetch("http://localhost:3000/getVendors")
      .then((res) => res.json())
      .then((data) => {
        setAllVendors(data.vendors);
        setVendor(data.vendors[0]);
      })
      .catch((err) => console.log(err));

    socket.on("userMoneyChange", ({balance, id}) => {
        setAllUsers(prevUsers => {
            return prevUsers.map(user => ( id == user._id ? {...user, balance} : user ))
        })
    })

    socket.on("vendorMoneyChange", ({balance, id}) => {
        setAllVendors(prev => {
            return prev.map(vendor => vendor._id == id ? {...vendor, balance} : vendor)
        })
    })

  }, []);

  function addMoney(user) {
     fetch("http://localhost:3000/addMoney", {
            method : "PATCH",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({user, money : incrementAmount})
        })
        .then(res => res.json())
        .then(data => {
            toast.success(data.message)
            socket.emit("userMoneyChange", {id : user._id})
        })
        .catch(err => console.log(err))
  }

  async function handlePayment() {
    const scanResponse = await fetch("http://localhost:3000/scanFinger");
    const scanResult = await scanResponse.json();
    const template = scanResult.TemplateBase64;

    const matchResponse = await fetch("http://localhost:3000/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ template }),
    });

    const matchResult = await matchResponse.json();
    toast.success(matchResult.message)

    if (matchResult.user) {
      fetch("http://localhost:3000/removeMoney", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ money, user: matchResult.user }),
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)

          if(data.success){

            if(data.noBalance){
              toast.success(data.message)
              return;
            }

            fetch("http://localhost:3000/sendMoney", {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ money, id : vendor._id , sender : data.id}),
          })
          .then((res) => res.json())
          .then((vendata) => {
            if(vendata.success){
              toast.success(vendata.message)
              socket.emit("vendorMoneyChange", {id : vendata.id})
            }
          })
          .catch((err) => console.log(err)); 

          }

            socket.emit("userMoneyChange", {id : data.id})
        })
        .catch((err) => console.log(err));
    }
  }

  const displayUsers = allUsers.map((user, index) => (
    <motion.div
      key={index}
      variants={cardVariants}
      whileHover={{ scale: 1.02, rotateY: 5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white min-w-[160px] max-w-[180px] min-h-[160px] border-2 border-orange-300 rounded-xl shadow-lg shadow-orange-100 p-3 flex flex-col justify-between"
    >
      <div className="text-center space-y-2">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-md">
          <span className="text-white font-bold text-xs">{user.name?.charAt(0) || "U"}</span>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-gray-800 mb-1">{user.name}</h3>
          <div className="bg-yellow-100 px-2 py-1 rounded-lg inline-block">
            <span className="text-gray-700 font-medium text-xs">₹{user.balance}</span>
          </div>
        </div>
        <motion.button
          onClick={() => addMoney(user)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-xs"
        >
          + ₹{incrementAmount}
        </motion.button>
      </div>
    </motion.div>
  ));

  const displayVendors = allVendors.map((vendorItem, index) => (
    <motion.div
      key={index}
      variants={cardVariants}
      whileHover={{ scale: 1.02, rotateY: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white mb-3 w-[20%] rounded-xl shadow-lg p-3 transition-all duration-300 hover:shadow-xl ${
        vendor?.name === vendorItem.name ? "ring-2 ring-orange-300 shadow-orange-200" : "shadow-gray-100"
      }`}
    >
      <div className="text-center space-y-2">
        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-md">
          <span className="text-white font-bold text-xs">{vendorItem.name?.charAt(0) || "V"}</span>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-gray-800 mb-1">{vendorItem.name}</h3>
          <div className="bg-yellow-100 px-2 py-1 rounded-lg inline-block">
            <span className="text-gray-700 font-medium text-xs">₹{vendorItem.balance}</span>
          </div>
        </div>
        <motion.button
          onClick={() => setVendor(vendorItem)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full font-semibold py-2 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-xs ${
            vendor?.name === vendorItem.name
              ? "bg-orange-500 text-white"
              : "bg-white border border-orange-500 text-orange-500 hover:bg-orange-50"
          }`}
        >
          {vendor?.name === vendorItem.name ? "✓ Selected" : "Select"}
        </motion.button>
      </div>
    </motion.div>
  ));

  return (
    <motion.div
      className="h-screen w-screen bg-gradient-to-br from-orange-50 to-yellow-50 font-sora overflow-x-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Navigation Bar */}
      <motion.nav
        className="bg-white/80 backdrop-blur-lg border-b border-orange-100 shadow-sm sticky top-0 z-50"
        variants={navVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">FingerPay</h1>
                <p className="text-xs text-gray-500">Biometric Payments</p>
              </div>
            </motion.div>

            {/* Navigation Items - Moved to the right */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {setActiveNav(item.id); nav(item.path)}}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${
                      activeNav === item.id
                        ? "bg-orange-100 text-orange-700 shadow-sm"
                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent size={16} />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-orange-100 bg-white/90 backdrop-blur-lg">
          <div className="px-4 py-2">
            <div className="flex justify-around">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`px-3 py-2 rounded-lg font-medium text-xs transition-all duration-200 flex flex-col items-center space-y-1 ${
                      activeNav === item.id
                        ? "bg-orange-100 text-orange-700"
                        : "text-gray-600 hover:text-orange-600"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent size={18} />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="h-full max-w-7xl mx-auto flex flex-col p-4 pt-2">
        <div className="flex-1 grid lg:grid-cols-3 gap-4">
          {/* Left Section - Vendors and Users */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Vendors Section */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl shadow-orange-100 p-4 flex flex-col flex-1 min-h-0"
              variants={itemVariants}
            >
              <div className="flex items-center mb-3 flex-shrink-0">
                <div className="w-2 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full mr-2"></div>
                <h2 className="text-base md:text-lg font-bold text-gray-800 font-sora">Vendors</h2>
                <div className="ml-auto bg-yellow-100 px-2 py-1 rounded-full">
                  <span className="text-orange-600 font-semibold text-xs">{allVendors.length} Active</span>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <motion.div
                  className="flex items-center justify-start gap-4 h-full ml-2"
                  variants={containerVariants}
                >
                  {displayVendors}
                </motion.div>
              </div>
            </motion.div>

            {/* Users Section */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl shadow-orange-100 p-4 flex flex-col flex-1 min-h-0"
              variants={itemVariants}
            >
              <div className="flex items-center mb-3 flex-shrink-0">
                <div className="w-2 h-6 bg-gradient-to-b from-orange-400 to-red-400 rounded-full mr-3"></div>
                <h2 className="text-base md:text-lg font-bold text-gray-800 font-sora">Users</h2>
                <div className="ml-auto bg-yellow-100 px-2 py-1 rounded-full">
                  <span className="text-orange-600 font-semibold text-xs">{allUsers.length} Registered</span>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <motion.div
                className="h-full flex flex-wrap items-center justify-start gap-3 overflow-y-hidden p-2"
                variants={containerVariants}
                >
                {displayUsers}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Section - Payment Interface */}
          <motion.div className="lg:col-span-1 flex flex-col" variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-xl shadow-orange-100 p-4 flex flex-col h-full">
              <motion.div className="text-center mb-4" variants={itemVariants}>
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1 font-sora">Make Payment</h3>
                <p className="text-gray-600 text-sm font-sora">Enter amount and authenticate</p>
              </motion.div>

              {/* Selected Vendor Display */}
              {vendor && (
                <motion.div
                  className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4"
                  variants={itemVariants}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white font-bold text-xs">{vendor.name?.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Paying to:</p>
                      <p className="font-semibold text-gray-800 text-sm">{vendor.name}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex-1 flex flex-col justify-between space-y-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">Payment Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                    <motion.input
                      onChange={(e) => setMoney(e.target.value)}
                      placeholder="Enter amount..."
                      className="w-full pl-8 pr-3 py-3 text-lg font-semibold text-center border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 outline-none placeholder-gray-400"
                      type="number"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </motion.div>

                <motion.button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-base"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    PAY NOW
                  </div>
                </motion.button>

                <motion.div
                  className="bg-blue-50 border border-blue-200 rounded-xl p-3"
                  variants={itemVariants}
                >
                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-xs font-medium text-blue-800">Secure Payment</p>
                      <p className="text-xs text-blue-600 mt-1">Fingerprint authentication required</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}