import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { emailTheme } from "./theme";

export interface FirstStepEmailProps {
  // The onward link into the conversation, pre-seeded as the leader's own
  // message via ?q=. The secondary, quieter invitation.
  conversationUrl: string;
  firstName: string;
  // The leader training link the primary button follows (session one).
  sessionUrl: string;
}

// The first touchpoint a new group leader receives. It carries the comms voice
// (a letter, not a campaign), the system's best-guess next step (watch session
// one, confidence before inviting anyone), and one quiet link onward into the
// non-deterministic layer, the conversation.
export function FirstStepEmail({
  firstName,
  sessionUrl,
  conversationUrl,
}: FirstStepEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Preview>One short step before your group gathers.</Preview>
      <Tailwind config={emailTheme}>
        <Body className="m-0 bg-background px-4 font-sans">
          <Container className="mx-auto my-12 max-w-[520px]">
            <Img
              alt="A quiet, light-filled room"
              className="mb-8 w-full rounded-xl"
              height={293}
              src="/images/KenSet-2-email.jpg"
              width={520}
            />
            <Text className="mt-6 text-base text-foreground leading-7">
              Hi {firstName},
            </Text>
            <Text className="mt-4 text-base text-foreground leading-7">
              You've said yes to leading your group through the Practicing the
              Way Course. That is a meaningful, generous thing, and you don't
              need to have it all figured out to begin well.
            </Text>
            <Text className="mt-4 text-base text-foreground leading-7">
              There's one thing worth doing first. Not inviting anyone yet, not
              planning sessions. Watching session one of the leader training,
              about 6 minutes, helps the shape of what's ahead feel familiar.
            </Text>
            <Section className="mt-8">
              <Button
                className="rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm"
                href={sessionUrl}
              >
                Begin session one
              </Button>
            </Section>
            <Text className="mt-6 text-muted-foreground text-sm leading-6">
              Not sure where to start?{" "}
              <Link className="text-primary underline" href={conversationUrl}>
                Talk it through
              </Link>
            </Text>
            <Hr className="my-8 border-border" />
            <Text className="m-0 text-foreground text-sm leading-6">
              Peace to you as you start,
              <br />
              The Practicing the Way team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default FirstStepEmail;
