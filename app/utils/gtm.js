export const GTM_ID = "GTM-MZJ2CHKT";

export const pageview = (url) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
  }
};
