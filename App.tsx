import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

import FinancialIndex from "@/pages/financial/index";
import Mortgage from "@/pages/financial/Mortgage";
import Loan from "@/pages/financial/Loan";
import AutoLoan from "@/pages/financial/AutoLoan";
import Interest from "@/pages/financial/Interest";
import Payment from "@/pages/financial/Payment";
import Retirement from "@/pages/financial/Retirement";
import Amortization from "@/pages/financial/Amortization";
import Investment from "@/pages/financial/Investment";
import Inflation from "@/pages/financial/Inflation";
import Finance from "@/pages/financial/Finance";
import IncomeTax from "@/pages/financial/IncomeTax";
import CompoundInterest from "@/pages/financial/CompoundInterest";
import Salary from "@/pages/financial/Salary";
import InterestRate from "@/pages/financial/InterestRate";
import SalesTax from "@/pages/financial/SalesTax";

import HealthIndex from "@/pages/health/index";
import BMI from "@/pages/health/BMI";
import Calorie from "@/pages/health/Calorie";
import BodyFat from "@/pages/health/BodyFat";
import BMR from "@/pages/health/BMR";
import IdealWeight from "@/pages/health/IdealWeight";
import Pace from "@/pages/health/Pace";
import Pregnancy from "@/pages/health/Pregnancy";
import Conception from "@/pages/health/Conception";
import DueDate from "@/pages/health/DueDate";

import MathIndex from "@/pages/math/index";
import Scientific from "@/pages/math/Scientific";
import Fraction from "@/pages/math/Fraction";
import Percentage from "@/pages/math/Percentage";
import RandomNumber from "@/pages/math/RandomNumber";
import Triangle from "@/pages/math/Triangle";
import StandardDeviation from "@/pages/math/StandardDeviation";

import OtherIndex from "@/pages/other/index";
import Age from "@/pages/other/Age";
import DateCalc from "@/pages/other/Date";
import TimeCalc from "@/pages/other/Time";
import Hours from "@/pages/other/Hours";
import GPA from "@/pages/other/GPA";
import Grade from "@/pages/other/Grade";
import Concrete from "@/pages/other/Concrete";
import Subnet from "@/pages/other/Subnet";
import Password from "@/pages/other/Password";
import Conversion from "@/pages/other/Conversion";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />

        <Route path="/financial" component={FinancialIndex} />
        <Route path="/financial/mortgage" component={Mortgage} />
        <Route path="/financial/loan" component={Loan} />
        <Route path="/financial/auto-loan" component={AutoLoan} />
        <Route path="/financial/interest" component={Interest} />
        <Route path="/financial/payment" component={Payment} />
        <Route path="/financial/retirement" component={Retirement} />
        <Route path="/financial/amortization" component={Amortization} />
        <Route path="/financial/investment" component={Investment} />
        <Route path="/financial/inflation" component={Inflation} />
        <Route path="/financial/finance" component={Finance} />
        <Route path="/financial/income-tax" component={IncomeTax} />
        <Route path="/financial/compound-interest" component={CompoundInterest} />
        <Route path="/financial/salary" component={Salary} />
        <Route path="/financial/interest-rate" component={InterestRate} />
        <Route path="/financial/sales-tax" component={SalesTax} />

        <Route path="/health" component={HealthIndex} />
        <Route path="/health/bmi" component={BMI} />
        <Route path="/health/calorie" component={Calorie} />
        <Route path="/health/body-fat" component={BodyFat} />
        <Route path="/health/bmr" component={BMR} />
        <Route path="/health/ideal-weight" component={IdealWeight} />
        <Route path="/health/pace" component={Pace} />
        <Route path="/health/pregnancy" component={Pregnancy} />
        <Route path="/health/conception" component={Conception} />
        <Route path="/health/due-date" component={DueDate} />

        <Route path="/math" component={MathIndex} />
        <Route path="/math/scientific" component={Scientific} />
        <Route path="/math/fraction" component={Fraction} />
        <Route path="/math/percentage" component={Percentage} />
        <Route path="/math/random-number" component={RandomNumber} />
        <Route path="/math/triangle" component={Triangle} />
        <Route path="/math/standard-deviation" component={StandardDeviation} />

        <Route path="/other" component={OtherIndex} />
        <Route path="/other/age" component={Age} />
        <Route path="/other/date" component={DateCalc} />
        <Route path="/other/time" component={TimeCalc} />
        <Route path="/other/hours" component={Hours} />
        <Route path="/other/gpa" component={GPA} />
        <Route path="/other/grade" component={Grade} />
        <Route path="/other/concrete" component={Concrete} />
        <Route path="/other/subnet" component={Subnet} />
        <Route path="/other/password" component={Password} />
        <Route path="/other/conversion" component={Conversion} />

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
