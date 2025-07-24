import { supabase, TABLES, OwnerInfoRow, ContactInfoRow } from "@/lib/supabase";
import {
  uploadOwnerImageComplete,
  OwnerImageData,
} from "@/lib/categorized-image-storage";

export interface ContactFormData {
  guideName: string;
  phone: string;
  email: string;
  whatsapp: string;
  line: string;
  address: string;
}

export interface ContactInfoServiceResult {
  success: boolean;
  error?: string;
  data?: {
    contactInfo?: ContactInfoRow[];
    ownerInfo?: OwnerInfoRow | null;
    avatarUrl?: string;
  };
}

// Fetch contact info and owner info
export const fetchContactData = async (): Promise<ContactInfoServiceResult> => {
  try {
    console.log("Fetching contact data...");

    // Fetch contact info
    const { data: contactData, error: contactError } = await supabase
      .from(TABLES.CONTACT_INFO)
      .select("*")
      .eq("is_public", true);

    if (contactError) {
      console.error("Contact info error:", contactError);
      return { success: false, error: "Failed to fetch contact info" };
    }

    // Fetch owner info
    const { data: ownerData, error: ownerError } = await supabase
      .from(TABLES.OWNER_INFO)
      .select("*")
      .single();

    if (ownerError && ownerError.code !== "PGRST116") {
      console.error("Owner info error:", ownerError);
      return { success: false, error: "Failed to fetch owner info" };
    }

    console.log("Contact data fetched successfully:", {
      contactData,
      ownerData,
    });

    return {
      success: true,
      data: {
        contactInfo: contactData || [],
        ownerInfo: ownerData || null,
      },
    };
  } catch (error) {
    console.error("Error in fetchContactData:", error);
    return { success: false, error: "Failed to fetch contact data" };
  }
};

// Upload owner image
export const uploadOwnerImage = async (
  imageFile: File,
  guideName: string
): Promise<ContactInfoServiceResult> => {
  try {
    console.log("Uploading owner image...", {
      fileName: imageFile.name,
      guideName,
    });

    const ownerImageData: OwnerImageData = {
      title: `${guideName.trim()} Profile`,
      alt: `Profile image for ${guideName.trim()}`,
      description: `Profile image for ${guideName.trim()}`,
      owner_name: guideName.trim(),
      position: "Guide/Owner",
    };

    const uploadResult = await uploadOwnerImageComplete(
      imageFile,
      ownerImageData
    );

    if (uploadResult.success && uploadResult.url) {
      console.log("Image uploaded successfully:", uploadResult.url);
      return {
        success: true,
        data: { avatarUrl: uploadResult.url },
      };
    } else {
      console.error("Image upload failed:", uploadResult.error);
      return {
        success: false,
        error: uploadResult.error || "Failed to upload image",
      };
    }
  } catch (error) {
    console.error("Error in uploadOwnerImage:", error);
    return { success: false, error: "Failed to upload image" };
  }
};

// Update or create owner info
export const saveOwnerInfo = async (
  formData: ContactFormData,
  avatarUrl: string | null,
  existingOwnerInfo: OwnerInfoRow | null
): Promise<ContactInfoServiceResult> => {
  try {
    console.log("Saving owner info...", {
      formData,
      avatarUrl,
      hasExisting: !!existingOwnerInfo,
    });

    if (existingOwnerInfo) {
      // Update existing owner info
      const { error: ownerError } = await supabase
        .from(TABLES.OWNER_INFO)
        .update({
          name: formData.guideName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          whatsapp: formData.whatsapp.trim() || null,
          line: formData.line.trim() || null,
          avatar: avatarUrl,
          address: formData.address.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingOwnerInfo.id);

      if (ownerError) {
        console.error("Error updating owner info:", ownerError);
        return { success: false, error: "Failed to update owner info" };
      }

      console.log("Owner info updated successfully");
    } else {
      // Create new owner info
      const { error: ownerError } = await supabase
        .from(TABLES.OWNER_INFO)
        .insert({
          name: formData.guideName.trim(),
          title: "Licensed Tour Operator",
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          whatsapp: formData.whatsapp.trim() || null,
          line: formData.line.trim() || null,
          avatar: avatarUrl,
        });

      if (ownerError) {
        console.error("Error creating owner info:", ownerError);
        return { success: false, error: "Failed to create owner info" };
      }

      console.log("Owner info created successfully");
    }

    return { success: true };
  } catch (error) {
    console.error("Error in saveOwnerInfo:", error);
    return { success: false, error: "Failed to save owner info" };
  }
};

// Update contact info records
export const updateContactInfoRecords = async (
  formData: ContactFormData
): Promise<ContactInfoServiceResult> => {
  try {
    console.log("Updating contact info records...", formData);

    const contactUpdates = [
      { type: "phone", value: formData.phone.trim() },
      { type: "email", value: formData.email.trim() },
      { type: "whatsapp", value: formData.whatsapp.trim() },
      { type: "line", value: formData.line.trim() },
      { type: "address", value: formData.address.trim() },
    ];

    // Update each contact info record
    for (const contact of contactUpdates) {
      if (contact.value) {
        console.log(
          `Processing contact type: ${contact.type}, value: ${contact.value}`
        );

        // Check if record exists
        const { data: existingRecord, error: selectError } = await supabase
          .from(TABLES.CONTACT_INFO)
          .select("type")
          .eq("type", contact.type)
          .single();

        if (selectError && selectError.code !== "PGRST116") {
          console.error(
            `Error checking existing record for ${contact.type}:`,
            selectError
          );
          continue;
        }

        if (existingRecord) {
          console.log(`Updating existing record for ${contact.type}`);
          // Update existing record
          const { error: updateError } = await supabase
            .from(TABLES.CONTACT_INFO)
            .update({
              value: contact.value,
              updated_at: new Date().toISOString(),
            })
            .eq("type", contact.type);

          if (updateError) {
            console.error(`Error updating ${contact.type}:`, updateError);
          } else {
            console.log(`Successfully updated ${contact.type}`);
          }
        } else {
          console.log(`Creating new record for ${contact.type}`);
          // Create new record
          const { error: insertError } = await supabase
            .from(TABLES.CONTACT_INFO)
            .insert({
              type: contact.type,
              value: contact.value,
              is_public: true,
              is_primary: true,
            });

          if (insertError) {
            console.error(`Error inserting ${contact.type}:`, insertError);
          } else {
            console.log(`Successfully created ${contact.type}`);
          }
        }
      }
    }

    console.log("Contact info records updated successfully");
    return { success: true };
  } catch (error) {
    console.error("Error in updateContactInfoRecords:", error);
    return { success: false, error: "Failed to update contact info records" };
  }
};

// Main save function that orchestrates all operations
export const saveContactInfo = async (
  formData: ContactFormData,
  imageFile: File | null,
  existingOwnerInfo: OwnerInfoRow | null
): Promise<ContactInfoServiceResult> => {
  try {
    console.log("Starting saveContactInfo process...");

    // Step 1: Upload image if provided
    let avatarUrl = existingOwnerInfo?.avatar || null;
    if (imageFile) {
      console.log("Step 1: Uploading image...");
      const imageResult = await uploadOwnerImage(imageFile, formData.guideName);
      if (!imageResult.success) {
        return imageResult;
      }
      avatarUrl = imageResult.data?.avatarUrl || null;
    }

    // Step 2: Save owner info
    console.log("Step 2: Saving owner info...");
    const ownerResult = await saveOwnerInfo(
      formData,
      avatarUrl,
      existingOwnerInfo
    );
    if (!ownerResult.success) {
      return ownerResult;
    }

    // Step 3: Update contact info records
    console.log("Step 3: Updating contact info records...");
    const contactResult = await updateContactInfoRecords(formData);
    if (!contactResult.success) {
      return contactResult;
    }

    console.log("All contact info saved successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error in saveContactInfo:", error);
    return { success: false, error: "Failed to save contact information" };
  }
};
