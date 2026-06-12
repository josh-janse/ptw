import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { emailTheme } from "./theme";

export interface WelcomeEmailProps {
  firstName: string;
  // The link an apprentice follows to begin their Rule of Life.
  startUrl: string;
}

export function WelcomeEmail({ firstName, startUrl }: WelcomeEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Preview>Welcome to Practicing the Way</Preview>
      <Tailwind config={emailTheme}>
        <Body className="m-0 bg-background px-4 font-sans">
          <Container className="mx-auto my-10 max-w-[520px] rounded-xl bg-card p-10">
            <Heading className="m-0 font-semibold text-2xl text-foreground">
              Welcome, {firstName}
            </Heading>
            <Text className="mt-4 text-base text-muted-foreground leading-7">
              We're glad you're here. Practicing the Way is a pathway for
              apprenticeship to Jesus, lived out in everyday rhythms. Your first
              step is to shape a Rule of Life.
            </Text>
            <Section className="mt-8">
              <Button
                className="rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm"
                href={startUrl}
              >
                Begin your Rule of Life
              </Button>
            </Section>
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

export default WelcomeEmail;
