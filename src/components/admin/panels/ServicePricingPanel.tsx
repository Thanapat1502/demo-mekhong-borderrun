"use client";

import {
  Card,
  CardBody,
  CardHeader,
} from "@heroui/react";
import ServicePricingManager from "@/components/admin/ServicePricingManager";

export default function ServicePricingPanel() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">
          Service Pricing
        </h2>
      </CardHeader>
      <CardBody>
        <ServicePricingManager />
      </CardBody>
    </Card>
  );
}
