import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-20 text-center text-foreground">
      <div className="w-full max-w-xl">
        <p
          className="ptw-rise font-medium text-primary text-sm"
          style={{ animationDelay: "0ms" }}
        >
          A submission for Practicing the Way
        </p>
        <h1
          className="ptw-rise mt-4 font-normal text-4xl leading-tight sm:text-5xl"
          style={{ animationDelay: "120ms" }}
        >
          Hi Pathways team.
        </h1>
        <p
          className="ptw-rise mx-auto mt-5 max-w-prose text-lg text-muted-foreground leading-relaxed"
          style={{ animationDelay: "260ms" }}
        >
          Thank you for the room to think about this with you. Rather than hand
          you a document, I have built the thinking as something you can move
          through, at the same unhurried pace the design hopes to give a new
          leader.
        </p>
        <div
          className="ptw-rise mt-9 flex justify-center"
          style={{ animationDelay: "420ms" }}
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
