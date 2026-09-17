const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";

const checks = [
  {
    path: "/",
    body: [
      "<title>Billionaire Collection | Luxury Services for Billionaires &amp; UHNW Individuals</title>",
      'rel="canonical" href="https://billionairecollection.com"',
      'id="route-structured-data"',
      "Billionaire Collection: Luxury Services for Billionaires and UHNW Individuals",
    ],
  },
  {
    path: "/air",
    body: [
      "<title>Billionaire Air | Private Aviation &amp; Jet Charter | Billionaire Collection</title>",
      'rel="canonical" href="https://billionairecollection.com/air"',
      'property="og:url" content="https://billionairecollection.com/air"',
      'id="route-structured-data"',
    ],
  },
  {
    path: "/founder",
    body: [
      "<title>Lawrence Colbert | Founder &amp; Owner of Billionaire Collection and Billionaire Magazine</title>",
      'property="og:type" content="profile"',
      'name="twitter:creator" content="@CeoLawrence"',
      'rel="canonical" href="https://billionairecollection.com/founder"',
    ],
  },
  {
    path: "/admin",
    headers: ["x-robots-tag: noindex, nofollow, noarchive"],
    body: ['name="robots" content="noindex, nofollow, noarchive"'],
  },
  {
    path: "/sitemap.xml",
    body: [
      "https://billionairecollection.com/media-kit",
      "https://billionairecollection.com/university",
      "https://billionairecollection.com/founder",
    ],
    absent: ["https://billionairecollection.com/store"],
  },
  {
    path: "/robots.txt",
    body: ["Sitemap: https://billionairecollection.com/sitemap.xml"],
  },
];

let failed = false;
for (const check of checks) {
  const response = await fetch(`${baseUrl}${check.path}`, { redirect: "manual" });
  const body = await response.text();
  const headers = [...response.headers]
    .map(([name, value]) => `${name.toLowerCase()}: ${value}`)
    .join("\n");
  const missing = [
    ...(check.headers || []).filter(value => !headers.includes(value)),
    ...(check.body || []).filter(value => !body.includes(value)),
  ];
  const presentWhenAbsent = (check.absent || []).filter(value => body.includes(value));
  const statusOk = response.status === 200;

  if (!statusOk || missing.length || presentWhenAbsent.length) {
    failed = true;
    console.error(JSON.stringify({
      path: check.path,
      status: response.status,
      missing,
      presentWhenAbsent,
    }));
  } else {
    console.log(`PASS ${check.path} (${response.status})`);
  }
}

if (failed) process.exit(1);
console.log("SEO release verification passed.");
