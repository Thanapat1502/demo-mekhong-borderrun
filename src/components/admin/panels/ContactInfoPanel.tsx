"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import ContactInfoManager from "@/components/admin/ContactInfoManager";

export default function ContactInfoPanel() {
  return (
    <Card className="shadow-lg bg-white">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">
          Contact Information
        </h2>
      </CardHeader>
      <CardBody>
        <ContactInfoManager />
      </CardBody>
    </Card>
  );
}
