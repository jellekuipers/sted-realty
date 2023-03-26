/* eslint-disable @next/next/no-img-element */
export const Skeleton = () => {
  return (
    <article className="flex flex-col items-start justify-between space-y-4">
      <div className="relative w-full animate-pulse">
        <img
          src="./placeholder.svg"
          alt=""
          className="aspect-[16/9] w-full rounded-2xl bg-gray-50 object-contain sm:aspect-[2/1] lg:aspect-[3/2]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-100" />
      </div>
      <div className="w-full max-w-xl space-y-3 animate-pulse">
        <div className="flex items-center gap-x-4">
          <span className="h-7 w-12 rounded-full bg-gray-50" />
          <span className="h-7 w-12 rounded-full bg-gray-50" />
        </div>
        <div className="h-12 w-full rounded-full bg-gray-50" />
      </div>
    </article>
  );
};
