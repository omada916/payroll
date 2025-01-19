import express from "express";

const data = {
   ctData: {
      br: [
         // [min, max]
         [0, 10000],
         [10001, 50000],
         [50001, 100000],
         [100001, 200000],
         [200001, 250000],
         [250001, 500000],
      ],
      brd: [
         // [remove, rate, add]
         0.02,
         [10000, 0.045, 200],
         [50000, 0.055, 2000],
         [100000, 0.06, 4250],
         [200000, 0.065, 8750],
         [250000, 0.069, 24350],
         [500000, 0.0699, 41600],
      ],
   },
   federalData: {
      br: [
         // [min, max]
         [0, 11600],
         [11601, 47150],
         [47151, 100525],
         [100526, 191950],
         [191951, 243725],
         [243726, 609350],
      ],
      brd: [
         // [remove, rate, add]
         0.1,
         [11600, 0.12, 1160],
         [47150, 0.22, 5183],
         [100525, 0.24, 18558],
         [191950, 0.32, 46278],
         [243725, 0.35, 88528],
         [609350, 0.37, 161379],
      ],
   },
};
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
   res.status(200).json({
      ctTaxes: calculate(
         Number(req.body.income),
         data.ctData.brd,
         data.ctData.br
      ),
      fedTaxes: calculate(
         Number(req.body.income),
         data.federalData.brd,
         data.federalData.br
      ),
   });
});

export default router;
