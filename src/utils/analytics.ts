import ReactGA from "react-ga4";

const measurementId = "G-VEHSKC1FHR";

export function initAnalytics() {
  console.log(measurementId);
  ReactGA.initialize(measurementId);
  ReactGA.send({ hitType: "pageView", page: "/" });
}

export const track = (
  name: string,
  params?: Record<string, string | number | boolean>
) => ReactGA.event(name, params);
