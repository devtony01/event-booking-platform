export const siteConfig = {
  title: "Demo",
  description: "Demo Project",
  url: "https://demo-site.com",
};

export const isProd = process.env.NODE_ENV === "production";
export const isLocal = process.env.NODE_ENV === "development";

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === "true"
  ? true
  : false;
