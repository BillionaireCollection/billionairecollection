/* ============================================================
   BILLIONAIRE COLLECTION — useJsonLd
   Injects a page-level JSON-LD <script> tag into <head>.
   Removes the previous script on unmount / re-render to
   prevent duplicate structured data.
   ============================================================ */

import { useEffect } from "react";

const SCRIPT_ID = "bc-page-jsonld";

export function useJsonLd(schema: Record<string, unknown> | null) {
  useEffect(() => {
    // Remove any existing page-level JSON-LD
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) existing.remove();

    if (!schema) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(SCRIPT_ID);
      if (el) el.remove();
    };
  }, [JSON.stringify(schema)]); // eslint-disable-line react-hooks/exhaustive-deps
}
