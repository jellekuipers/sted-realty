/* eslint-disable @next/next/no-img-element */
import { type Listing, type ListingActivity } from "@prisma/client";
import classNames from "classnames";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Heading } from "./heading";
import { Skeleton } from "./skeleton";

export const ListingOverview = ({
  listings,
  loading,
}: {
  listings?: Listing[];
  loading: boolean;
}) => {
  const t = useTranslations();

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
