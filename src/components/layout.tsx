import Head from "next/head";
import { Header } from "./header";

export const Layout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <>
      <Head>
        <title>{title || "sted"}</title>
        <meta name="description" content="sted" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
};
