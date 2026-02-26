"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Heart } from "lucide-react";

const AMOUNTS = [
  { value: 11, label: "1 CHAI", sub: "1 CHAI" },
  { value: 21, label: "2 CHAIS", sub: "2 CHAIS", popular: true },
  { value: 51, label: "5 CHAIS", sub: "5 CHAIS" },
  { value: 101, label: "GENEROUS", sub: "GENEROUS" },
];

export default function SupportPage() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState(21);
  const [customAmount, setCustomAmount] = useState("");

  const displayAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;
  const upiId = "buychaifortushar@ibl";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=upi://pay?pa=${upiId}%26am=${displayAmount}%26cu=INR%26pn=Tushar`;

  return (
    <main className="min-h-screen bg-[#FAF7F2] py-12 px-4 flex items-center justify-center font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_40px_100px_-30px_rgba(44,36,32,0.1)] border border-white/60 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-[#C9848F] via-[#F2C4CE] to-[#C9848F]" />
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Heart className="w-8 h-8 text-[#C9848F] fill-[#C9848F]/10" />
          </div>
          <h1 className="text-2xl font-bold text-[#2C2420] mb-2">Support the Creator</h1>
          <p className="text-sm text-[#2C2420]/40">Your support helps keep Petalé blooming.</p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A8B5A2] text-center">Choose an amount</p>
            <div className="grid grid-cols-2 gap-3">
              {AMOUNTS.map((amt) => (
                <button
                  key={amt.value}
                  onClick={() => {
                    setSelectedAmount(amt.value);
                    setCustomAmount("");
                  }}
                  className={`relative p-4 rounded-3xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                    selectedAmount === amt.value && !customAmount
                      ? "border-[#8B2323] bg-[#8B2323]/5"
                      : "border-[#FAF7F2] bg-[#FAF7F2]/50 hover:bg-white hover:border-[#F2C4CE]/30"
                  }`}
                >
                  {amt.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B8860B] text-white text-[8px] font-bold px-3 py-1 rounded-full shadow-sm z-10 transition-transform">
                      Popular
                    </span>
                  )}
                  <span className={`text-xl font-bold ${selectedAmount === amt.value && !customAmount ? "text-[#8B2323]" : "text-[#2C2420]"}`}>
                    ₹{amt.value}
                  </span>
                  <span className="text-[10px] text-[#A8B5A2] font-bold uppercase tracking-wider">{amt.label}</span>
                </button>
              ))}
            </div>
            
            <div className="relative group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-lg text-[#8B2323] font-bold">₹</span>
              <input 
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full bg-[#FAF7F2]/50 border-2 border-[#FAF7F2] focus:border-[#F2C4CE]/50 focus:bg-white rounded-3xl py-4 pl-12 pr-6 text-lg text-[#2C2420] placeholder-[#2C2420]/20 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 pt-4 border-t border-[#FAF7F2]">
             <div className="bg-[#8B2323] text-white px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-[#8B2323]/20">
                Scan to Pay
             </div>

             <div className="relative p-6 bg-white rounded-4xl shadow-inner border border-[#FAF7F2] group">
                <div className="absolute inset-0 bg-linear-to-br from-[#FAF7F2] to-white -z-10 rounded-4xl" />
                <img 
                  src={qrUrl} 
                  alt="QR Code" 
                  className="w-48 h-48 md:w-56 md:h-56 object-contain"
                />
             </div>

             <div className="text-center space-y-3">
                <p className="text-xl font-bold text-[#2C2420]">
                  Paying <span className="text-[#8B2323]">₹{displayAmount}</span>
                </p>
                
                <div className="bg-[#FAF7F2] px-6 py-3 rounded-2xl border border-[#2C2420]/5 flex items-center gap-3 group hover:border-[#C9848F]/30 transition-all">
                  <span className="text-xs text-[#2C2420]/60 font-medium font-mono">{upiId}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-12">
          <button 
            onClick={() => router.back()}
            className="w-full bg-[#8B2323] text-white py-5 rounded-2xl font-bold text-base shadow-xl shadow-[#8B2323]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" /> Done, Back to Editor
          </button>
        </div>
      </motion.div>
    </main>
  );
}
