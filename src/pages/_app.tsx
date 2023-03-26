import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AbstractIntlMessages } from "next-intl";
import { NextIntlProvider } from "next-intl";

import { api } from "../utils/api";

import "../styles/globals.css";

const MyApp: AppType<{
  session: Session | null;
  messages: AbstractIntlMessages;
}> = ({ Component, pageProps: { session, messages, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <NextIntlProvider messages={messages}>
        <Component {...pageProps} />
      </NextIntlProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
