"use client";

import {
  ArrowRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { AskUserQuestion } from "@/lib/chat-tools";
import { cn } from "@/lib/utils";

interface AskUserInputProps {
  onSkip: () => void;
  onSubmit: (output: string) => void;
  questions: AskUserQuestion[];
}

const NO_PREFERENCE = "[No preference]";

// Hard line-break Markdown syntax (two trailing spaces + \n) keeps all Q/A
// pairs on adjacent lines with no blank gaps between them.
function formatAnswers(
  questions: AskUserQuestion[],
  answers: Record<number, string>
): string {
  return questions
    .map((q, i) => `Q: ${q.question}  \nA: ${answers[i] ?? NO_PREFERENCE}`)
    .join("  \n");
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: a multi-step question form with single/multi-select, "Other" free-text, and back/skip navigation has inherent branching that is clearer kept together than split across props-heavy subcomponents
export function AskUserInput({
  questions,
  onSubmit,
  onSkip,
}: AskUserInputProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Single source of truth for committed answers.
  const [collectedAnswers, setCollectedAnswers] = useState<
    Record<number, string>
  >({});
  // Transient working state for the current question — always rehydrated from
  // collectedAnswers on navigation and committed back before leaving.
  const [multiSelected, setMultiSelected] = useState<Set<number>>(new Set());
  const [isOtherOpen, setIsOtherOpen] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  // Drives the slide direction of the transition animation.
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const question = questions[currentIndex];
  if (!question) {
    return null;
  }

  const isLast = currentIndex === questions.length - 1;
  const isFirst = currentIndex === 0;
  const isMultiQuestion = questions.length > 1;

  const savedAnswer = collectedAnswers[currentIndex];

  // True when the saved answer for this question is a custom "Other" value.
  const isOtherSaved =
    savedAnswer !== undefined &&
    savedAnswer !== NO_PREFERENCE &&
    !question.options.includes(savedAnswer);

  const selectedCount =
    multiSelected.size + (isOtherOpen && otherValue.trim() ? 1 : 0);

  // ── State derivation ───────────────────────────────────────────────────────

  // Computes the committed-answer string from the current working state.
  // Returns undefined when nothing is selected (so we don't prematurely write
  // "[No preference]" — that only happens on an explicit Skip).
  function currentWorkingAnswer(): string | undefined {
    if (question?.type === "multi_select") {
      const selected = question.options.filter((_, i) => multiSelected.has(i));
      if (isOtherOpen && otherValue.trim()) {
        selected.push(otherValue.trim());
      }
      return selected.length > 0 ? selected.join(", ") : undefined;
    }
    if (isOtherOpen && otherValue.trim()) {
      return otherValue.trim();
    }
    return savedAnswer;
  }

  // Rehydrates the working state (checkboxes / Other input) for a question from
  // its committed answer. The single place that maps stored string → UI state.
  function hydrateWorkingState(
    index: number,
    answers: Record<number, string>
  ): void {
    const q = questions[index];
    const saved = answers[index];

    if (!(q && saved) || saved === NO_PREFERENCE) {
      setMultiSelected(new Set());
      setIsOtherOpen(false);
      setOtherValue("");
      return;
    }

    if (q.type === "multi_select") {
      const items = saved.split(", ");
      const itemSet = new Set(items);
      setMultiSelected(
        new Set(
          q.options
            .map((opt, i): number => (itemSet.has(opt) ? i : -1))
            .filter((i): i is number => i !== -1)
        )
      );
      const custom = items.find((item) => !q.options.includes(item));
      if (custom) {
        setIsOtherOpen(true);
        setOtherValue(custom);
      } else {
        setIsOtherOpen(false);
        setOtherValue("");
      }
      return;
    }

    // single_select
    setMultiSelected(new Set());
    if (q.options.includes(saved)) {
      setIsOtherOpen(false);
      setOtherValue("");
    } else {
      setIsOtherOpen(true);
      setOtherValue(saved);
    }
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  function goBack(): void {
    if (isFirst) {
      return;
    }
    setDirection("back");
    // Commit current working state so it survives the round-trip.
    const working = currentWorkingAnswer();
    const answers =
      working === undefined
        ? { ...collectedAnswers }
        : { ...collectedAnswers, [currentIndex]: working };
    setCollectedAnswers(answers);

    const prev = currentIndex - 1;
    setCurrentIndex(prev);
    hydrateWorkingState(prev, answers);
  }

  // Commits `answers` and either advances (rehydrating the next question) or
  // submits if we're on the last question.
  function advanceOrSubmit(answers: Record<number, string>): void {
    if (isLast) {
      onSubmit(formatAnswers(questions, answers));
      return;
    }
    setDirection("forward");
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    hydrateWorkingState(nextIndex, answers);
  }

  // ── Option handlers ────────────────────────────────────────────────────────

  function handleSingleSelect(option: string): void {
    setIsOtherOpen(false);
    setOtherValue("");
    const answers = { ...collectedAnswers, [currentIndex]: option };
    setCollectedAnswers(answers);
    // Last question in a multi-question flow: record but wait for Submit so the
    // user can review. Otherwise auto-advance.
    if (isMultiQuestion && isLast) {
      return;
    }
    advanceOrSubmit(answers);
  }

  // Confirms a single_select "Other" free-text answer.
  function handleOtherConfirmSingle(): void {
    const trimmed = otherValue.trim();
    if (!trimmed) {
      return;
    }
    const answers = { ...collectedAnswers, [currentIndex]: trimmed };
    setCollectedAnswers(answers);
    if (isMultiQuestion && isLast) {
      return;
    }
    advanceOrSubmit(answers);
  }

  // Footer Next/Submit and header > — commits the current working selection
  // (keeping whatever is chosen) and advances.
  function handleNext(): void {
    const working = currentWorkingAnswer();
    const answers = {
      ...collectedAnswers,
      [currentIndex]: working ?? NO_PREFERENCE,
    };
    setCollectedAnswers(answers);
    advanceOrSubmit(answers);
  }

  // Footer Skip — user explicitly opts out; always records [No preference],
  // overwriting any draft selection.
  function handleFooterSkip(): void {
    const answers = { ...collectedAnswers, [currentIndex]: NO_PREFERENCE };
    setCollectedAnswers(answers);
    advanceOrSubmit(answers);
  }

  const showFooter = isMultiQuestion || question.type === "multi_select";

  // Footer hint for multi_select questions; single_select shows nothing.
  let footerHint = "";
  if (question.type === "multi_select") {
    footerHint =
      selectedCount > 0 ? `${selectedCount} selected` : "Select all that apply";
  }

  // Slide direction for the per-question entrance animation.
  const slideClass =
    direction === "forward" ? "slide-in-from-right-4" : "slide-in-from-left-4";

  return (
    <div className="rounded-[calc(var(--radius)+0.5rem)] border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3">
        <p
          className={cn(
            "fade-in flex-1 animate-in font-medium text-sm leading-snug duration-200",
            slideClass
          )}
          key={`q-${currentIndex}`}
        >
          {question.question}
        </p>
        <div className="flex shrink-0 items-center gap-0.5">
          {isMultiQuestion && (
            <>
              <button
                aria-label="Previous question"
                className={cn(
                  "flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isFirst && "invisible"
                )}
                disabled={isFirst}
                onClick={goBack}
                type="button"
              >
                <ChevronLeftIcon className="size-3.5" />
              </button>
              <span className="min-w-[2.5rem] text-center text-muted-foreground text-xs tabular-nums">
                {currentIndex + 1} of {questions.length}
              </span>
              <button
                aria-label="Skip to next question"
                className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={handleNext}
                type="button"
              >
                <ChevronRightIcon className="size-3.5" />
              </button>
            </>
          )}
          <button
            aria-label="Skip all questions"
            className={cn(
              "flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              isMultiQuestion && "ml-1"
            )}
            onClick={onSkip}
            type="button"
          >
            <XIcon className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Options */}
      <div
        className={cn("fade-in animate-in px-2 pb-2 duration-200", slideClass)}
        key={`opts-${currentIndex}`}
      >
        {/* ── single_select ── */}
        {question.type === "single_select" && (
          <>
            {question.options.map((option, i) => {
              const isSelected = savedAnswer === option;
              return (
                <button
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors hover:bg-muted",
                    isSelected && "bg-muted"
                  )}
                  key={option}
                  onClick={() => handleSingleSelect(option)}
                  type="button"
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-md text-xs tabular-nums",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-background"
                    )}
                  >
                    {isSelected ? <CheckIcon className="size-3" /> : i + 1}
                  </span>
                  <span className="flex-1">{option}</span>
                  <ArrowRightIcon
                    className={cn(
                      "size-3.5 shrink-0 text-muted-foreground transition-opacity",
                      isSelected
                        ? "opacity-70"
                        : "opacity-0 group-hover:opacity-70"
                    )}
                  />
                </button>
              );
            })}

            {/* "Other" row */}
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm",
                (isOtherOpen || isOtherSaved) && "bg-muted"
              )}
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-md text-xs tabular-nums",
                  isOtherSaved
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isOtherSaved ? (
                  <CheckIcon className="size-3" />
                ) : (
                  question.options.length + 1
                )}
              </span>

              {isOtherOpen ? (
                <input
                  autoFocus
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  onChange={(e) => setOtherValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleOtherConfirmSingle();
                    }
                    if (e.key === "Escape") {
                      setIsOtherOpen(false);
                      setOtherValue(isOtherSaved ? (savedAnswer ?? "") : "");
                    }
                  }}
                  placeholder="Type your answer…"
                  type="text"
                  value={otherValue}
                />
              ) : (
                <button
                  className="flex flex-1 items-center text-left"
                  onClick={() => {
                    setIsOtherOpen(true);
                    if (isOtherSaved && savedAnswer) {
                      setOtherValue(savedAnswer);
                    }
                  }}
                  type="button"
                >
                  <span
                    className={cn(
                      isOtherSaved ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {isOtherSaved ? savedAnswer : "Other"}
                  </span>
                </button>
              )}

              <button
                aria-label="Confirm other answer"
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-all",
                  isOtherOpen && otherValue.trim()
                    ? "opacity-70 hover:bg-background hover:opacity-100"
                    : "pointer-events-none opacity-0"
                )}
                onClick={handleOtherConfirmSingle}
                tabIndex={isOtherOpen ? 0 : -1}
                type="button"
              >
                <ArrowRightIcon className="size-3.5" />
              </button>
            </div>
          </>
        )}

        {/* ── multi_select ── */}
        {question.type === "multi_select" && (
          <>
            {question.options.map((option, i) => {
              const isChecked = multiSelected.has(i);
              return (
                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors hover:bg-muted",
                    isChecked && "bg-muted"
                  )}
                  htmlFor={`multi-${currentIndex}-${i}`}
                  key={option}
                >
                  <Checkbox
                    checked={isChecked}
                    id={`multi-${currentIndex}-${i}`}
                    onCheckedChange={(checked) => {
                      const next = new Set(multiSelected);
                      if (checked) {
                        next.add(i);
                      } else {
                        next.delete(i);
                      }
                      setMultiSelected(next);
                    }}
                  />
                  <span className="flex-1">{option}</span>
                </label>
              );
            })}

            {/* "Other" row */}
            <label
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors hover:bg-muted",
                isOtherOpen && "bg-muted"
              )}
              htmlFor={`multi-other-${currentIndex}`}
            >
              <Checkbox
                checked={isOtherOpen}
                id={`multi-other-${currentIndex}`}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setIsOtherOpen(true);
                  } else {
                    setIsOtherOpen(false);
                    setOtherValue("");
                  }
                }}
              />
              {isOtherOpen ? (
                <input
                  autoFocus
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  onChange={(e) => setOtherValue(e.target.value)}
                  placeholder="Type your answer…"
                  type="text"
                  value={otherValue}
                />
              ) : (
                <span className="flex-1 text-muted-foreground">Other</span>
              )}
            </label>
          </>
        )}
      </div>

      {/* Footer */}
      {showFooter && (
        <div className="flex items-center justify-between border-t px-4 py-3">
          <span className="text-muted-foreground text-xs">{footerHint}</span>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleFooterSkip}
              size="sm"
              type="button"
              variant="ghost"
            >
              Skip
            </Button>
            <Button onClick={handleNext} size="sm" type="button">
              {isLast ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
