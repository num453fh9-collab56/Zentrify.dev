import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timestamp Converter - Unix Timestamp to Date & Time",
  description:
    "Convert Unix timestamps to human-readable dates and vice versa. Supports seconds, milliseconds, ISO 8601, UTC, and local time. Free online tool by Zentrify.",
  keywords: [
    "timestamp converter",
    "unix timestamp",
    "epoch converter",
    "date to timestamp",
    "timestamp to date",
    "unix time converter",
    "epoch time",
  ],
  openGraph: {
    title: "Timestamp Converter - Unix Timestamp to Date & Time",
    description:
      "Convert Unix timestamps to dates and back. Free online tool — no signup required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
