"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import { Mentor } from "@/lib/data";

interface ChatDialogProps {
  mentor: Mentor;
}

const dummyMessages = [
  { id: 1, sender: "mentor", text: "Hello! How can I help you today?" },
  { id: 2, sender: "student", text: "Hi! I'm looking for guidance on React hooks." },
  { id: 3, sender: "mentor", text: "Which hook are you interested in?" },
];

export function ChatDialog({ mentor }: ChatDialogProps) {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender: "student", text: input },
    ]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "mentor",
          text: "Thanks for your message! I'll guide you.",
        },
      ]);
    }, 800);
  };

  const summarizeChat = async () => {
    setLoadingSummary(true);

    const formattedMessages = messages.map(
      (m) => `${m.sender === "student" ? "Student" : "Mentor"}: ${m.text}`
    );

    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: formattedMessages }),
    });

    const data = await res.json();
    setSummary(data.summary);
    setLoadingSummary(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Chat with Mentor
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl h-[90vh] flex flex-col">
        {/* HEADER */}
        <DialogHeader className="flex flex-row justify-between items-center">
          <div>
            <DialogTitle>Chat with {mentor.name}</DialogTitle>
            <DialogDescription>
              Ask questions and get guidance
            </DialogDescription>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={summarizeChat}
            disabled={messages.length < 3 || loadingSummary}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {loadingSummary ? "Summarizing..." : "Summarize"}
          </Button>
        </DialogHeader>

        {/* SUMMARY */}
        {summary && (
          <div className="mb-3 rounded border bg-muted p-3 text-sm">
            <strong>Chat Summary</strong>
            <pre className="whitespace-pre-wrap mt-1">{summary}</pre>
          </div>
        )}

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.sender === "student" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 text-sm ${
                  m.sender === "student"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="flex gap-2 pt-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
