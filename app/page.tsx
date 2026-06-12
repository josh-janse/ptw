import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedLogo } from "@/components/animated-logo";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-20 text-center text-foreground">
      <Link
        aria-label="Home"
        className="ptw-rise fixed top-4 left-4 z-50 rounded-md transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        href="/"
        style={{ animationDelay: "0ms" }}
      >
        <AnimatedLogo className="w-[167px]" />
      </Link>
      <div className="w-full max-w-xl">
        <p
          className="ptw-rise font-medium text-primary text-sm"
          style={{ animationDelay: "120ms" }}
        >
          A submission for Practicing the Way
        </p>
        <h1
          className="ptw-rise mt-4 font-normal text-4xl leading-tight sm:text-5xl"
          style={{ animationDelay: "240ms" }}
        >
          Hi Pathways team.
        </h1>
        <p
          className="ptw-rise mx-auto mt-5 max-w-prose text-lg text-muted-foreground leading-relaxed"
          style={{ animationDelay: "380ms" }}
        >
          Thank you for the room to think about this with you. Rather than hand
          you a document, I have built the thinking as something you can move
          through, at the same unhurried pace the design hopes to give a new
          leader.
        </p>
        <div
          className="ptw-rise mt-9 flex justify-center"
          style={{ animationDelay: "520ms" }}
        >
          <Button asChild size="lg">
            <Link href="/menu">
              Step inside
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
