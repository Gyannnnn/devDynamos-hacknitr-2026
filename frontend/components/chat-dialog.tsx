"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send } from "lucide-react"
import { Mentor } from "@/lib/data"

interface ChatDialogProps {
  mentor: Mentor
}

const dummyMessages = [
  { id: 1, sender: "mentor", text: "Hello! How can I help you today?" },
  { id: 2, sender: "student", text: "Hi! I'm looking for guidance on React hooks." },
  { id: 3, sender: "mentor", text: "Great! React hooks are fundamental. Which specific hook would you like to learn about?" },
]

export function ChatDialog({ mentor }: ChatDialogProps) {
  const [messages, setMessages] = useState(dummyMessages)
  const [input, setInput] = useState("")
  const [open, setOpen] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  const toggleFollow = () => setIsFollowing((v) => !v)

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { id: messages.length + 1, sender: "student", text: input }])
    setInput("")
    // Simulate mentor response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: "mentor", text: "Thanks for your message! I'll get back to you soon." },
      ])
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full">
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat with Mentor
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="max-w-2xl h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>Chat with {mentor.name}</DialogTitle>
          <DialogDescription>
            Send a message to {mentor.name} for guidance
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "student" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "student"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend()
              }
            }}
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

