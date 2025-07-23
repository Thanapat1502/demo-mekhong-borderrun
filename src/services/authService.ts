import { supabase } from "@/lib/supabase";
import { AuthError } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
  role?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  error: string | null;
}

class AuthService {
  /**
   * Sign in with email and password
   */
  async signIn(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      if (!supabase) {
        return {
          user: null,
          error: "Authentication service not available",
        };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return {
          user: null,
          error: this.getErrorMessage(error),
        };
      }

      if (!data.user) {
        return {
          user: null,
          error: "Login failed",
        };
      }

      return {
        user: {
          id: data.user.id,
          email: data.user.email || "",
          role: data.user.user_metadata?.role || "admin",
        },
        error: null,
      };
    } catch {
      return {
        user: null,
        error: "An unexpected error occurred",
      };
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<{ error: string | null }> {
    try {
      if (!supabase) {
        return { error: "Authentication service not available" };
      }

      const { error } = await supabase.auth.signOut();

      if (error) {
        return { error: this.getErrorMessage(error) };
      }

      return { error: null };
    } catch {
      return { error: "An unexpected error occurred" };
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      if (!supabase) {
        return null;
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email || "",
        role: user.user_metadata?.role || "admin",
      };
    } catch {
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    if (!supabase) {
      return () => {};
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        callback({
          id: session.user.id,
          email: session.user.email || "",
          role: session.user.user_metadata?.role || "admin",
        });
      } else {
        callback(null);
      }
    });

    return () => subscription.unsubscribe();
  }

  /**
   * Create admin user (for initial setup)
   */
  async createAdminUser(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      if (!supabase) {
        return {
          user: null,
          error: "Authentication service not available",
        };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "admin",
          },
        },
      });

      if (error) {
        return {
          user: null,
          error: this.getErrorMessage(error),
        };
      }

      if (!data.user) {
        return {
          user: null,
          error: "Failed to create admin user",
        };
      }

      return {
        user: {
          id: data.user.id,
          email: data.user.email || "",
          role: "admin",
        },
        error: null,
      };
    } catch {
      return {
        user: null,
        error: "An unexpected error occurred",
      };
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      if (!supabase) {
        return { error: "Authentication service not available" };
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) {
        return { error: this.getErrorMessage(error) };
      }

      return { error: null };
    } catch {
      return { error: "An unexpected error occurred" };
    }
  }

  /**
   * Convert Supabase auth error to user-friendly message
   */
  private getErrorMessage(error: AuthError): string {
    switch (error.message) {
      case "Invalid login credentials":
        return "Invalid email or password";
      case "Email not confirmed":
        return "Please check your email and confirm your account";
      case "Too many requests":
        return "Too many login attempts. Please try again later";
      default:
        return error.message || "An error occurred during authentication";
    }
  }
}

export const authService = new AuthService();
