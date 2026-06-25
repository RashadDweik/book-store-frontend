"use client";

import { useFormState, useFormStatus } from "react-dom";
import { placeOrderAction } from "@/app/lib/orders/actions";

function CheckoutButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-zinc-900 text-white text-sm py-3 hover:bg-zinc-700 transition-colors disabled:opacity-50"
    >
      {pending ? "Processing..." : "Checkout"}
    </button>
  );
}

export function CheckoutForm() {
  // state holds the object returned by the server action
  const [state, formAction] = useFormState(placeOrderAction, { message: "" });

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <CheckoutButton />
      {/* Display the message returned from the server */}
      {state.message && (
        <p className={`text-sm ${state.message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}