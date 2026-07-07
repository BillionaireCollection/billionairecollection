/* ============================================================
   BILLIONAIRE COLLECTION — useJsonLd
   Injects one or more page-level JSON-LD <script> tags into
   <head>. Accepts a single schema object or an array of schemas
   (e.g. [BreadcrumbList, Service]) for richer structured data.
   Removes previous scripts on unmount / re-render to prevent
   duplicate structured data.
   ============================================================ */

import { useEffect } from "react";

type Schema = Record<string, unknown>;

const SCRIPT_ID_PREFIX = "bc-page-jsonld";

export function useJsonLd(schema: Schema | Schema[] | null) {
  useEffect(() => {
    // Remove any existing page-level JSON-LD scripts
    document.querySelectorAll(`[id^="${SCRIPT_ID_PREFIX}"]`).forEach((el) => el.remove());

    if (!schema) return;

    const schemas = Array.isArray(schema) ? schema : [schema];

    schemas.forEach((s, i) => {
      const script = document.createElement("script");
      script.id = `${SCRIPT_ID_PREFIX}-${i}`;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll(`[id^="${SCRIPT_ID_PREFIX}"]`).forEach((el) => el.remove());
    };
  }, [JSON.stringify(schema)]); // eslint-disable-line react-hooks/exhaustive-deps
}
