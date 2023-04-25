import { type ReactNode } from "react";

export const HeadingContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      {children}
    </div>
  );
};
