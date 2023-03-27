import { type Listing } from "@prisma/client";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { type SubmitHandler, useForm } from "react-hook-form";

export const ListingForm = ({
  listing,
  onSubmit,
}: {
  listing?: Listing | null;
  onSubmit: SubmitHandler<Listing>;
}) => {
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: listing ?? {},
  });

  const activityOptions = [
    {
      label: t("active"),
      value: "ACTIVE",
    },
    {
      label: t("inactive"),
      value: "INACTIVE",
    },
  ];

  const accessibilityOptions = [
    {
      label: t("private"),
      value: "PRIVATE",
    },
    {
      label: t("public"),
      value: "PUBLIC",
    },
  ];

  return (
    <form
      className="mx-auto max-w-3xl"
      onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t("listing_address")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {t("listing_address_information")}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="address"
                className={classNames(
                  "block text-sm font-medium leading-6",
                  errors?.address ? "text-red-400" : "text-gray-900"
                )}
              >
                {t("address")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="address"
                  className={classNames(
                    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                    errors?.address
                      ? "focus:ring-red-400"
                      : "focus:ring-gray-600"
                  )}
                  {...register("address", { required: true })}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="zipcode"
                className={classNames(
                  "block text-sm font-medium leading-6",
                  errors?.zipcode ? "text-red-400" : "text-gray-900"
                )}
              >
                {t("zip_code")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="zipcode"
                  className={classNames(
                    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                    errors?.zipcode
                      ? "focus:ring-red-400"
                      : "focus:ring-gray-600"
                  )}
                  {...register("zipcode", { required: true })}
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="city"
                className={classNames(
                  "block text-sm font-medium leading-6",
                  errors?.city ? "text-red-400" : "text-gray-900"
                )}
              >
                {t("city")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="city"
                  className={classNames(
                    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                    errors?.city ? "focus:ring-red-400" : "focus:ring-gray-600"
                  )}
                  {...register("city", { required: true })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t("pricing")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {t("pricing_information")}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="askingPrice"
                className={classNames(
                  "block text-sm font-medium leading-6",
                  errors?.askingPrice ? "text-red-400" : "text-gray-900"
                )}
              >
                {t("asking_price")}
              </label>
              <div className="mt-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">&euro;</span>
                  </div>
                  <input
                    type="number"
                    id="askingPrice"
                    className={classNames(
                      "block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                      errors?.askingPrice
                        ? "focus:ring-red-400"
                        : "focus:ring-gray-600"
                    )}
                    placeholder="0.00"
                    {...register("askingPrice")}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="reservePrice"
                className={classNames(
                  "block text-sm font-medium leading-6",
                  errors?.reservePrice ? "text-red-400" : "text-gray-900"
                )}
              >
                {t("reserve_price")}
              </label>
              <div className="mt-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">&euro;</span>
                  </div>
                  <input
                    type="number"
                    id="reservePrice"
                    className={classNames(
                      "block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                      errors?.reservePrice
                        ? "focus:ring-red-400"
                        : "focus:ring-gray-600"
                    )}
                    placeholder="0.00"
                    {...register("reservePrice")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t("dates")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {t("dates_information")}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="biddingStarts"
                className={classNames(
                  "block text-sm font-medium leading-6",
                  errors?.biddingStarts ? "text-red-400" : "text-gray-900"
                )}
              >
                {t("bidding_starts")}
              </label>
              <div className="mt-2">
                <input
                  type="datetime-local"
                  id="biddingStarts"
                  className={classNames(
                    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                    errors?.biddingStarts
                      ? "focus:ring-red-400"
                      : "focus:ring-gray-600"
                  )}
                  {...register("biddingStarts")}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="biddingEnds"
                className={classNames(
                  "block text-sm font-medium leading-6",
                  errors?.biddingEnds ? "text-red-400" : "text-gray-900"
                )}
              >
                {t("bidding_ends")}
              </label>
              <div className="mt-2">
                <input
                  type="datetime-local"
                  id="biddingEnds"
                  className={classNames(
                    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                    errors?.biddingEnds
                      ? "focus:ring-red-400"
                      : "focus:ring-gray-600"
                  )}
                  {...register("biddingEnds")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t("listing_image")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {t("listing_image_information")}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("image")}
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="mx-auto h-12 w-12 text-gray-300"
                  >
                    <circle cx="7.499" cy="9.5" r="1.5"></circle>
                    <path d="m10.499 14-1.5-2-3 4h12l-4.5-6z"></path>
                    <path d="M19.999 4h-16c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-16 14V6h16l.002 12H3.999z"></path>
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2 hover:text-gray-500"
                    >
                      <span>{t("upload_a_file")}</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">{t("or_drag_and_drop")}</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    {t("image_instructions")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t("listing_status")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {t("listing_status_information")}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="activity"
                className={classNames(
                  "block text-sm font-medium leading-6",
                  errors?.activity ? "text-red-400" : "text-gray-900"
                )}
              >
                {t("activity")}
              </label>
              <div className="mt-2">
                <select
                  id="activity"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-600 sm:text-sm sm:leading-6"
                  {...register("activity")}
                >
                  {activityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="accessibility"
                className={classNames(
                  "block text-sm font-medium leading-6",
                  errors?.accessibility ? "text-red-400" : "text-gray-900"
                )}
              >
                {t("accessibility")}
              </label>
              <div className="mt-2">
                <select
                  id="accessibility"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-600 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm sm:leading-6"
                  disabled
                  {...register("accessibility")}
                >
                  {accessibilityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900 hover:opacity-80"
        >
          {t("cancel")}
        </button>
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          {t("save")}
        </button>
      </div>
    </form>
  );
};
