"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiMoreVertical,
  FiStar,
  FiUser,
} from "react-icons/fi";
import { useAdminStore } from "@/store/zustand/adminStore";
import { useReviewStore } from "@/store/zustand/reviewStore";
import SupabaseImageUpload from "./SupabaseImageUpload";

interface CustomerReviewForm {
  name: string;
  avatar: string;
  country: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
  trip_date: string;
}

const initialFormData: CustomerReviewForm = {
  name: "",
  avatar: "",
  country: "",
  rating: 5,
  review: "",
  date: new Date().toISOString().split("T")[0],
  verified: true,
  trip_date: new Date().toISOString().split("T")[0],
};

export default function CustomerReviewManager() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<CustomerReviewForm>(initialFormData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    createCustomerReview,
    updateCustomerReview,
    deleteCustomerReview,
    isLoading,
    error,
    successMessage,
    clearMessages,
  } = useAdminStore();

  const { reviews, fetchReviews } = useReviewStore();

  const handleCloseModal = useCallback(() => {
    setFormData(initialFormData);
    setEditingId(null);
    setIsSubmitting(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    if (successMessage) {
      fetchReviews();
      onClose(); // Close modal directly instead of using handleCloseModal
      setTimeout(clearMessages, 3000);
    }
  }, [successMessage, fetchReviews, clearMessages, onClose]);

  const handleOpenModal = (review?: {
    id: number;
    name: string;
    avatar: string;
    country: string;
    rating: number;
    review: string;
    date: string;
    verified: boolean | null;
    trip_date: string | null;
  }) => {
    if (review) {
      setEditingId(review.id);
      setFormData({
        name: review.name,
        avatar: review.avatar || "",
        country: review.country,
        rating: review.rating,
        review: review.review,
        date: review.date,
        verified: review.verified || true,
        trip_date: review.trip_date || new Date().toISOString().split("T")[0],
      });
    } else {
      setEditingId(null);
      setFormData(initialFormData);
    }
    clearMessages();
    onOpen();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingId) {
        await updateCustomerReview(editingId, formData);
      } else {
        await createCustomerReview(formData);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      await deleteCustomerReview(id);
      fetchReviews();
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, avatar: url }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <p className="text-gray-600">
            Manage customer testimonials and reviews
          </p>
        </div>
        <Button
          color="primary"
          className="bg-accent-500 text-white hover:bg-accent-600"
          startContent={<FiPlus />}
          onPress={() => handleOpenModal()}>
          Add Review
        </Button>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600">{successMessage}</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">
            All Reviews ({reviews.length})
          </h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="Customer reviews table">
            <TableHeader>
              <TableColumn>CUSTOMER</TableColumn>
              <TableColumn>RATING</TableColumn>
              <TableColumn>REVIEW</TableColumn>
              <TableColumn>SERVICE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-3 text-gray-900">
                      <Avatar
                        src={review.avatar || undefined}
                        name={review.name}
                        size="sm"
                        fallback={<FiUser />}
                      />
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <p className="text-base text-gray-500">
                          {review.country}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                      <span className="ml-1 text-base text-gray-600">
                        ({review.rating})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="max-w-xs truncate text-gray-900">
                      {review.review}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Chip size="sm" variant="flat">
                      Border Run
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {review.verified && (
                        <Chip size="sm" color="success" variant="flat">
                          Verified
                        </Chip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-900">
                    {new Date(review.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <FiMoreVertical />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem
                          key="edit"
                          startContent={<FiEdit />}
                          onPress={() => handleOpenModal(review)}>
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          startContent={<FiTrash2 />}
                          onPress={() => handleDelete(review.id)}>
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Add/Edit Modal */}
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="2xl">
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader className="text-gray-900">
              {editingId ? "Edit Review" : "Add New Review"}
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Customer Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                />
                <Input
                  label="Location"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Input
                  type="number"
                  label="Rating"
                  min="1"
                  max="5"
                  value={formData.rating.toString()}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      rating: parseInt(e.target.value),
                    }))
                  }
                  required
                />
                <Input
                  type="date"
                  label="Review Date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  required
                />
                <Input
                  type="date"
                  label="Trip Date"
                  value={formData.trip_date}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      trip_date: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <Textarea
                label="Review Text"
                value={formData.review}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    review: e.target.value,
                  }))
                }
                minRows={3}
                required
              />

              <div>
                <label className="block text-base font-medium mb-2 text-gray-800">
                  Customer Avatar
                </label>
                <SupabaseImageUpload
                  currentImageUrl={formData.avatar}
                  category="avatars"
                  onImageUploaded={(url) => handleImageUpload(url)}
                  onImageRemoved={() =>
                    setFormData((prev) => ({ ...prev, avatar: "" }))
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.verified}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          verified: e.target.checked,
                        }))
                      }
                    />
                    <p className="text-gray-800">Verified Customer</p>
                  </label>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="bordered"
                className="text-gray-600"
                onPress={handleCloseModal}>
                Cancel
              </Button>
              <Button
                className="bg-green-500"
                color="primary"
                type="submit"
                isLoading={isSubmitting || isLoading}>
                {editingId ? "Update Review" : "Add Review"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
