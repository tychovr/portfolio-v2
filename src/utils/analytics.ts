import ReactGA from "react-ga4";

const measurementId = "G-VEHSKC1FHR";

export function initAnalytics() {
  ReactGA.initialize(measurementId);
  ReactGA.gtag("consent", "default", { analytics_storage: "granted" });
  ReactGA.send({ hitType: "pageView", page: "/" });
}

type EventParams = Record<string, string | number | boolean | undefined>;
export const track = (name: string, params?: EventParams) =>
  ReactGA.event(name, params);
