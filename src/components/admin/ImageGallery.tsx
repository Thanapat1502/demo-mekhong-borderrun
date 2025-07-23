"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
} from "@heroui/react";
import { FiEdit, FiTrash2, FiEye, FiDownload } from "react-icons/fi";
import Image from "next/image";

interface ImageItem {
  id: string;
  src: string;
  name: string;
  size?: string;
  uploadDate?: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  onEdit?: (image: ImageItem) => void;
  onDelete?: (imageId: string) => void;
  onView?: (image: ImageItem) => void;
  className?: string;
}

export default function ImageGallery({
  images,
  onEdit,
  onDelete,
  onView,
  className = "",
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleView = (image: ImageItem) => {
    setSelectedImage(image);
    onOpen();
    onView?.(image);
  };

  const handleEdit = (image: ImageItem) => {
    onEdit?.(image);
  };

  const handleDelete = (imageId: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      onDelete?.(imageId);
    }
  };

  const handleDownload = (image: ImageItem) => {
    const link = document.createElement("a");
    link.href = image.src;
    link.download = image.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (images.length === 0) {
    return (
      <Card className={`border-2 border-dashed border-gray-300 ${className}`}>
        <CardBody className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <FiEye className="text-4xl mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No images found
          </h3>
          <p className="text-gray-500">Upload some images to see them here</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.map((image) => (
          <Card
            key={image.id}
            className="group hover:shadow-lg transition-shadow duration-300">
            <CardBody className="p-0">
              {/* Image */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-2">
                    <Tooltip
                      content="View Image"
                      placement="top"
                      className="text-black">
                      <Button
                        isIconOnly
                        size="sm"
                        className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                        onPress={() => handleView(image)}>
                        <FiEye />
                      </Button>
                    </Tooltip>
                    {onEdit && (
                      <Tooltip
                        content="Edit Image"
                        placement="top"
                        className="text-black">
                        <Button
                          isIconOnly
                          size="sm"
                          className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                          onPress={() => handleEdit(image)}>
                          <FiEdit />
                        </Button>
                      </Tooltip>
                    )}
                    <Tooltip
                      content="Download Image"
                      placement="top"
                      className="text-black">
                      <Button
                        isIconOnly
                        size="sm"
                        className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                        onPress={() => handleDownload(image)}>
                        <FiDownload />
                      </Button>
                    </Tooltip>
                    {onDelete && (
                      <Tooltip
                        content="Delete Image"
                        placement="top"
                        className="text-white"
                        color="danger">
                        <Button
                          isIconOnly
                          size="sm"
                          className="bg-red-500/80 text-white hover:bg-red-600/80 backdrop-blur-sm"
                          onPress={() => handleDelete(image.id)}>
                          <FiTrash2 />
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Info */}
              <div className="p-3">
                <h4 className="text-sm font-medium text-black truncate">
                  {image.name}
                </h4>
                {image.size && (
                  <p className="text-xs text-gray-500 mt-1">{image.size}</p>
                )}
                {image.uploadDate && (
                  <p className="text-xs text-gray-500">{image.uploadDate}</p>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Image Preview Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        className="max-h-[90vh]">
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-semibold text-black">
              {selectedImage?.name}
            </h3>
          </ModalHeader>
          <ModalBody className="p-0">
            {selectedImage && (
              <div className="relative w-full h-96">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Close
            </Button>
            {selectedImage && (
              <Button
                className="bg-accent-500 text-white hover:bg-accent-600"
                startContent={<FiDownload />}
                onPress={() => selectedImage && handleDownload(selectedImage)}>
                Download
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
