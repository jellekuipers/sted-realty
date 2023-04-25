import classNames from "classnames";

type THeading = {
  className?: string;
  children: React.ReactNode;
  variant: "h1" | "h2" | "h3";
};

export const Heading = ({ className, children, variant }: THeading) => {
  switch (variant) {
    case "h3":
      return (
        <h3
          className={classNames(
            "text-base font-bold tracking-tight text-gray-900 sm:text-lg lg:text-xl",
            className
          )}
        >
          {children}
        </h3>
      );
    case "h2":
      return (
        <h2
          className={classNames(
            "text-lg font-bold tracking-tight text-gray-900 sm:text-xl lg:text-2xl",
            className
          )}
        >
          {children}
        </h2>
      );
    case "h1":
    default:
      return (
        <h1
          className={classNames(
            "text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl",
            className
          )}
        >
          {children}
        </h1>
      );
  }
};
