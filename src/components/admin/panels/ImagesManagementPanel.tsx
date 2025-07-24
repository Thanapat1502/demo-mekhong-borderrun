"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { FiPlus, FiTrash2, FiSave, FiX } from "react-icons/fi";
import ImageGallery from "@/components/admin/ImageGallery";
import Image from "next/image";
import { useContentStore } from "@/store/zustand/contentStore";
import {
  uploadPickupPointImageComplete,
  updatePickupPointImage,
  deletePickupPointImageComplete,
} from "@/lib/pickup-point-storage";

interface ImageDataItem {
  id: string;
  src: string;
  name: string; // For ImageGallery compatibility
  alt: string;
  title: string;
  location: string;
  description: string;
  google_map_url?: string;
  size?: string;
  uploadDate?: string;
}

export default function ImagesManagementPanel() {
  // Get pickup point images from Zustand store
  const { pickupPointImages, fetchPickupPointImages } = useContentStore();

  // Modal states
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const {
    isOpen: isUploadModalOpen,
    onOpen: onUploadModalOpen,
    onClose: onUploadModalClose,
  } = useDisclosure();

  // Form states
  const [editingImage, setEditingImage] = useState<ImageDataItem | null>(null);
  const [imageToDelete, setImageToDelete] = useState<ImageDataItem | null>(
    null
  );
  const [formData, setFormData] = useState({
    title: "",
    alt: "",
    location: "",
    description: "",
    google_map_url: "",
  });

  // Upload form states
  const [uploadFormData, setUploadFormData] = useState({
    title: "",
    alt: "",
    location: "",
    description: "",
    google_map_url: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch pickup point images on component mount
  useEffect(() => {
    fetchPickupPointImages();
  }, [fetchPickupPointImages]);

  // Convert pickup point images to ImageDataItem format
  const pickupImages: ImageDataItem[] = pickupPointImages.map((img) => ({
    id: img.id,
    src: img.src,
    name: img.title, // Use title as name for ImageGallery compatibility
    alt: img.alt,
    title: img.title,
    location: img.location,
    description: img.description,
    google_map_url: "", // Will be added in database
    size: "1.2 MB", // Default size - in real app would come from file metadata
    uploadDate: "2024-01-17",
  }));

  // File handling for upload modal
  const [dragActive, setDragActive] = useState(false);

  const processFiles = (files: File[]) => {
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);

      // Create previews
      const previews = validFiles.map((file) => URL.createObjectURL(file));
      setFilePreviews(previews);

      // Auto-fill title if only one file
      if (validFiles.length === 1 && !uploadFormData.title) {
        setUploadFormData((prev) => ({
          ...prev,
          title: validFiles[0].name.split(".")[0],
          alt: `${validFiles[0].name.split(".")[0]} pickup point`,
        }));
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    processFiles(files);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = filePreviews.filter((_, i) => i !== index);

    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(filePreviews[index]);

    setSelectedFiles(newFiles);
    setFilePreviews(newPreviews);
  };

  const handleUploadSubmit = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of selectedFiles) {
        const result = await uploadPickupPointImageComplete(file, {
          title: uploadFormData.title || file.name.split(".")[0],
          alt: uploadFormData.alt || `${file.name.split(".")[0]} pickup point`,
          location: uploadFormData.location || "Chiang Mai",
          description:
            uploadFormData.description || `Pickup point image: ${file.name}`,
          google_map_url: uploadFormData.google_map_url || "",
        });

        if (!result.success) {
          console.error("Upload failed:", result.error);
          // TODO: Show error toast
        } else {
          console.log("Upload successful:", result);
          // TODO: Show success toast
        }
      }

      // Refresh the images list
      await fetchPickupPointImages();

      // Close modal and reset form
      onUploadModalClose();
      setSelectedFiles([]);
      setFilePreviews([]);
      setUploadFormData({
        title: "",
        alt: "",
        location: "",
        description: "",
        google_map_url: "",
      });
    } catch (error) {
      console.error("Upload error:", error);
      // TODO: Show error toast
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadCancel = () => {
    // Revoke all preview URLs
    filePreviews.forEach((url) => URL.revokeObjectURL(url));

    // Reset states
    setSelectedFiles([]);
    setFilePreviews([]);
    setUploadFormData({
      title: "",
      alt: "",
      location: "",
      description: "",
      google_map_url: "",
    });
    onUploadModalClose();
  };

  const handleImageEdit = (image: ImageDataItem) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      alt: image.alt,
      location: image.location,
      description: image.description || "",
      google_map_url: image.google_map_url || "",
    });
    onEditModalOpen();
  };

  const handleImageDelete = (imageId: string) => {
    const image = pickupImages.find((img) => img.id === imageId);
    if (image) {
      setImageToDelete(image);
      onDeleteModalOpen();
    }
  };

  const handleImageView = (image: ImageDataItem) => {
    console.log("Viewing image:", image);
    // TODO: Implement view functionality
  };

  // Wrapper functions for ImageGallery compatibility
  const handleGalleryEdit = (image: {
    id: string;
    src: string;
    name: string;
  }) => {
    // Find the full image data from pickupImages
    const fullImage = pickupImages.find((img) => img.id === image.id);
    if (fullImage) {
      handleImageEdit(fullImage);
    }
  };

  const handleGalleryView = (image: {
    id: string;
    src: string;
    name: string;
  }) => {
    // Find the full image data from pickupImages
    const fullImage = pickupImages.find((img) => img.id === image.id);
    if (fullImage) {
      handleImageView(fullImage);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingImage) return;

    setIsSaving(true);

    try {
      const success = await updatePickupPointImage(editingImage.id, {
        title: formData.title,
        alt: formData.alt,
        location: formData.location,
        description: formData.description,
        google_map_url: formData.google_map_url,
      });

      if (success) {
        console.log("Image updated successfully");
        // TODO: Show success toast
        await fetchPickupPointImages(); // Refresh the list
        onEditModalClose();
        setEditingImage(null);
      } else {
        console.error("Failed to update image");
        // TODO: Show error toast
      }
    } catch (error) {
      console.error("Save error:", error);
      // TODO: Show error toast
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!imageToDelete) return;

    setIsDeleting(true);

    try {
      // Extract storage path from URL (get filename from URL)
      const url = imageToDelete.src;
      const fileName = url.split("/").pop() || "";

      const success = await deletePickupPointImageComplete(
        imageToDelete.id,
        fileName
      );

      if (success) {
        console.log("Image deleted successfully");
        // TODO: Show success toast
        await fetchPickupPointImages(); // Refresh the list
        onDeleteModalClose();
        setImageToDelete(null);
      } else {
        console.error("Failed to delete image");
        // TODO: Show error toast
      }
    } catch (error) {
      console.error("Delete error:", error);
      // TODO: Show error toast
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Pickup Point Images
            </h2>
            <Button
              className="bg-accent-500 text-white hover:bg-accent-600"
              startContent={<FiPlus />}
              size="sm"
              onPress={onUploadModalOpen}>
              Upload New Image
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            {/* Existing Images */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Current Pickup Point Images ({pickupImages.length})
              </h3>
              <ImageGallery
                images={pickupImages}
                onEdit={handleGalleryEdit}
                onDelete={handleImageDelete}
                onView={handleGalleryView}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Edit Image Modal */}
      <Modal isOpen={isEditModalOpen} onClose={onEditModalClose} size="lg">
        <ModalContent>
          <ModalHeader className="text-gray-800">
            Edit Image Information
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Image Title"
                placeholder="Enter image title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <Input
                label="Alt Text"
                placeholder="Enter alt text for accessibility"
                value={formData.alt}
                onChange={(e) =>
                  setFormData({ ...formData, alt: e.target.value })
                }
              />
              <Input
                label="Location"
                placeholder="Enter pickup location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
              <Textarea
                label="Description"
                placeholder="Enter image description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
              <Input
                label="Google Map URL"
                placeholder="Enter Google Maps URL (optional)"
                value={formData.google_map_url}
                onChange={(e) =>
                  setFormData({ ...formData, google_map_url: e.target.value })
                }
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="bordered"
              onPress={onEditModalClose}
              startContent={<FiX />}
              className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancel
            </Button>
            <Button
              color="success"
              onPress={handleSaveEdit}
              startContent={<FiSave />}
              isLoading={isSaving}
              className="bg-green-600 text-white hover:bg-green-700">
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} size="md">
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete the image &ldquo;
              <strong>{imageToDelete?.name}</strong>&rdquo;?
            </p>
            <p className="text-sm text-gray-600 mt-2">
              This action cannot be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="bordered"
              onPress={onDeleteModalClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={handleConfirmDelete}
              startContent={<FiTrash2 />}
              isLoading={isDeleting}>
              Delete Image
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Upload New Image Modal */}
      <Modal isOpen={isUploadModalOpen} onClose={handleUploadCancel} size="2xl">
        <ModalContent>
          <ModalHeader>Upload New Pickup Point Image</ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              {/* Image Upload Section */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Select Images
                </h4>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive
                      ? "border-accent-500 bg-accent-50"
                      : "border-gray-300 hover:border-accent-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="upload-file-input"
                  />
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        dragActive
                          ? "bg-accent-500 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                      <FiPlus className="text-xl" />
                    </div>
                    <div>
                      <Button
                        as="label"
                        htmlFor="upload-file-input"
                        variant="bordered"
                        className="cursor-pointer">
                        Choose Images
                      </Button>
                      <p className="text-sm text-gray-600 mt-2">
                        Or drag and drop images here
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Supports JPG, PNG, WebP up to 5MB each
                      </p>
                    </div>
                  </div>
                </div>

                {/* File Previews */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-md font-medium text-gray-800 mb-3">
                      Selected Images ({selectedFiles.length})
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={filePreviews[index]}
                              alt={file.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onPress={() => handleRemoveFile(index)}>
                            <FiX />
                          </Button>
                          <p className="text-xs text-gray-600 mt-1 truncate">
                            {file.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Image Information Form */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Image Information
                </h4>
                <Input
                  label="Image Title"
                  placeholder="Enter image title"
                  value={uploadFormData.title}
                  onChange={(e) =>
                    setUploadFormData({
                      ...uploadFormData,
                      title: e.target.value,
                    })
                  }
                />
                <Input
                  label="Alt Text"
                  placeholder="Enter alt text for accessibility"
                  value={uploadFormData.alt}
                  onChange={(e) =>
                    setUploadFormData({
                      ...uploadFormData,
                      alt: e.target.value,
                    })
                  }
                />
                <Input
                  label="Location"
                  placeholder="Enter pickup location"
                  value={uploadFormData.location}
                  onChange={(e) =>
                    setUploadFormData({
                      ...uploadFormData,
                      location: e.target.value,
                    })
                  }
                />
                <Textarea
                  label="Description"
                  placeholder="Enter image description"
                  value={uploadFormData.description}
                  onChange={(e) =>
                    setUploadFormData({
                      ...uploadFormData,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
                <Input
                  label="Google Map URL"
                  placeholder="Enter Google Maps URL (optional)"
                  value={uploadFormData.google_map_url}
                  onChange={(e) =>
                    setUploadFormData({
                      ...uploadFormData,
                      google_map_url: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="bordered"
              onPress={handleUploadCancel}
              startContent={<FiX />}
              className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancel
            </Button>
            <Button
              color="success"
              onPress={handleUploadSubmit}
              startContent={<FiSave />}
              isLoading={isUploading}
              isDisabled={selectedFiles.length === 0}
              className="bg-green-600 text-white hover:bg-green-700">
              Upload Images
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
