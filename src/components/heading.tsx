type THeading = {
  children: React.ReactNode;
  variant: "h1" | "h2" | "h3";
};

export const Heading = ({ children, variant }: THeading) => {
  switch (variant) {
    case "h3":
      return (
        <h3 className="text-base font-bold tracking-tight text-gray-900 sm:text-lg lg:text-xl">
          {children}
        </h3>
      );
    case "h2":
      return (
        <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl lg:text-2xl">
          {children}
        </h2>
      );
    case "h1":
    default:
      return (
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          {children}
        </h1>
      );
  }
};
