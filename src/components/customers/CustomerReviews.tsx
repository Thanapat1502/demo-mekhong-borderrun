import { Card, CardBody, Avatar } from "@heroui/react";
import { FiStar } from "react-icons/fi";

interface CustomerReviewsProps {
  id: number;
  name: string;
  country: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
}
export default function CustomerReviews(props: {
  customerReviews: CustomerReviewsProps[];
}) {
  const { customerReviews } = props;
  return (
    <section className="py-24 px-6 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-black mb-6">
            Customer Reviews
          </h2>
          <p className="text-lg text-black">
            Real experiences from real customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {customerReviews.map((review) => (
            <Card
              key={review.id}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardBody className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12"
                  />
                  <div>
                    <h3 className="font-medium text-black">{review.name}</h3>
                    <p className="text-sm text-black">{review.country}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="text-accent-500 fill-current"
                      size={16}
                    />
                  ))}
                </div>

                <p className="text-black leading-relaxed mb-4">
                  &quot;{review.review}&quot;
                </p>

                <div className="text-sm text-black">
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
