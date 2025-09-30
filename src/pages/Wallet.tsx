import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Wallet: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [amount, setAmount] = useState<string>("");

  if (!user) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Wallet</h2>
        <p className="text-gray-600">Please log in to manage your wallet.</p>
      </div>
    );
  }

  // Normalize and set input (remove leading zeros, but allow empty)
  const handleChange = (value: string) => {
    // allow only digits
    const digitsOnly = value.replace(/[^\d]/g, "");
    // strip leading zeros
    const normalized = digitsOnly.replace(/^0+/, "");
    setAmount(normalized === "" ? "" : normalized);
  };

  const parseAmount = (): number => {
    if (amount === "") return 0;
    const n = Number(amount);
    return Number.isFinite(n) && n > 0 ? n : 0;
  };

  const handleAddFunds = () => {
    const n = parseAmount();
    if (n <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    updateUser({ ...user, wallet: user.wallet + n });
    setAmount("");
    toast.success(`₹${n} added to wallet 💰`);
  };

  const handleWithdraw = () => {
    const n = parseAmount();
    if (n <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (user.wallet < n) {
      toast.error("Insufficient balance");
      return;
    }
    updateUser({ ...user, wallet: user.wallet - n });
    setAmount("");
    toast.success(`₹${n} withdrawn from wallet ✅`);
  };

  const quickFill = (n: number) => {
    // replaces the input with the quick amount (no leading zeros)
    setAmount(String(n));
  };

  const disabled = parseAmount() <= 0;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Wallet</h2>

      <div className="bg-white rounded-xl shadow p-6 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Current Balance</span>
          <span className="text-2xl font-bold text-green-600">₹{user.wallet}</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            type="text"
            value={amount}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Enter amount"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2 mt-3">
            {[100, 200, 500, 1000].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => quickFill(v)}
                className="px-3 py-1.5 text-sm bg-gray-100 rounded hover:bg-gray-200"
              >
                +₹{v}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleAddFunds}
            disabled={disabled}
            className={`px-4 py-2 rounded text-white ${
              disabled
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Add Funds
          </button>
          <button
            type="button"
            onClick={handleWithdraw}
            disabled={disabled}
            className={`px-4 py-2 rounded text-white ${
              disabled
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Withdraw
          </button>
        </div>

        <p className="text-xs text-gray-500">
          * This is a demo wallet for frontend. Real payments will require
          integrating a payment gateway later.
        </p>
      </div>
    </div>
  );
};

export default Wallet;
