"use client";

import type { ToolUIPart } from "ai";
import type { ReactNode } from "react";
import type {
  AskUserInput as AskUserToolInput,
  ShowLinksInput,
} from "@/lib/chat-tools";
import { AskUserInput } from "./ask-user-input";
import { LinkCardCarousel } from "./link-card-carousel";

export interface UiToolRenderContext {
  sendMessage: (msg: { text: string }) => void;
}

export interface UiToolRenderer {
  // Banner tools only: whether this part should currently occupy the banner.
  isActive?: (part: ToolUIPart) => boolean;
  // inline → rendered in the message thread; banner → rendered above the input.
  placement: "inline" | "banner";
  render: (part: ToolUIPart, ctx: UiToolRenderContext) => ReactNode;
}

// A tool part is the loose runtime shape; narrowing the AI SDK discriminated
// union by `state` here is awkward, so we read the fields defensively.
interface LooseToolPart {
  input?: unknown;
  output?: unknown;
  state?: string;
}

export const UI_TOOL_RENDERERS: Record<string, UiToolRenderer> = {
  show_links: {
    placement: "inline",
    render: (part) => {
      const { state, output } = part as LooseToolPart;
      if (state !== "output-available" || output == null) {
        return null;
      }
      const { links } = output as ShowLinksInput;
      if (!links?.length) {
        return null;
      }
      return <LinkCardCarousel links={links} />;
    },
  },
  ask_user: {
    placement: "banner",
    isActive: (part) => {
      const { state, input } = part as LooseToolPart;
      return state === "output-available" && input != null;
    },
    render: (part, ctx) => {
      const { input } = part as LooseToolPart;
      const questions = (input as AskUserToolInput | undefined)?.questions;
      if (!questions?.length) {
        return null;
      }
      return (
        <AskUserInput
          onSkip={() => ctx.sendMessage({ text: "Please continue." })}
          onSubmit={(output) => ctx.sendMessage({ text: output })}
          questions={questions}
        />
      );
    },
  },
};
