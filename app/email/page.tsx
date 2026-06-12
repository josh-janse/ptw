import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { emailTemplates } from "@/emails/registry";

export const metadata = {
  title: "Email templates",
  description: "Preview the Resend email templates stored in this repo.",
};

export default function EmailIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl p-8">
        <Link
          className="inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
          href="/menu"
        >
          <ArrowLeft className="size-4" />
          Menu
        </Link>
        <h1 className="mt-8 font-semibold text-2xl text-foreground tracking-tight">
          Email templates
        </h1>
        <p className="mt-2 text-muted-foreground">
          Preview the Resend email templates stored in this repo. Pick one to
          see it rendered, or open <code>/email/&lt;id&gt;</code> directly.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {emailTemplates.map((template) => (
            <Link
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
              href={`/email/${template.id}`}
              key={template.id}
            >
              <h2 className="font-medium text-foreground">{template.name}</h2>
              <p className="mt-1 text-muted-foreground text-sm">
                {template.description}
              </p>
              <p className="mt-4 font-mono text-muted-foreground text-xs">
                {template.id}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
