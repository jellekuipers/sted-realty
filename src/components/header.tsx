import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const t = useTranslations();

  const hasAdminRole = session?.user.role === "ADMIN";
  const hasUserRole =
    session?.user.role === "BUYER" || session?.user.role === "SELLER";
  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";

  return (
    <header className="bg-white">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center lg:flex-1 lg:gap-x-12">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">sted</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="h-8 w-8"
              viewBox="0 0 24 24"
            >
              <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm9-8.586 6 6V15l.001 5H6v-9.586l6-6z"></path>
              <path d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18z"></path>
            </svg>
          </Link>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              href="/listings"
              className="font-semibold leading-6 text-gray-900"
            >
              {t("listings")}
            </Link>
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">{t("open_menu")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
            </svg>
          </button>
        </div>
        {isAuthenticated && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12">
            {hasAdminRole && (
              <Link
                href="/management"
                className="font-semibold leading-6 text-gray-900"
              >
                {t("management")}
              </Link>
            )}
            {hasUserRole && (
              <Link
                href="/profile"
                className="font-semibold leading-6 text-gray-900"
              >
                {t("profile")}
              </Link>
            )}
            <button
              onClick={() => void signOut()}
              className="font-semibold leading-6 text-gray-900"
            >
              {t("sign_out")}
            </button>
          </div>
        )}
        {isUnauthenticated && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12">
            <button
              onClick={() => void signIn()}
              className="font-semibold leading-6 text-gray-900"
            >
              {t("sign_up")}
            </button>
            <button
              onClick={() => void signIn()}
              className="font-semibold leading-6 text-gray-900"
            >
              {t("sign_in")}
            </button>
          </div>
        )}
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">sted</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="h-8 w-8"
                viewBox="0 0 24 24"
              >
                <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm9-8.586 6 6V15l.001 5H6v-9.586l6-6z"></path>
                <path d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18z"></path>
              </svg>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">{t("close_menu")}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
              >
                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/listings"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {t("listings")}
                </Link>
              </div>
              {isAuthenticated && (
                <div className="py-6">
                  {hasAdminRole && (
                    <Link
                      href="/management"
                      className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {t("management")}
                    </Link>
                  )}
                  {hasUserRole && (
                    <Link
                      href="/profile"
                      className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {t("profile")}
                    </Link>
                  )}
                  <button
                    onClick={() => void signOut()}
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {t("sign_out")}
                  </button>
                </div>
              )}
              {isUnauthenticated && (
                <div className="py-6">
                  <button
                    onClick={() => void signIn()}
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {t("sign_up")}
                  </button>
                  <button
                    onClick={() => void signIn()}
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {t("sign_in")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
