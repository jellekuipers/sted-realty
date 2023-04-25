import Head from "next/head";
import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <div className="flex min-h-screen flex-col text-gray-900 antialiased">
      <Head>
        <title>{title || "sted"}</title>
        <meta name="description" content="sted" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex-1 space-y-8 p-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
};
