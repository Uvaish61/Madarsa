import type { Metadata } from "next";
import Checkout from "@/components/checkout/Checkout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Checkout · Madarsa Tech Academy",
  description: "Complete your course enrollment.",
};

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  );
}
