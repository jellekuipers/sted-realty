import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const Footer = () => {
  const { data: session, status } = useSession();

  const t = useTranslations();

  const hasAdminRole = session?.user.role === "ADMIN";
  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";

  return (
    <footer className="bg-white">
      <div className="space-y-12 overflow-hidden py-20 px-6 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 space-y-4 sm:flex sm:justify-center sm:space-y-0 sm:space-x-12"
          aria-label="Footer"
        >
          {isAuthenticated && hasAdminRole && (
            <Link
              href="/admin"
              className="block leading-6 text-gray-600 hover:opacity-80"
            >
              {t("admin")}
            </Link>
          )}
          <Link
            href="/listings"
            className="block leading-6 text-gray-600 hover:opacity-80"
          >
            {t("listings")}
          </Link>
          {isAuthenticated && !hasAdminRole && (
            <Link
              href="/profile"
              className="block leading-6 text-gray-600 hover:opacity-80"
            >
              {t("profile")}
            </Link>
          )}
          {isAuthenticated && (
            <button
              onClick={() => void signOut()}
              className="block leading-6 text-gray-600 hover:opacity-80"
            >
              {t("sign_out")}
            </button>
          )}
          {isUnauthenticated && (
            <>
              <button
                onClick={() => void signIn()}
                className="block leading-6 text-gray-600 hover:opacity-80"
              >
                {t("sign_up")}
              </button>
              <button
                onClick={() => void signIn()}
                className="block leading-6 text-gray-600 hover:opacity-80"
              >
                {t("sign_in")}
              </button>
            </>
          )}
        </nav>
        <p className="text-center text-xs leading-5 text-gray-500">
          &copy;{new Date().getFullYear()} sted. {t("all_rights_reserved")}
        </p>
      </div>
    </footer>
  );
};
