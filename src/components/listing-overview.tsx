/* eslint-disable @next/next/no-img-element */
import { type Listing, type ListingActivity } from "@prisma/client";
import classNames from "classnames";
import dayjs from "dayjs";
import { type User } from "next-auth";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Heading } from "./heading";
import { Skeleton } from "./skeleton";

export const ListingOverview = ({
  listings,
  loading,
  user,
}: {
  listings?: Listing[];
  loading: boolean;
  user?: User;
}) => {
  const t = useTranslations();

  const userIsAdmin = user?.role === "ADMIN";

  const userIsListingOwner = ({
    listingUserId,
    userId,
  }: {
    listingUserId: Listing["userId"];
    userId?: User["id"];
  }) => listingUserId === userId;

  const listingStatus = (status: ListingActivity) => {
    switch (status) {
      case "ACTIVE":
        return "active";
      case "INACTIVE":
        return "inactive";
    }
  };

  if (loading)
    return (
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );

  if (!listings?.length)
    return <Heading variant="h3">{t("no_listings")}</Heading>;

  return (
    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {listings?.map((listing) => (
        <article
          key={listing.id}
          className="flex flex-col items-start justify-between space-y-4"
        >
          <div className="relative w-full">
            <img
              src={listing.image || "./placeholder.svg"}
              alt={`${listing.address} ${listing.zipcode}, ${listing.city}`}
              className={classNames(
                "aspect-[16/9] w-full rounded bg-gray-50 sm:aspect-[2/1] lg:aspect-[3/2]",
                listing.image ? "object-cover" : "object-contain"
              )}
            />
            <div className="absolute inset-0 rounded ring-1 ring-inset ring-gray-100" />
            <div className="absolute right-4 top-4">
              {userIsAdmin ||
              userIsListingOwner({
                listingUserId: listing.userId,
                userId: user?.id,
              }) ? (
                <Link
                  href={`/listings/${listing.slug}/edit`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white hover:opacity-80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="currentColor"
                  >
                    <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path>
                  </svg>
                </Link>
              ) : (
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white hover:opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="currentColor"
                  >
                    <path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="w-full max-w-xl space-y-3">
            <div className="flex items-center gap-x-4 text-xs">
              {listing.biddingEnds ? (
                <time
                  dateTime={dayjs(listing.biddingEnds).format(
                    "DD-MM-YYYY HH:MM"
                  )}
                  className="text-gray-500"
                >
                  {dayjs(listing.biddingEnds).format("DD-MM-YYYY HH:MM")}
                </time>
              ) : (
                <span className="text-gray-500">
                  {t("not_yet_determinded")}
                </span>
              )}
              <span
                className={classNames(
                  listing.activity === "ACTIVE" && "bg-green-50 text-green-600",
                  listing.activity === "INACTIVE" && "bg-gray-50 text-gray-600",
                  "relative z-10 rounded-full py-1.5 px-3 font-medium"
                )}
              >
                {t(listingStatus(listing.activity))}
              </span>
            </div>
            <Link href={`/listings/${listing.slug}`} className="group relative">
              <Heading variant="h3" className="group-hover:opacity-80">
                <span className="absolute inset-0" />
                {listing.address}
              </Heading>
              <p className="text-sm leading-6 text-gray-600 line-clamp-3">
                {listing.zipcode} {listing.city}
              </p>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};
