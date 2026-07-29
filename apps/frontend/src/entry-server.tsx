import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "./App";

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <App router={(children) => <StaticRouter location={url}>{children}</StaticRouter>} />
    </HelmetProvider>
  );

  const { helmet } = helmetContext;
  const headTags = helmet
    ? `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}${helmet.script.toString()}`
    : "";

  return { html, headTags };
}
