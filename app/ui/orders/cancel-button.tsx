"use client";

import { useFormState, useFormStatus } from "react-dom";
import { cancelOrderAction } from "@/app/lib/orders/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      disabled={pending}
      className="text-sm text-red-600 hover:text-red-700 border border-red-200 px-4 py-2 hover:bg-red-50 transition-colors disabled:opacity-50"
    >
      {pending ? "Cancelling..." : "Cancel Order"}
    </button>
  );
}

export function CancelOrderButton({ orderId }: { orderId: string }) {
  // Bind the specific orderId to the server action
  const cancelWithId = cancelOrderAction.bind(null, orderId);
  const [state, formAction] = useFormState(cancelWithId , { message: "" });

  return (
    <form action={formAction}>
      <SubmitButton />
      {state.message && <p className="text-xs text-red-500 mt-2">{state.message}</p>}
    </form>
  );
}