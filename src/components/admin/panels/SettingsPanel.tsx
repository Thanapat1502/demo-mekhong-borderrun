"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Switch,
  Divider,
} from "@heroui/react";
import { FiSave, FiRefreshCw, FiDatabase, FiShield } from "react-icons/fi";

export default function SettingsPanel() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">
          General Settings
        </h2>
      </CardHeader>
      <CardBody>
        <div className="space-y-6">
          {/* Website Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Website Settings
            </h3>
            <div className="space-y-4">
              <Input
                label="Website Title"
                placeholder="Mekong Border Run"
                defaultValue="Mekong Border Run"
                size="lg"
              />
              <Input
                label="Website Description"
                placeholder="Professional border run service from Chiang Mai"
                defaultValue="Professional border run service from Chiang Mai"
                size="lg"
              />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Maintenance Mode</p>
                  <p className="text-sm text-gray-600">
                    Enable to show maintenance page to visitors
                  </p>
                </div>
                <Switch defaultSelected={false} />
              </div>
            </div>
          </div>

          <Divider />

          {/* Business Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Business Settings
            </h3>
            <div className="space-y-4">
              <Input
                label="Business Hours"
                placeholder="9:00 AM - 6:00 PM"
                defaultValue="9:00 AM - 6:00 PM"
                size="lg"
              />
              <Input
                label="Service Area"
                placeholder="Chiang Mai, Thailand"
                defaultValue="Chiang Mai, Thailand"
                size="lg"
              />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Online Booking</p>
                  <p className="text-sm text-gray-600">
                    Allow customers to book services online
                  </p>
                </div>
                <Switch defaultSelected={true} />
              </div>
            </div>
          </div>

          <Divider />

          {/* System Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              System Settings
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<FiDatabase />}
                  size="lg"
                >
                  Backup Data
                </Button>
                <Button
                  color="warning"
                  variant="flat"
                  startContent={<FiRefreshCw />}
                  size="lg"
                >
                  Clear Cache
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Analytics Tracking</p>
                  <p className="text-sm text-gray-600">
                    Enable visitor analytics and tracking
                  </p>
                </div>
                <Switch defaultSelected={true} />
              </div>
            </div>
          </div>

          <Divider />

          {/* Security Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Security Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">
                    Add extra security to admin login
                  </p>
                </div>
                <Switch defaultSelected={false} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Login Notifications</p>
                  <p className="text-sm text-gray-600">
                    Get notified of admin login attempts
                  </p>
                </div>
                <Switch defaultSelected={true} />
              </div>

              <Button
                color="danger"
                variant="flat"
                startContent={<FiShield />}
                size="lg"
                className="w-full md:w-auto"
              >
                Change Admin Password
              </Button>
            </div>
          </div>

          <Divider />

          {/* Save Settings */}
          <div className="flex justify-end">
            <Button
              color="primary"
              size="lg"
              startContent={<FiSave />}
              className="min-w-[200px]"
            >
              Save All Settings
            </Button>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">
              🚀 Enhanced Settings Coming Soon
            </h3>
            <p className="text-blue-700">
              Additional settings and configuration options will be
              available in future updates, including email templates,
              payment gateway settings, and advanced customization options.
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
