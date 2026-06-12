import { render } from "@react-email/render";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { emailTemplates, getEmailTemplate } from "@/emails/registry";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return emailTemplates.map((template) => ({ id: template.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const template = getEmailTemplate(id);
  if (!template) {
    return { title: "Email template" };
  }
  return {
    title: `${template.name} email`,
    description: template.description,
  };
}

export default async function EmailPreviewPage({ params }: { params: Params }) {
  const { id } = await params;
  const template = getEmailTemplate(id);

  if (!template) {
    notFound();
  }

  const html = await render(template.render());

  return (
    <div className="flex h-screen flex-col bg-background">
      <Button
        asChild
        className="absolute top-4 left-1.5 text-muted-foreground"
        size="sm"
        variant="ghost"
      >
        <Link href="/email">
          <ArrowLeft />
          Back
        </Link>
      </Button>
      <header className="border-border border-b px-4">
        <div className="mx-auto w-full max-w-[520px] pt-16 pb-4">
          <h1 className="font-semibold text-foreground text-xl tracking-tight">
            {template.name}
          </h1>
          <p className="mt-1 text-muted-foreground text-sm">
            Subject: <span className="text-foreground">{template.subject}</span>
          </p>
        </div>
      </header>
      <iframe
        className="w-full flex-1 border-0"
        srcDoc={html}
        title={`${template.name} preview`}
      />
    </div>
  );
}
