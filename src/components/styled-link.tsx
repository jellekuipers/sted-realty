import Link from "next/link";
import { type ReactNode } from "react";

export const StyledLink = ({
  children,
  href,
  variant,
}: {
  children: ReactNode;
  href: string;
  variant?: "button" | "link";
}) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
    >
      {children}
    </Link>
  );
};
