import type { ReactElement } from "react";
import { ReflectionPrompt } from "./reflection-prompt";
import { WelcomeEmail } from "./welcome-email";

export interface EmailTemplate {
  description: string;
  // Stable slug used in the URL: /email/<id>
  id: string;
  name: string;
  // Renders the template with representative demo data. Keeping props at the
  // call site means each template stays fully typed.
  render: () => ReactElement;
  // Default subject line, shown alongside the preview.
  subject: string;
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: "welcome",
    name: "Welcome",
    description: "Sent when a new apprentice joins.",
    subject: "Welcome to Practicing the Way",
    render: () => (
      <WelcomeEmail
        firstName="Sarah"
        startUrl="https://practicingtheway.org/start"
      />
    ),
  },
  {
    id: "reflection-prompt",
    name: "Reflection prompt",
    description: "A weekly reflection question for a practice.",
    subject: "Your reflection for this week",
    render: () => (
      <ReflectionPrompt
        firstName="Sarah"
        practice="Sabbath"
        prompt="Where did you sense rest this week, and where did you resist it? Notice without judging."
      />
    ),
  },
];

export function getEmailTemplate(id: string): EmailTemplate | undefined {
  return emailTemplates.find((template) => template.id === id);
}
