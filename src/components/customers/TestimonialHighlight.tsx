import { Card, CardBody, Avatar } from "@heroui/react";
import { Review } from "@/store/zustand/reviewStore";

export default function TestimonialHighlight(props: { item?: Review }) {
  const { item } = props;

  // Return null if no item is provided
  if (!item) {
    return null;
  }
  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl bg-gradient-to-r from-accent-50 to-neutral-50">
          <CardBody className="p-16 text-center">
            <div className="text-6xl text-accent-200 mb-6">&quot;</div>
            <p className="text-2xl md:text-3xl text-black italic mb-8 leading-relaxed">
              {item.review || ""}
            </p>
            <div className="text-6xl text-accent-200 mb-6">&quot;</div>
            <div className="flex items-center justify-center gap-4">
              <Avatar
                src={item.avatar || "/image/default-avatar.png"}
                alt="Featured Customer"
                className="w-16 h-16"
              />
              <div className="text-left">
                <h4 className="font-medium text-black">{item.name || ""}</h4>
                <p className="text-black">{item.country || ""}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
