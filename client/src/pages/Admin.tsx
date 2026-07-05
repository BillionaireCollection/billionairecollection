/* ============================================================
   BILLIONAIRE COLLECTION — Admin Dashboard
   Private admin-only page for viewing all form submissions.
   Accessible at /admin — requires Manus login + admin role.
   ============================================================ */

import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";

const GOLD = "#C9A84C";
const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_UI = "'Raleway', sans-serif";

const STATUS_COLORS: Record<string, string> = {
  pending: "#C9A84C",
  reviewing: "#60a5fa",
  approved: "#4ade80",
  rejected: "#f87171",
  in_progress: "#60a5fa",
  completed: "#4ade80",
  cancelled: "#f87171",
  new: "#C9A84C",
  read: "#94a3b8",
  replied: "#4ade80",
  archived: "#6b7280",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: "20px",
      fontSize: "0.7rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      background: `${STATUS_COLORS[status] ?? "#888"}22`,
      color: STATUS_COLORS[status] ?? "#888",
      border: `1px solid ${STATUS_COLORS[status] ?? "#888"}44`,
      fontFamily: FONT_UI,
    }}>
      {status.replace("_", " ")}
    </span>
  );
}

function StatCard({ label, value, sub, accent = false }: { label: string; value: number; sub?: string; accent?: boolean }) {
  return (
    <div style={{
      background: accent ? `${GOLD}18` : "rgba(255,255,255,0.03)",
      border: `1px solid ${accent ? GOLD : "rgba(255,255,255,0.08)"}`,
      borderRadius: "12px",
      padding: "1.5rem",
      minWidth: "160px",
      flex: "1 1 160px",
    }}>
      <div style={{ fontFamily: FONT_HEADING, fontSize: "2.2rem", color: accent ? GOLD : "#fff", fontWeight: 400 }}>
        {value.toLocaleString()}
      </div>
      <div style={{ fontFamily: FONT_UI, fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.25rem" }}>
        {label}
      </div>
      {sub && <div style={{ fontFamily: FONT_UI, fontSize: "0.75rem", color: GOLD, marginTop: "0.25rem" }}>{sub} pending</div>}
    </div>
  );
}

/** Inline notes editor — click pencil to open, auto-saves on blur or Enter */
function NotesCell({
  rowId,
  initialNotes,
  onSave,
  saving,
  saveError,
}: {
  rowId: number;
  initialNotes: string | null | undefined;
  onSave: (id: number, notes: string) => void;
  saving: boolean;
  saveError?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialNotes ?? "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Keep draft in sync when server data refreshes
  useEffect(() => {
    if (!editing) setDraft(initialNotes ?? "");
  }, [initialNotes, editing]);

  useEffect(() => {
    if (editing) textareaRef.current?.focus();
  }, [editing]);

  const commit = () => {
    setEditing(false);
    if (draft !== (initialNotes ?? "")) {
      onSave(rowId, draft);
    }
  };

  if (editing) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "180px" }}>
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); commit(); }
            if (e.key === "Escape") { setEditing(false); setDraft(initialNotes ?? ""); }
          }}
          rows={3}
          placeholder="Add a note…"
          style={{
            background: "rgba(201,168,76,0.08)",
            border: `1px solid ${GOLD}66`,
            borderRadius: "6px",
            color: "#fff",
            padding: "6px 8px",
            fontSize: "0.78rem",
            fontFamily: FONT_UI,
            resize: "vertical",
            outline: "none",
            width: "100%",
          }}
        />
        <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", fontFamily: FONT_UI }}>
          Enter to save · Esc to cancel
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ display: "flex", alignItems: "flex-start", gap: "6px", cursor: "pointer", minWidth: "140px" }}
      onClick={() => setEditing(true)}
      title="Click to edit note"
    >
      <span style={{
        fontSize: "0.78rem",
        color: draft ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.2)",
        fontFamily: FONT_UI,
        flex: 1,
        lineHeight: "1.4",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}>
        {draft || "Add note…"}
      </span>
      <span
        title={saveError ? "Save failed — click to retry" : "Click to edit"}
        style={{
          fontSize: "0.7rem",
          color: saveError ? "#f87171" : saving ? GOLD : "rgba(255,255,255,0.2)",
          flexShrink: 0,
          marginTop: "1px",
          transition: "color 0.2s",
        }}
      >
        {saveError ? "! retry" : saving ? "saving…" : "✎"}
      </span>
    </div>
  );
}

type Tab = "cards" | "golden" | "concierge" | "contact" | "newsletter" | "users";

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("cards");

  // Track which row IDs are currently saving notes or have a save error
  const [savingNotes, setSavingNotes] = useState<Set<number>>(new Set());
  const [errorNotes, setErrorNotes] = useState<Set<number>>(new Set());

  const isAdmin = isAuthenticated && user?.role === "admin";

  // Data queries
  const stats = trpc.admin.stats.useQuery(undefined, { enabled: isAdmin });
  const cardApps = trpc.card.list.useQuery(undefined, { enabled: activeTab === "cards" && isAdmin });
  const goldenApps = trpc.goldenTicket.list.useQuery(undefined, { enabled: activeTab === "golden" && isAdmin });
  const conciergeReqs = trpc.concierge.list.useQuery(undefined, { enabled: activeTab === "concierge" && isAdmin });
  const contactEnqs = trpc.contact.list.useQuery(undefined, { enabled: activeTab === "contact" && isAdmin });
  const newsletterSubs = trpc.newsletter.list.useQuery(undefined, { enabled: activeTab === "newsletter" && isAdmin });
  const usersList = trpc.admin.listUsers.useQuery(undefined, { enabled: activeTab === "users" && isAdmin });

  // Status update mutations
  const updateCard = trpc.card.updateStatus.useMutation({ onSuccess: () => cardApps.refetch() });
  const updateGolden = trpc.goldenTicket.updateStatus.useMutation({ onSuccess: () => goldenApps.refetch() });
  const updateConcierge = trpc.conciergeAdmin.updateStatus.useMutation({ onSuccess: () => conciergeReqs.refetch() });
  const updateContact = trpc.contactAdmin.updateStatus.useMutation({ onSuccess: () => contactEnqs.refetch() });

  // Notes-only mutations (save notes without changing status)
  const updateCardNotes = trpc.card.updateStatus.useMutation({
    onMutate: ({ id }) => { setSavingNotes(prev => new Set(prev).add(id)); setErrorNotes(prev => { const s = new Set(prev); s.delete(id); return s; }); },
    onError: (_, { id }) => setErrorNotes(prev => new Set(prev).add(id)),
    onSettled: (_, __, { id }) => {
      setSavingNotes(prev => { const s = new Set(prev); s.delete(id); return s; });
      cardApps.refetch();
    },
  });
  const updateGoldenNotes = trpc.goldenTicket.updateStatus.useMutation({
    onMutate: ({ id }) => { setSavingNotes(prev => new Set(prev).add(id)); setErrorNotes(prev => { const s = new Set(prev); s.delete(id); return s; }); },
    onError: (_, { id }) => setErrorNotes(prev => new Set(prev).add(id)),
    onSettled: (_, __, { id }) => {
      setSavingNotes(prev => { const s = new Set(prev); s.delete(id); return s; });
      goldenApps.refetch();
    },
  });
  const updateConciergeNotes = trpc.conciergeAdmin.updateStatus.useMutation({
    onMutate: ({ id }) => { setSavingNotes(prev => new Set(prev).add(id)); setErrorNotes(prev => { const s = new Set(prev); s.delete(id); return s; }); },
    onError: (_, { id }) => setErrorNotes(prev => new Set(prev).add(id)),
    onSettled: (_, __, { id }) => {
      setSavingNotes(prev => { const s = new Set(prev); s.delete(id); return s; });
      conciergeReqs.refetch();
    },
  });
  const updateContactNotes = trpc.contactAdmin.updateNotes.useMutation({
    onMutate: ({ id }) => { setSavingNotes(prev => new Set(prev).add(id)); setErrorNotes(prev => { const s = new Set(prev); s.delete(id); return s; }); },
    onError: (_, { id }) => setErrorNotes(prev => new Set(prev).add(id)),
    onSettled: (_, __, { id }) => {
      setSavingNotes(prev => { const s = new Set(prev); s.delete(id); return s; });
      contactEnqs.refetch();
    },
  });

  // Auth guard
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: GOLD, fontFamily: FONT_UI, letterSpacing: "0.2em", fontSize: "0.875rem" }}>LOADING…</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ fontFamily: FONT_HEADING, fontSize: "2rem", color: "#fff" }}>Admin Access</div>
        <div style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>You must be signed in to access this page.</div>
        <a href={getLoginUrl()} style={{ padding: "0.75rem 2rem", background: GOLD, color: "#000", fontFamily: FONT_UI, fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", borderRadius: "4px", fontSize: "0.85rem", textTransform: "uppercase" }}>
          Sign In
        </a>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <div style={{ fontFamily: FONT_HEADING, fontSize: "2rem", color: "#fff" }}>Access Denied</div>
        <div style={{ fontFamily: FONT_UI, color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>You do not have admin privileges.</div>
        <Link href="/" style={{ color: GOLD, fontFamily: FONT_UI, fontSize: "0.85rem" }}>← Return Home</Link>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "cards", label: "Card Applications", count: stats.data?.totalCardApplications },
    { id: "golden", label: "Golden Ticket", count: stats.data?.totalGoldenTickets },
    { id: "concierge", label: "Concierge", count: stats.data?.totalConciergeRequests },
    { id: "contact", label: "Contact", count: stats.data?.totalContactEnquiries },
    { id: "newsletter", label: "Newsletter", count: stats.data?.totalNewsletterSubscribers },
    { id: "users", label: "Users" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#000", fontFamily: FONT_UI }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(201,168,76,0.2)", padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: FONT_HEADING, fontSize: "1.5rem", color: "#fff", fontWeight: 400 }}>
            <span style={{ color: "#fff" }}>BILLIONAIRE</span>{" "}
            <span style={{ color: GOLD }}>ADMIN</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "2px" }}>
            Submissions Dashboard
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
            Signed in as <span style={{ color: GOLD }}>{user.name ?? user.email ?? "Admin"}</span>
          </span>
          <Link href="/" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>← Back to Site</Link>
        </div>
      </div>

      <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Stats Row */}
        {stats.data && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
            <StatCard label="Card Applications" value={stats.data.totalCardApplications} sub={String(stats.data.pendingCardApplications)} accent />
            <StatCard label="Golden Tickets" value={stats.data.totalGoldenTickets} sub={String(stats.data.pendingGoldenTickets)} accent />
            <StatCard label="Concierge Requests" value={stats.data.totalConciergeRequests} sub={String(stats.data.pendingConciergeRequests)} />
            <StatCard label="Contact Enquiries" value={stats.data.totalContactEnquiries} sub={String(stats.data.newContactEnquiries)} />
            <StatCard label="Newsletter Subscribers" value={stats.data.totalNewsletterSubscribers} />
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "2rem", overflowX: "auto" }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "0.75rem 1.5rem",
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.id ? `2px solid ${GOLD}` : "2px solid transparent",
                color: activeTab === tab.id ? GOLD : "rgba(255,255,255,0.4)",
                fontFamily: FONT_UI,
                fontSize: "0.8rem",
                fontWeight: activeTab === tab.id ? 600 : 400,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer",
                whiteSpace: "nowrap",
                marginBottom: "-1px",
              }}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span style={{ marginLeft: "8px", background: activeTab === tab.id ? GOLD : "rgba(255,255,255,0.1)", color: activeTab === tab.id ? "#000" : "rgba(255,255,255,0.5)", borderRadius: "10px", padding: "1px 7px", fontSize: "0.7rem" }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Card Applications Table */}
        {activeTab === "cards" && (
          <SubmissionsTable
            loading={cardApps.isLoading}
            data={cardApps.data ?? []}
            columns={["Name", "Email", "Phone", "Country", "Occupation", "Net Worth", "Tier", "Referral", "Status", "Notes", "Date", "Actions"]}
            csvFilename="card-applications.csv"
            csvFields={CARD_CSV_FIELDS}
            renderRow={(row: any) => (
              <tr key={row.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <Td>{row.firstName} {row.lastName}</Td>
                <Td>{row.email}</Td>
                <Td>{row.phone ?? "—"}</Td>
                <Td>{row.country ?? "—"}</Td>
                <Td>{row.occupation ?? "—"}</Td>
                <Td>{row.netWorth ?? "—"}</Td>
                <Td><StatusBadge status={row.cardTier} /></Td>
                <Td>{row.referralCode ?? "—"}</Td>
                <Td><StatusBadge status={row.status} /></Td>
                <Td style={{ minWidth: "160px", maxWidth: "240px" }}>
                  <NotesCell
                    rowId={row.id}
                    initialNotes={row.notes}
                    saving={savingNotes.has(row.id)}
                    saveError={errorNotes.has(row.id)}
                    onSave={(id, notes) => updateCardNotes.mutate({ id, status: row.status, notes })}
                  />
                </Td>
                <Td>{formatDate(row.createdAt)}</Td>
                <Td>
                  <StatusSelect
                    current={row.status}
                    options={["pending", "reviewing", "approved", "rejected"]}
                    onChange={(s) => updateCard.mutate({ id: row.id, status: s as any })}
                  />
                </Td>
              </tr>
            )}
          />
        )}

        {/* Golden Ticket Table */}
        {activeTab === "golden" && (
          <SubmissionsTable
            loading={goldenApps.isLoading}
            data={goldenApps.data ?? []}
            columns={["Name", "Email", "Phone", "Country", "Referred By", "Message", "Status", "Notes", "Date", "Actions"]}
            csvFilename="golden-ticket-applications.csv"
            csvFields={GOLDEN_CSV_FIELDS}
            renderRow={(row: any) => (
              <tr key={row.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <Td>{row.name}</Td>
                <Td>{row.email}</Td>
                <Td>{row.phone ?? "—"}</Td>
                <Td>{row.country ?? "—"}</Td>
                <Td>{row.referredBy ?? "—"}</Td>
                <Td style={{ maxWidth: "200px" }}><TruncatedText text={row.message ?? "—"} /></Td>
                <Td><StatusBadge status={row.status} /></Td>
                <Td style={{ minWidth: "160px", maxWidth: "240px" }}>
                  <NotesCell
                    rowId={row.id}
                    initialNotes={row.notes}
                    saving={savingNotes.has(row.id)}
                    saveError={errorNotes.has(row.id)}
                    onSave={(id, notes) => updateGoldenNotes.mutate({ id, status: row.status, notes })}
                  />
                </Td>
                <Td>{formatDate(row.createdAt)}</Td>
                <Td>
                  <StatusSelect
                    current={row.status}
                    options={["pending", "reviewing", "approved", "rejected"]}
                    onChange={(s) => updateGolden.mutate({ id: row.id, status: s as any })}
                  />
                </Td>
              </tr>
            )}
          />
        )}

        {/* Concierge Table */}
        {activeTab === "concierge" && (
          <SubmissionsTable
            loading={conciergeReqs.isLoading}
            data={conciergeReqs.data ?? []}
            columns={["Name", "Email", "Phone", "Request Type", "Budget", "Preferred Date", "Description", "Status", "Notes", "Date", "Actions"]}
            csvFilename="concierge-requests.csv"
            csvFields={CONCIERGE_CSV_FIELDS}
            renderRow={(row: any) => (
              <tr key={row.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <Td>{row.name}</Td>
                <Td>{row.email}</Td>
                <Td>{row.phone ?? "—"}</Td>
                <Td>{row.requestType}</Td>
                <Td>{row.budget ?? "—"}</Td>
                <Td>{row.preferredDate ?? "—"}</Td>
                <Td style={{ maxWidth: "200px" }}><TruncatedText text={row.description} /></Td>
                <Td><StatusBadge status={row.status} /></Td>
                <Td style={{ minWidth: "160px", maxWidth: "240px" }}>
                  <NotesCell
                    rowId={row.id}
                    initialNotes={row.notes}
                    saving={savingNotes.has(row.id)}
                    saveError={errorNotes.has(row.id)}
                    onSave={(id, notes) => updateConciergeNotes.mutate({ id, status: row.status, notes })}
                  />
                </Td>
                <Td>{formatDate(row.createdAt)}</Td>
                <Td>
                  <StatusSelect
                    current={row.status}
                    options={["pending", "in_progress", "completed", "cancelled"]}
                    onChange={(s) => updateConcierge.mutate({ id: row.id, status: s as any })}
                  />
                </Td>
              </tr>
            )}
          />
        )}

        {/* Contact Table */}
        {activeTab === "contact" && (
          <SubmissionsTable
            loading={contactEnqs.isLoading}
            data={contactEnqs.data ?? []}
            columns={["Name", "Email", "Phone", "Subject", "Division", "Message", "Status", "Notes", "Date", "Actions"]}
            csvFilename="contact-enquiries.csv"
            csvFields={CONTACT_CSV_FIELDS}
            renderRow={(row: any) => (
              <tr key={row.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <Td>{row.name}</Td>
                <Td>{row.email}</Td>
                <Td>{row.phone ?? "—"}</Td>
                <Td>{row.subject}</Td>
                <Td>{row.division ?? "—"}</Td>
                <Td style={{ maxWidth: "200px" }}><TruncatedText text={row.message} /></Td>
                <Td><StatusBadge status={row.status} /></Td>
                <Td style={{ minWidth: "160px", maxWidth: "240px" }}>
                  <NotesCell
                    rowId={row.id}
                    initialNotes={row.notes}
                    saving={savingNotes.has(row.id)}
                    saveError={errorNotes.has(row.id)}
                    onSave={(id, notes) => updateContactNotes.mutate({ id, notes })}
                  />
                </Td>
                <Td>{formatDate(row.createdAt)}</Td>
                <Td>
                  <StatusSelect
                    current={row.status}
                    options={["new", "read", "replied", "archived"]}
                    onChange={(s) => updateContact.mutate({ id: row.id, status: s as any })}
                  />
                </Td>
              </tr>
            )}
          />
        )}

        {/* Users Table */}
        {activeTab === "users" && (
          <SubmissionsTable
            loading={usersList.isLoading}
            data={usersList.data ?? []}
            columns={["Name", "Email", "Role", "Joined", "Last Sign-in"]}
            csvFilename="users.csv"
            csvFields={USERS_CSV_FIELDS}
            renderRow={(row: any) => (
              <tr key={row.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <Td>{row.name ?? "—"}</Td>
                <Td>{row.email ?? "—"}</Td>
                <Td><StatusBadge status={row.role} /></Td>
                <Td>{formatDate(row.createdAt)}</Td>
                <Td>{formatDate(row.lastSignedIn)}</Td>
              </tr>
            )}
          />
        )}

        {/* Newsletter Table */}
        {activeTab === "newsletter" && (
          <SubmissionsTable
            loading={newsletterSubs.isLoading}
            data={newsletterSubs.data ?? []}
            columns={["Email", "Name", "Source", "Active", "Date"]}
            csvFilename="newsletter-subscribers.csv"
            csvFields={NEWSLETTER_CSV_FIELDS}
            renderRow={(row: any) => (
              <tr key={row.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <Td>{row.email}</Td>
                <Td>{row.name ?? "—"}</Td>
                <Td>{row.source ?? "website"}</Td>
                <Td><StatusBadge status={row.isActive ? "approved" : "cancelled"} /></Td>
                <Td>{formatDate(row.createdAt)}</Td>
              </tr>
            )}
          />
        )}
      </div>
    </div>
  );
}

// ─── Helper Components ────────────────────────────────────────────────────────

function Td({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <td style={{
      padding: "0.75rem 1rem",
      fontSize: "0.8rem",
      color: "rgba(255,255,255,0.75)",
      verticalAlign: "middle",
      fontFamily: "'Raleway', sans-serif",
      ...style,
    }}>
      {children}
    </td>
  );
}

function TruncatedText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  if (!text || text === "—") return <span>—</span>;
  if (text.length <= 60 || expanded) {
    return (
      <span>
        {text}
        {text.length > 60 && (
          <button onClick={() => setExpanded(false)} style={{ marginLeft: "6px", background: "none", border: "none", color: "#C9A84C", cursor: "pointer", fontSize: "0.7rem" }}>less</button>
        )}
      </span>
    );
  }
  return (
    <span>
      {text.slice(0, 60)}…
      <button onClick={() => setExpanded(true)} style={{ marginLeft: "6px", background: "none", border: "none", color: "#C9A84C", cursor: "pointer", fontSize: "0.7rem" }}>more</button>
    </span>
  );
}

function StatusSelect({ current, options, onChange }: { current: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "6px",
        color: "#fff",
        padding: "4px 8px",
        fontSize: "0.75rem",
        fontFamily: "'Raleway', sans-serif",
        cursor: "pointer",
      }}
    >
      {options.map(o => (
        <option key={o} value={o} style={{ background: "#111" }}>{o.replace("_", " ")}</option>
      ))}
    </select>
  );
}

// ─── CSV Export Utility ──────────────────────────────────────────────────────

function downloadCSV(filename: string, rows: any[], fields: { key: string; label: string }[]) {
  if (!rows.length) return;
  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v).replace(/\r?\n/g, " ");
    return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = fields.map(f => escape(f.label)).join(",");
  const body = rows.map(row =>
    fields.map(f => escape(row[f.key])).join(",")
  ).join("\n");
  const blob = new Blob([`${header}\n${body}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── CSV field maps per submission type ──────────────────────────────────────

const CARD_CSV_FIELDS = [
  { key: "id", label: "ID" },
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "country", label: "Country" },
  { key: "occupation", label: "Occupation" },
  { key: "netWorth", label: "Net Worth" },
  { key: "cardTier", label: "Card Tier" },
  { key: "referralCode", label: "Referral Code" },
  { key: "status", label: "Status" },
  { key: "notes", label: "Notes" },
  { key: "createdAt", label: "Date" },
];

const GOLDEN_CSV_FIELDS = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "country", label: "Country" },
  { key: "referredBy", label: "Referred By" },
  { key: "message", label: "Message" },
  { key: "status", label: "Status" },
  { key: "notes", label: "Notes" },
  { key: "createdAt", label: "Date" },
];

const CONCIERGE_CSV_FIELDS = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "requestType", label: "Request Type" },
  { key: "budget", label: "Budget" },
  { key: "preferredDate", label: "Preferred Date" },
  { key: "description", label: "Description" },
  { key: "status", label: "Status" },
  { key: "notes", label: "Notes" },
  { key: "createdAt", label: "Date" },
];

const CONTACT_CSV_FIELDS = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "subject", label: "Subject" },
  { key: "division", label: "Division" },
  { key: "message", label: "Message" },
  { key: "status", label: "Status" },
  { key: "notes", label: "Notes" },
  { key: "createdAt", label: "Date" },
];

const USERS_CSV_FIELDS = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "createdAt", label: "Joined" },
  { key: "lastSignedIn", label: "Last Sign-in" },
];

const NEWSLETTER_CSV_FIELDS = [
  { key: "id", label: "ID" },
  { key: "email", label: "Email" },
  { key: "name", label: "Name" },
  { key: "source", label: "Source" },
  { key: "isActive", label: "Active" },
  { key: "createdAt", label: "Date" },
];

function SubmissionsTable({
  loading,
  data,
  columns,
  renderRow,
  csvFilename,
  csvFields,
}: {
  loading: boolean;
  data: any[];
  columns: string[];
  renderRow: (row: any) => React.ReactNode;
  csvFilename: string;
  csvFields: { key: string; label: string }[];
}) {
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.3)", fontFamily: "'Raleway', sans-serif", fontSize: "0.85rem", letterSpacing: "0.15em" }}>
        LOADING…
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "rgba(255,255,255,0.2)", fontFamily: "'Raleway', sans-serif", fontSize: "0.85rem" }}>
        No submissions yet.
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
        <thead>
          <tr style={{ background: "rgba(201,168,76,0.06)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
            {columns.map(col => (
              <th key={col} style={{
                padding: "0.75rem 1rem",
                textAlign: "left",
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: col === "Notes" ? GOLD : "rgba(201,168,76,0.7)",
                fontFamily: "'Raleway', sans-serif",
                whiteSpace: "nowrap",
              }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(renderRow)}
        </tbody>
      </table>
      <div style={{ padding: "0.75rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", fontFamily: "'Raleway', sans-serif" }}>
          {data.length} record{data.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={() => downloadCSV(csvFilename, data, csvFields)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 14px",
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.35)",
            borderRadius: "6px",
            color: "#C9A84C",
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.15s, border-color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.2)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(201,168,76,0.1)")}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download CSV
        </button>
      </div>
    </div>
  );
}

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  try {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}
