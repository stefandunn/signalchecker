import { AllProviders } from "@/providers/AllProviders";
import "@/styles/_all.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppinsFont = Poppins({
  weight: ["100", "300", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans-serif",
});

export const metadata: Metadata = {
  title: "Signal Checker",
  description: "Check your speed against others in your area",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppinsFont.variable}>
      <body>
        <AllProviders>{children}</AllProviders>
      </body>
    </html>
  );
}
