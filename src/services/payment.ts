import { toast } from "react-toastify";

export const handleBuyCoins = async (
    setIsProcessingPayment: (val: boolean) => void,
    canShowToast: () => boolean,
    triggerToastCooldown: () => void,
    idToken: string | undefined,
) => {
    setIsProcessingPayment(true);

    try {
        const response = await fetch('/api/create-payment', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`,
            },
            body: JSON.stringify({
                amount: "1.00",
                currency: "INR",
                customerId: "user_123",
                customerName: "Test User"
            })
        });

        const data = await response.json();

        if (data.success) {
            const paymentWindow = window.open(data.paymentUrl, '_blank');

            if (!paymentWindow) {
                if (canShowToast()) {
                    toast('Popup blocked. Please allow popups and try again.', { autoClose: 4500 });
                    triggerToastCooldown();
                }
                return;
            }

            checkPaymentStatus(
                data.chargeId,
                paymentWindow,
                () => {
                    if (canShowToast()) {
                        toast('✅ Payment successful! 100 coins added to your account.', { autoClose: 4500 });
                        triggerToastCooldown();
                    }
                },
                (reason) => {
                    if (canShowToast()) {
                        toast(`❌ ${reason}`, { autoClose: 4500 });
                        triggerToastCooldown();
                    }
                }
            );
        } else if (canShowToast()) {
            toast("Payment failed: Could not initiate payment", { autoClose: 4500 });
            triggerToastCooldown();
        }
    } catch (error) {
        if (canShowToast()) {
            toast("Payment processing failed", { autoClose: 4500 });
            triggerToastCooldown();
        }
    } finally {
        setIsProcessingPayment(false);
    }
};

export const checkPaymentStatus = async (
    chargeId: string,
    paymentWindow: Window | null,
    onSuccess: () => void,
    onFailure: (reason: string) => void
): Promise<void> => {
    const intervalId = setInterval(async () => {
        if (paymentWindow?.closed) {
            clearInterval(intervalId);
            onFailure("Payment was manually cancelled.");
            return;
        }

        try {
            const response = await fetch(`/api/order-status/${chargeId}`);
            const data = await response.json();

            if (data.status === 'paid' || data.status === 'confirmed') {
                clearInterval(intervalId);
                paymentWindow?.close();
                onSuccess();
            } else if (data.status === 'expired' || data.status === 'canceled') {
                clearInterval(intervalId);
                paymentWindow?.close();
                onFailure("Payment expired or failed.");
            }
        } catch (err) {
            console.error("Failed to check payment status:", err);
        }
    }, 3000);
};
