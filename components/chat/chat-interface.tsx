"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type ToolUIPart, type UIMessage } from "ai";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { ChatEmptyState } from "@/components/chat/chat-empty-state";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import {
  UI_TOOL_RENDERERS,
  type UiToolRenderContext,
} from "@/components/chat/ui-tools/registry";
import { cn } from "@/lib/utils";

type SendMessage = UiToolRenderContext["sendMessage"];

const DEFAULT_SUGGESTED_QUESTIONS = [
  "Help me get ready for my first session",
  "Help me find the words to invite my group",
  "Walk me through how the Course works",
];

const GREETING = "A calm place to begin.";
const GREETING_DESCRIPTION =
  "You're preparing to lead your group through the Course. Start wherever is most useful, one step at a time.";
const INPUT_PLACEHOLDER = "Type what's on your mind…";
const DISCLAIMER = "AI can make mistakes. Please check responses.";
const MAX_MESSAGE_LENGTH = 4000;

// Resolves a tool UI part to its registered renderer key (tool-ask_user → ask_user).
function toolKeyOf(partType: string): string | null {
  return partType.startsWith("tool-") ? partType.slice(5) : null;
}

// True while the assistant is "thinking" - request submitted or a tool call is
// running - and no assistant text has begun streaming yet.
function shouldShowTyping(
  messages: UIMessage[],
  status: "ready" | "streaming" | "submitted" | "error"
): boolean {
  const last = messages.at(-1);
  const isAssistant = last?.role === "assistant";
  const hasActiveToolCall =
    isAssistant &&
    (last?.parts.some(
      (p) =>
        p.type.startsWith("tool-") &&
        (p as ToolUIPart).state === "input-available"
    ) ??
      false);
  const hasStreamingText =
    status === "streaming" &&
    isAssistant &&
    (last?.parts.some((p) => p.type === "text") ?? false);
  return (status === "submitted" || hasActiveToolCall) && !hasStreamingText;
}

// Renders a single non-text message part via the UI-tool registry. Banner tools
// are skipped inline - they render above the input instead.
function renderToolPart(part: ToolUIPart, sendMessage: SendMessage): ReactNode {
  const key = toolKeyOf(part.type);
  if (!key) {
    return null;
  }
  const renderer = UI_TOOL_RENDERERS[key];
  if (!renderer || renderer.placement === "banner") {
    return null;
  }
  return (
    <div key={part.toolCallId}>{renderer.render(part, { sendMessage })}</div>
  );
}

// Finds the active "banner" UI tool (ask_user) on the last assistant turn.
// Banner tools render above the input and feed their answer back as a message.
function findBannerNode(
  messages: UIMessage[],
  isReady: boolean,
  sendMessage: SendMessage
): ReactNode {
  const last = messages.at(-1);
  if (!(isReady && last?.role === "assistant")) {
    return null;
  }
  for (const part of [...last.parts].reverse()) {
    const key = toolKeyOf(part.type);
    if (!key) {
      continue;
    }
    const renderer = UI_TOOL_RENDERERS[key];
    if (
      renderer?.placement === "banner" &&
      renderer.isActive?.(part as ToolUIPart)
    ) {
      return renderer.render(part as ToolUIPart, { sendMessage });
    }
  }
  return null;
}

// A single rendered conversation message plus its trailing disclaimer.
function ChatMessage({
  message,
  isLastMessage,
  isLastAssistant,
  isStreaming,
  sendMessage,
}: {
  message: UIMessage;
  isLastMessage: boolean;
  isLastAssistant: boolean;
  isStreaming: boolean;
  sendMessage: SendMessage;
}) {
  // Only show the disclaimer once real text has streamed in - not during a
  // tool call or an empty assistant turn before the first words appear.
  const hasStreamedText = message.parts.some(
    (p) => p.type === "text" && p.text.trim().length > 0
  );
  const showDisclaimer =
    message.role === "assistant" && isLastAssistant && hasStreamedText;

  return (
    <div className={cn("flex flex-col", showDisclaimer && "gap-1.5")}>
      <Message from={message.role}>
        <MessageContent>
          {[...message.parts.entries()].map(([partIndex, part]) => {
            if (part.type === "text") {
              return (
                <MessageResponse
                  isAnimating={isStreaming && isLastMessage}
                  key={`text-${partIndex}`}
                >
                  {part.text}
                </MessageResponse>
              );
            }
            return renderToolPart(part as ToolUIPart, sendMessage);
          })}
        </MessageContent>
      </Message>
      {showDisclaimer && (
        <p className="text-[11px] text-muted-foreground/70">{DISCLAIMER}</p>
      )}
    </div>
  );
}

// Prompt composer - owns the draft text, reports submits.
function ChatComposer({
  status,
  onSend,
}: {
  status: "ready" | "streaming" | "submitted" | "error";
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <PromptInput
      className="[&_[data-slot=input-group]]:bg-card [&_[data-slot=input-group]]:[box-shadow:0_0_0_1px_var(--border),0_4px_16px_-2px_color-mix(in_oklab,var(--foreground)_12%,transparent)]"
      onSubmit={({ text: submitted }) => {
        if (!submitted?.trim()) {
          return;
        }
        onSend(submitted);
        setText("");
      }}
    >
      <PromptInputBody>
        <PromptInputTextarea
          className="min-h-14 md:text-base"
          maxLength={MAX_MESSAGE_LENGTH}
          onChange={(e) => setText(e.target.value)}
          placeholder={INPUT_PLACEHOLDER}
          value={text}
        />
      </PromptInputBody>
      <PromptInputFooter className="justify-end">
        <PromptInputSubmit status={status} />
      </PromptInputFooter>
    </PromptInput>
  );
}

export function ChatInterface({ initialQuery }: { initialQuery?: string }) {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  // ?q= priming - auto-send the query as the first user message, exactly once.
  const sentInitial = useRef(false);
  useEffect(() => {
    if (initialQuery && !sentInitial.current) {
      sentInitial.current = true;
      sendMessage({ text: initialQuery });
    }
  }, [initialQuery, sendMessage]);

  const lastMessageIndex = messages.length - 1;
  const lastAssistantIndex = messages.reduce(
    (last, msg, i) => (msg.role === "assistant" ? i : last),
    -1
  );
  const showTypingIndicator = shouldShowTyping(messages, status);
  const hasMessages = messages.length > 0;
  const isStreaming = status === "streaming";
  const bannerNode = findBannerNode(messages, status === "ready", sendMessage);

  return (
    <div className="relative flex h-full flex-col bg-background">
      {/* Top fade - taller on mobile. Inset right by the scrollbar gutter. */}
      {hasMessages && (
        <div className="pointer-events-none absolute top-0 right-3 left-0 z-10 h-28 bg-gradient-to-b from-background to-transparent sm:h-20" />
      )}

      <Conversation className="flex-1 [scrollbar-gutter:stable]">
        {!hasMessages && (
          <div className="absolute inset-0 flex justify-center">
            <div className="w-full max-w-3xl">
              <ChatEmptyState
                className="pb-36"
                greeting={GREETING}
                greetingDescription={GREETING_DESCRIPTION}
                onSend={(value) => sendMessage({ text: value })}
                suggestedQuestions={DEFAULT_SUGGESTED_QUESTIONS}
              />
            </div>
          </div>
        )}

        <ConversationContent
          className={cn(
            "mx-auto w-full max-w-3xl pt-12 sm:pt-10",
            bannerNode ? "pb-72" : "pb-44"
          )}
        >
          {messages.map((message, messageIndex) => (
            <ChatMessage
              isLastAssistant={messageIndex === lastAssistantIndex}
              isLastMessage={messageIndex === lastMessageIndex}
              isStreaming={isStreaming}
              key={message.id}
              message={message}
              sendMessage={sendMessage}
            />
          ))}

          {/*
           * Typing indicator - max-h-0 when inactive so the resize observer on
           * StickToBottom fires when it expands, triggering a scroll to bottom.
           * hidden before the first message to avoid ghost space.
           */}
          <div
            aria-hidden={!showTypingIndicator}
            className={cn(
              "overflow-hidden transition-[max-height] duration-200 ease-out",
              {
                hidden: !hasMessages,
                "max-h-16": hasMessages && showTypingIndicator,
                "max-h-0": hasMessages && !showTypingIndicator,
              }
            )}
          >
            <Message from="assistant">
              <MessageContent>
                <TypingIndicator />
              </MessageContent>
            </Message>
          </div>
        </ConversationContent>

        <ConversationScrollButton className="bottom-44" />
      </Conversation>

      {/* Bottom fade - sits behind the input overlay */}
      {hasMessages && (
        <div className="pointer-events-none absolute right-3 bottom-0 left-0 z-10 h-44 bg-gradient-to-t from-background to-transparent" />
      )}

      {/* Input overlay - transparent so scrollbar and content show through */}
      <div className="absolute right-0 bottom-0 left-0 z-20">
        <div className="mx-auto max-w-3xl space-y-3 px-3 pb-3">
          {bannerNode}
          {status === "error" && (
            <p className="text-center text-destructive text-xs">
              Something went wrong. Please try sending your message again.
            </p>
          )}
          <ChatComposer
            onSend={(value) => sendMessage({ text: value })}
            status={status}
          />
        </div>
      </div>
    </div>
  );
}
