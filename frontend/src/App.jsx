import React, { useState, useEffect } from "react";
import { sub } from "./script";

const TaxCalculatorUI = () => {
   const [tax, setTax] = useState(0);
   const [income, setIncome] = useState(0);
   const [loading, setLoading] = useState(false);
   async function subm() {
      setLoading(true);
      await setTax(await sub(income));
      setLoading(false);
   }
   useEffect(() => {
      setLoading(true);
   }, [tax]);
   return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
         <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">
               Tax Calculator
            </h1>

            <div className="space-y-4">
               {/* Income Input */}
               <div>
                  <label className="block text-sm font-medium text-purple-300 mb-1">
                     Annual Income ($)
                  </label>
                  <input
                     type="number"
                     className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                     placeholder="Enter your income"
                     onChange={(e) => {
                        setIncome(e.target.value);
                     }}
                  />
               </div>

               {/* Deductions Input 
               <div>
                  <label className="block text-sm font-medium text-purple-300 mb-1">
                     Deductions ($)
                  </label>
                  <input
                     type="number"
                     className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                     placeholder="Enter deductions"
                  />
               </div>
               */}

               {/* Calculate Button */}
               <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                  onClick={() => {
                     subm();
                  }}
               >
                  Calculate Tax
               </button>

               {/* Result Display */}
               <div className="mt-6 p-4 bg-gray-700 rounded-lg text-center">
                  <p className="text-lg font-semibold text-purple-300">
                     Your Tax:{" "}
                     {loading ? (
                        <span id="tax" className="text-white">
                           Waiting...
                        </span>
                     ) : (
                        <span id="tax" className="text-white">
                           {tax}
                        </span>
                     )}
                  </p>
                  <p className="text-lg font-semibold text-purple-300">
                     Post-tax Income:{" "}
                     {loading ? (
                        <span id="pti" className="text-white">
                           Waiting...
                        </span>
                     ) : (
                        <span id="pti" className="text-white">
                           {income - tax}
                        </span>
                     )}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TaxCalculatorUI;
