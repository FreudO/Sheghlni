"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BookingStepper } from "@/components/booking/stepper";
import {
  DetailsStep,
  type DetailsStepData,
} from "@/components/booking/steps/details-step";
import { DateTimeStep } from "@/components/booking/steps/date-time-step";
import { QuoteReviewStep } from "@/components/booking/steps/quote-review-step";
import {
  PaymentStep,
  type PaymentStepData,
} from "@/components/booking/steps/payment-step";
import { ConfirmationStep } from "@/components/booking/steps/confirmation-step";
import type { Provider, Service, User } from "@/lib/mock";
import {
  buildQuoteForService,
  generateBookingReference,
  getConversationIdForProvider,
  type BookingStepIndex,
  type TimeSlot,
} from "@/lib/booking/utils";
import { toast } from "@/lib/toast";

type BookingFlowContentProps = {
  provider: Provider;
  user: User;
  services: Service[];
};

const DEFAULT_PAYMENT: PaymentStepData = {
  useSavedCard: true,
  cardNumber: "",
  expiry: "",
  cvv: "",
  cardName: "",
  billingSameAsService: true,
  billingAddress: "",
};

export function BookingFlowContent({
  provider,
  user,
  services,
}: BookingFlowContentProps) {
  const searchParams = useSearchParams();
  const serviceFromUrl = searchParams.get("service");

  const defaultServiceId =
    services.find((s) => s.id === serviceFromUrl)?.id ??
    services[0]?.id ??
    "";

  const [step, setStep] = useState<BookingStepIndex>(0);
  const [stepError, setStepError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [details, setDetails] = useState<DetailsStepData>({
    serviceId: defaultServiceId,
    description: "",
    photoPreviews: [],
    location: "",
    isRemote: false,
    urgency: "flexible",
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [payment, setPayment] = useState<PaymentStepData>(DEFAULT_PAYMENT);

  const [bookingReference, setBookingReference] = useState("");
  const [bookingId] = useState(() => `book-demo-${Date.now()}`);

  const selectedService = useMemo(
    () => services.find((s) => s.id === details.serviceId) ?? services[0],
    [details.serviceId, services],
  );

  const quote = useMemo(
    () => (selectedService ? buildQuoteForService(selectedService) : null),
    [selectedService],
  );

  const conversationId = getConversationIdForProvider(provider.id);

  const patchDetails = (patch: Partial<DetailsStepData>) => {
    setDetails((d) => ({ ...d, ...patch }));
    setStepError(null);
  };

  const patchPayment = (patch: Partial<PaymentStepData>) => {
    setPayment((p) => ({ ...p, ...patch }));
    setStepError(null);
  };

  const validateDetails = (): boolean => {
    if (!details.description.trim()) {
      setStepError("Please describe your job before continuing.");
      return false;
    }
    if (!details.isRemote && !details.location.trim()) {
      setStepError("Please enter a job location or select Online / Remote.");
      return false;
    }
    return true;
  };

  const validateDateTime = (): boolean => {
    if (!selectedDate || !selectedTime) {
      setStepError("Please select a date and time slot.");
      return false;
    }
    return true;
  };

  const handlePaymentConfirm = () => {
    setStepError(null);
    setIsSubmitting(true);
    window.setTimeout(() => {
      setBookingReference(generateBookingReference());
      setIsSubmitting(false);
      setStep(4);
      toast.success("Booking confirmed.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  if (!selectedService || !quote) {
    return (
      <p className="py-12 text-center text-text-secondary">
        This pro has no bookable services yet.
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 pb-28 md:px-6 md:py-10 md:pb-10 lg:max-w-4xl lg:px-12">
      {step < 4 && (
        <div className="mb-8 md:mb-10">
          <BookingStepper currentStep={step} />
        </div>
      )}

      {step === 0 && (
        <DetailsStep
          user={user}
          services={services}
          data={details}
          onChange={patchDetails}
          error={stepError}
          onContinue={() => {
            if (!validateDetails()) return;
            setStepError(null);
            setStep(1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {step === 1 && (
        <DateTimeStep
          service={selectedService}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onDateChange={(iso) => {
            setSelectedDate(iso);
            setSelectedTime(null);
            setStepError(null);
          }}
          onTimeChange={(slot) => {
            setSelectedTime(slot);
            setStepError(null);
          }}
          error={stepError}
          onContinue={() => {
            if (!validateDateTime()) return;
            setStepError(null);
            setStep(2);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {step === 2 && (
        <QuoteReviewStep
          provider={provider}
          user={user}
          service={selectedService}
          quote={quote}
          onContinue={() => {
            setStep(3);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {step === 3 && selectedDate && selectedTime && (
        <PaymentStep
          provider={provider}
          user={user}
          service={selectedService}
          description={details.description}
          location={details.location}
          isRemote={details.isRemote}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          quote={quote}
          data={payment}
          onChange={patchPayment}
          isSubmitting={isSubmitting}
          error={stepError}
          onConfirm={handlePaymentConfirm}
        />
      )}

      {step === 4 && selectedDate && selectedTime && bookingReference && (
        <ConfirmationStep
          provider={provider}
          user={user}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          location={details.location}
          isRemote={details.isRemote}
          bookingReference={bookingReference}
          bookingId={bookingId}
          conversationId={conversationId}
        />
      )}
    </div>
  );
}
