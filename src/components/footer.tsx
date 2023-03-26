import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations();

  const navigation = [
    { name: t("listings"), href: "#" },
    { name: t("sign_up"), href: "#" },
    { name: t("sign_in"), href: "#" },
  ];

  return (
    <footer className="bg-white">
      <div className="overflow-hidden py-20 px-6 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.map((item) => (
            <div key={item.name} className="pb-6">
              <a
                href={item.href}
                className="leading-6 text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy;{new Date().getFullYear()} sted. {t('all_rights_reserved')}
        </p>
      </div>
    </footer>
  );
};
