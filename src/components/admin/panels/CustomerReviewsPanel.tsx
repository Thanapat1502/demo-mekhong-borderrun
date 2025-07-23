"use client";

import {
  Card,
  CardBody,
  CardHeader,
} from "@heroui/react";
import CustomerReviewManager from "@/components/admin/CustomerReviewManager";

export default function CustomerReviewsPanel() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">
          Customer Reviews
        </h2>
      </CardHeader>
      <CardBody>
        <CustomerReviewManager />
      </CardBody>
    </Card>
  );
}
