import React, { useState } from "react";
import { sub } from "./script";
var tax = { ctTaxes: 0, fedTaxes: 0 };
var income = 0;
var sstax = 0;

const TaxCalculatorUI = () => {
   const [loading, setLoading] = useState(false);
   async function subm() {
      setLoading(true);
      sstax = 0.062*income;
      tax = await sub(income);
      setLoading(false);
      document.getElementById("tax").innerHTML = tax.ctTaxes + tax.fedTaxes+sstax;
      document.getElementById("pti").innerHTML =
         income - (tax.ctTaxes + tax.fedTaxes + sstax);
      document.getElementById("sst").innerHTML = sstax;
      document.getElementById("fed").innerHTML = tax.fedTaxes;
      document.getElementById("ct").innerHTML = tax.ctTaxes;
   }
   return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
         <form
            className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
            onSubmit={(e) => {
               subm();
               e.preventDefault();
            }}
         >
            <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">
               Simple Tax Calculator
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
                        income = e.target.value;
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
               >
                  Calculate Tax
               </button>

               {/* Result Display */}
               <div className="mt-6 p-4 bg-gray-700 rounded-lg text-center">
                  <p className="text-lg font-semibold text-purple-300">
                     Your Total Tax:{" "}
                     {loading ? (
                        <span id="tax" className="text-white">
                           Waiting...
                        </span>
                     ) : (
                        <span id="tax" className="text-white">
                           {(tax.ctTaxes + tax.fedTaxes).toFixed(2)}
                        </span>
                     )}
                  </p>
                  <p className="text-lg font-semibold text-purple-300">
                     Total Post-tax Income:{" "}
                     {loading ? (
                        <span id="pti" className="text-white">
                           Waiting...
                        </span>
                     ) : (
                        <span id="pti" className="text-white">
                           {(income - (tax.ctTaxes + tax.fedTaxes)).toFixed(2)}
                        </span>
                     )}
                  </p>
                  <p className="text-lg font-semibold text-purple-300">
                     Federal Taxes:{" "}
                     {loading ? (
                        <span id="fed" className="text-white">
                           Waiting...
                        </span>
                     ) : (
                        <span id="fed" className="text-white">
                           {(tax.fedTaxes).toFixed(2)}
                        </span>
                     )}
                  </p>
                  <p className="text-lg font-semibold text-purple-300">
                     Social Security Taxes:{" "}
                     {loading ? (
                        <span id="sst" className="text-white">
                           Waiting...
                        </span>
                     ) : (
                        <span id="sst" className="text-white">
                           {sstax.toFixed(2)}
                        </span>
                     )}
                  </p>
                  <p className="text-lg font-semibold text-purple-300">
                     CT Taxes:{" "}
                     {loading ? (
                        <span id="ct" className="text-white">
                           Waiting...
                        </span>
                     ) : (
                        <span id="ct" className="text-white">
                           {(tax.ctTaxes).toFixed(2)}
                        </span>
                     )}
                  </p>
               </div>
            </div>
         </form>
      </div>
   );
};

export default TaxCalculatorUI;
