import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import { emailTheme } from "./theme";

export interface ReflectionPromptProps {
  firstName: string;
  // The practice this reflection belongs to (e.g. "Sabbath").
  practice: string;
  // The week's reflection question.
  prompt: string;
}

export function ReflectionPrompt({
  firstName,
  prompt,
  practice,
}: ReflectionPromptProps) {
  return (
    <Html lang="en">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Preview>Your {practice} reflection for this week</Preview>
      <Tailwind config={emailTheme}>
        <Body className="m-0 bg-background px-4 font-sans">
          <Container className="mx-auto my-10 max-w-[520px] rounded-xl bg-card p-10">
            <Text className="m-0 font-medium text-muted-foreground text-sm uppercase tracking-wide">
              {practice}
            </Text>
            <Heading className="mt-2 font-semibold text-foreground text-xl">
              A moment to reflect, {firstName}
            </Heading>
            <Text className="mt-4 text-base text-muted-foreground leading-7">
              {prompt}
            </Text>
            <Hr className="my-8 border-border" />
            <Text className="m-0 text-muted-foreground text-sm">
              Practicing the Way
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default ReflectionPrompt;
