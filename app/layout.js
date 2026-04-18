import "./globals.css";

export const metadata = {
  title: "SR Leather — Handcrafted Luxury Leather Bags",
  description:
    "Discover the art of handcrafted leather. Premium full-grain leather bags, briefcases, wallets and accessories — meticulously crafted for those who demand excellence.",
  keywords:
    "leather bags, handcrafted, luxury, premium leather, briefcase, wallet, leather accessories, SR Leather",
  openGraph: {
    title: "SR Leather — Handcrafted Luxury Leather Bags",
    description:
      "Discover the art of handcrafted leather. Premium full-grain leather bags, briefcases, wallets and accessories.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Outfit:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
