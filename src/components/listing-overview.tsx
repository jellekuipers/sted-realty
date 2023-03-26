/* eslint-disable @next/next/no-img-element */
import { type ListingActivity } from "@prisma/client";
import classNames from "classnames";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { api } from "~/utils/api";

export const ListingOverview = () => {
  const { data: listings } = api.listings.getAll.useQuery();

  const t = useTranslations();

  const listingStatus = (status: ListingActivity) => {
    switch (status) {
      case "ACTIVE":
        return "active";
      case "INACTIVE":
        return "inactive";
    }
  };

  return (
    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {listings?.map((listing) => (
        <article
          key={listing.id}
          className="flex flex-col items-start justify-between space-y-4"
        >
          <Link href={`/listings/${listing.slug}`} className="relative w-full">
            <img
              src={listing.image || "./placeholder.svg"}
              alt={`${listing.address} ${listing.zipcode}, ${listing.city}`}
              className={classNames(
                "aspect-[16/9] w-full rounded-2xl bg-gray-50 sm:aspect-[2/1] lg:aspect-[3/2]",
                listing.image ? "object-cover" : "object-contain"
              )}
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-100" />
          </Link>
          <Link
            href={`/listings/${listing.slug}`}
            className="w-full max-w-xl space-y-3"
          >
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
            <div className="group relative">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <span className="absolute inset-0" />
                {listing.address}
              </h3>
              <p className="text-sm leading-6 text-gray-600 line-clamp-3">
                {listing.zipcode} {listing.city}
              </p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};
