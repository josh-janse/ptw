"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatEmptyStateProps {
  className?: string;
  greeting: string;
  greetingDescription: string;
  onSend: (text: string) => void;
  suggestedQuestions: string[];
}

export function ChatEmptyState({
  className,
  greeting,
  greetingDescription,
  suggestedQuestions,
  onSend,
}: ChatEmptyStateProps) {
  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex flex-1 flex-col justify-center gap-3 px-6 py-8">
        <div className="fade-in slide-in-from-bottom-1 animate-in space-y-1 fill-mode-both duration-200">
          <h2 className="font-heading font-semibold text-2xl leading-snug">
            {greeting}
          </h2>
          <p className="text-muted-foreground text-xl leading-snug">
            {greetingDescription}
          </p>
        </div>
      </div>
      <div className="fade-in slide-in-from-bottom-1 flex animate-in flex-col gap-2 fill-mode-both px-4 pb-3 delay-75 duration-200">
        {suggestedQuestions.map((question) => (
          <Button
            className="h-auto justify-start whitespace-normal rounded-[var(--radius)] border bg-card px-4 py-3 text-left text-base hover:bg-muted hover:text-foreground"
            key={question}
            onClick={() => onSend(question)}
            variant="ghost"
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
}
