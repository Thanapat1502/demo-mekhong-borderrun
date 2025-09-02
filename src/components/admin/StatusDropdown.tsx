"use client";

import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Chip,
} from "@heroui/react";
import { FiChevronDown, FiCheck, FiX, FiClock, FiUser } from "react-icons/fi";

export type StatusOption = {
  key: string;
  label: string;
  color: "success" | "warning" | "danger" | "primary" | "default";
  icon?: React.ReactNode;
  description?: string;
};

interface StatusDropdownProps {
  currentStatus: string;
  statusOptions: StatusOption[];
  onStatusChange: (newStatus: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?:
    | "flat"
    | "bordered"
    | "solid"
    | "shadow"
    | "light"
    | "faded"
    | "ghost";
  showCurrentAsChip?: boolean;
  className?: string;
}

// Default status options for contact requests
export const DEFAULT_CONTACT_STATUS_OPTIONS: StatusOption[] = [
  {
    key: "new",
    label: "New",
    color: "danger",
    icon: <FiClock className="w-4 h-4" />,
    description: "Recently received request",
  },
  {
    key: "contacted",
    label: "Contacted",
    color: "primary",
    icon: <FiUser className="w-4 h-4" />,
    description: "Customer has been contacted",
  },
  {
    key: "confirmed",
    label: "Confirmed",
    color: "success",
    icon: <FiCheck className="w-4 h-4" />,
    description: "Booking confirmed",
  },
  {
    key: "completed",
    label: "Completed",
    color: "success",
    icon: <FiCheck className="w-4 h-4" />,
    description: "Service completed",
  },
  {
    key: "cancelled",
    label: "Cancelled",
    color: "default",
    icon: <FiX className="w-4 h-4" />,
    description: "Request cancelled",
  },
];

export default function StatusDropdown({
  currentStatus,
  statusOptions = DEFAULT_CONTACT_STATUS_OPTIONS,
  onStatusChange,
  isLoading = false,
  disabled = false,
  size = "sm",
  variant = "flat",
  showCurrentAsChip = true,
  className = "",
}: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    if (newStatus !== currentStatus && !isLoading && !disabled) {
      onStatusChange(newStatus);
    }
    setIsOpen(false);
  };

  const getStatusColor = (
    status: string
  ): "success" | "warning" | "danger" | "primary" | "default" => {
    const option = statusOptions.find((opt) => opt.key === status);
    return option?.color || "default";
  };

  const getStatusLabel = (status: string): string => {
    const option = statusOptions.find((opt) => opt.key === status);
    return option?.label || status;
  };

  const getStatusIcon = (status: string): React.ReactNode => {
    const option = statusOptions.find((opt) => opt.key === status);
    return option?.icon;
  };

  if (showCurrentAsChip) {
    return (
      <Dropdown
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="bottom-start"
        className={className}>
        <DropdownTrigger>
          <Button
            variant="light"
            size={size}
            isDisabled={disabled || isLoading}
            className="p-0 min-w-0 h-auto">
            <Chip
              color={getStatusColor(currentStatus)}
              size={size}
              variant="flat"
              startContent={getStatusIcon(currentStatus)}
              endContent={
                !disabled && !isLoading ? (
                  <FiChevronDown className="w-3 h-3" />
                ) : null
              }
              className="cursor-pointer hover:opacity-80 transition-opacity">
              {getStatusLabel(currentStatus)}
            </Chip>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Status options"
          onAction={(key) => handleStatusChange(key as string)}
          selectedKeys={[currentStatus]}
          selectionMode="single"
          disabledKeys={
            disabled || isLoading ? statusOptions.map((opt) => opt.key) : []
          }
          classNames={{
            base: "bg-white",
            list: "bg-white",
          }}>
          {statusOptions.map((option) => (
            <DropdownItem
              key={option.key}
              startContent={option.icon}
              description={option.description}
              className={`bg-white hover:bg-gray-50 ${
                currentStatus === option.key ? "bg-gray-100" : ""
              }`}>
              <div className="flex items-center gap-2">
                <Chip
                  color={option.color}
                  size="sm"
                  variant="flat"
                  className="text-xs">
                  {option.label}
                </Chip>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-start"
      className={className}>
      <DropdownTrigger>
        <Button
          variant={variant}
          size={size}
          isDisabled={disabled || isLoading}
          startContent={getStatusIcon(currentStatus)}
          endContent={<FiChevronDown className="w-4 h-4" />}
          color={getStatusColor(currentStatus)}
          className="justify-between">
          {getStatusLabel(currentStatus)}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Status options"
        onAction={(key) => handleStatusChange(key as string)}
        selectedKeys={[currentStatus]}
        selectionMode="single"
        disabledKeys={
          disabled || isLoading ? statusOptions.map((opt) => opt.key) : []
        }
        classNames={{
          base: "bg-white",
          list: "bg-white",
        }}>
        {statusOptions.map((option) => (
          <DropdownItem
            key={option.key}
            startContent={option.icon}
            description={option.description}
            className={`bg-white hover:bg-gray-50 ${
              currentStatus === option.key ? "bg-gray-100" : ""
            }`}>
            <div className="flex items-center gap-2">
              <Chip
                color={option.color}
                size="sm"
                variant="flat"
                className="text-xs">
                {option.label}
              </Chip>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

// Hook for managing status updates
export const useStatusManager = (
  initialStatuses: Record<string, string> = {},
  onStatusUpdate?: (id: string, newStatus: string) => Promise<void>
) => {
  const [statuses, setStatuses] =
    useState<Record<string, string>>(initialStatuses);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const updateStatus = async (id: string, newStatus: string) => {
    if (statuses[id] === newStatus) return;

    setLoadingStates((prev) => ({ ...prev, [id]: true }));

    try {
      if (onStatusUpdate) {
        await onStatusUpdate(id, newStatus);
      }
      setStatuses((prev) => ({ ...prev, [id]: newStatus }));
    } catch (error) {
      console.error(`Failed to update status for ${id}:`, error);
      // Optionally show error notification here
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const getStatus = (id: string) => statuses[id] || "new";
  const isLoading = (id: string) => loadingStates[id] || false;

  return {
    statuses,
    updateStatus,
    getStatus,
    isLoading,
    setStatuses,
  };
};
