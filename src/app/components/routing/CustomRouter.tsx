import * as React from "react";
import { MemoryRouter } from "react-router";

interface CustomRouterProps {
  children: React.ReactNode;
}

/**
 * CustomRouter Adapter
 * Automatically selects the best router based on the environment.
 * - In Figma preview/sandboxed environments, it uses MemoryRouter to prevent history errors.
 * - For private health management PWAs, MemoryRouter is also used to ensure internal state
 *   is not exposed in the browser URL, aligning with the project's high privacy standards.
 */
export const CustomRouter: React.FC<CustomRouterProps> = ({ children }) => {
  return (
    <MemoryRouter 
      future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}
    >
      {children}
    </MemoryRouter>
  );
};
