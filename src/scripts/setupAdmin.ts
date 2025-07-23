/**
 * Script to set up the admin user for the Mekong Border Run admin panel
 * Run this script once to create the admin user in Supabase
 */

import { authService } from "@/services/authService";

const ADMIN_EMAIL = "admin@mekong-borderrun.com";
const ADMIN_PASSWORD = "Mekong@1234";

async function setupAdminUser() {
  console.log("🚀 Setting up admin user...");
  
  try {
    // Check if admin user already exists
    console.log("📧 Checking if admin user exists...");
    
    // Try to sign in first to see if user exists
    const signInResult = await authService.signIn({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    if (signInResult.user) {
      console.log("✅ Admin user already exists and can sign in successfully!");
      console.log(`📧 Email: ${ADMIN_EMAIL}`);
      console.log(`🔑 Password: ${ADMIN_PASSWORD}`);
      return;
    }

    // If sign in failed, try to create the user
    console.log("👤 Creating admin user...");
    const createResult = await authService.createAdminUser(ADMIN_EMAIL, ADMIN_PASSWORD);

    if (createResult.error) {
      console.error("❌ Failed to create admin user:", createResult.error);
      return;
    }

    console.log("✅ Admin user created successfully!");
    console.log(`📧 Email: ${ADMIN_EMAIL}`);
    console.log(`🔑 Password: ${ADMIN_PASSWORD}`);
    console.log("");
    console.log("🔐 You can now access the admin panel at: /admin");
    console.log("📝 Please save these credentials securely!");

  } catch (error) {
    console.error("❌ Error setting up admin user:", error);
  }
}

// Instructions for manual setup
export function printSetupInstructions() {
  console.log("=".repeat(60));
  console.log("🔧 ADMIN USER SETUP INSTRUCTIONS");
  console.log("=".repeat(60));
  console.log("");
  console.log("If you need to manually create the admin user:");
  console.log("");
  console.log("1. Go to your Supabase dashboard");
  console.log("2. Navigate to Authentication > Users");
  console.log("3. Click 'Add user'");
  console.log("4. Enter the following details:");
  console.log(`   📧 Email: ${ADMIN_EMAIL}`);
  console.log(`   🔑 Password: ${ADMIN_PASSWORD}`);
  console.log("5. Set user metadata (optional):");
  console.log('   {"role": "admin"}');
  console.log("");
  console.log("6. Save the user");
  console.log("");
  console.log("🔐 Admin panel URL: /admin");
  console.log("=".repeat(60));
}

// Export the setup function for use in other scripts
export { setupAdminUser, ADMIN_EMAIL, ADMIN_PASSWORD };

// If this script is run directly
if (typeof window === "undefined" && require.main === module) {
  setupAdminUser().then(() => {
    console.log("");
    printSetupInstructions();
  });
}
