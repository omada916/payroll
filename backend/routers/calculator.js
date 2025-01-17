import express from "express";

const ctData = {
   br: [
      [0, 10000],
      [10001, 50000],
      [50001, 100000],
      [100001, 200000],
      [200001, 250000],
      [250001, 500000],
   ],
   brd: [
      0.02,
      [10000, 0.045, 200],
      [50000, 0.055, 2000],
      [100000, 0.06, 4250],
      [200000, 0.065, 8750],
      [250000, 0.069, 24350],
      [500000, 0.0699, 41600],
   ],
};
const federalData = {
   br: [

   ],
   brd: [
      
   ]
}
const router = express.Router();

function isranged(x, min, max) {
   return x <= max && x >= min;
}
function brr(income, br, val = 0) {
   try {
      if (val >= 6) {
         return 6;
      } else {
         if (isranged(income, br[val][0], br[val][1])) {
            return val;
         } else {
            return brr(income, br, val + 1);
         }
      }
   } catch (e) {
      console.error(e);
      return -1;
   }
}

export function calculate(income, brd, br) {
   try {
      let tax = 0;
      let bracket = brr(income, br);
      if (bracket == -1) {
         tax = "ERROR";
      } else {
         if (bracket == 0) {
            tax = brd[bracket] * income;
         } else {
            tax =
               (income - brd[bracket][0]) * brd[bracket][1] + brd[bracket][2];
         }
      }
      return tax;
   } catch (e) {
      console.error(`Error: ${e}`);
      return e.message;
   }
}

router.post("/calc", (req, res) => {
   console.log(`CT tax request: ${req.body.income}`);
   res.status(200).json({ taxes: calculate(Number(req.body.income), ctData.brd, ctData.br) });
});

export default router;
