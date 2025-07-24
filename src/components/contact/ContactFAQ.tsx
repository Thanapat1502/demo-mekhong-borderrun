import { Card, CardBody } from "@heroui/react";

export default function ContactFAQ(props: { phone: string }) {
  const { phone } = props;
  return (
    <section className="py-12 px-6 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-light text-black text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardBody className="p-6">
              <h3 className="font-medium text-lg text-black mb-3">
                How do I book a trip?
              </h3>
              <p className="text-black">
                {`You can book by calling us at ${phone}, sending a
                WhatsApp message, or using the contact form above. We recommend
                booking at least 1 day in advance.`}
              </p>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardBody className="p-6">
              <h3 className="font-medium text-lg text-black mb-3">
                What should I bring?
              </h3>
              <p className="text-black">
                Bring your passport, passport photos, cash for Laos visa if
                needed, and comfortable clothing for the journey.
              </p>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardBody className="p-6">
              <h3 className="font-medium text-lg text-black mb-3">
                What&apos;s the cancellation policy?
              </h3>
              <p className="text-black">
                You can cancel up to 24 hours before departure for a full
                refund. Weather-related cancellations are handled case by case.
              </p>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardBody className="p-6">
              <h3 className="font-medium text-lg text-black mb-3">
                How long does the trip take?
              </h3>
              <p className="text-black">
                The full round trip takes approximately 8-10 hours, departing at
                09:30 AM and returning to Chiang Mai in the evening.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
