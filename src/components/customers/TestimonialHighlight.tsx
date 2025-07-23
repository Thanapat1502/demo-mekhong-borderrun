import { Card, CardBody, Avatar } from "@heroui/react";

export default function TestimonialHighlight() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl bg-gradient-to-r from-accent-50 to-neutral-50">
          <CardBody className="p-16 text-center">
            <div className="text-6xl text-accent-200 mb-6">&quot;</div>
            <p className="text-2xl md:text-3xl text-black italic mb-8 leading-relaxed">
              Mekong Transfer made my visa run incredibly easy. Professional, punctual, 
              and stress-free. I&apos;ve recommended them to all my expat friends in Chiang Mai.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Avatar
                src="https://i.pravatar.cc/150?img=15"
                alt="Featured Customer"
                className="w-16 h-16"
              />
              <div className="text-left">
                <h4 className="font-medium text-black">Michael Chang</h4>
                <p className="text-black">Digital Nomad, Singapore</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
