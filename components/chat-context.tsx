"use client"

import * as React from "react"
import { TOPICS_METADATA, getMockAIResponse } from "./mock-chat-data"

export interface Message {
  id: string
  sender: "user" | "assistant"
  text: string
  timestamp: Date
}

interface ChatContextProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  activeTopic: string
  setActiveTopic: (topic: string) => void
  messages: Record<string, Message[]>
  sendMessage: (text: string) => void
  isTyping: boolean
  getTopicContext: (topic: string) => string
}

const ChatContext = React.createContext<ChatContextProps | null>(null)

export function useChat() {
  const context = React.useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}

const initialMessages = (topic: string): Message[] => {
  const meta = TOPICS_METADATA[topic]
  return [
    {
      id: "init",
      sender: "assistant",
      text: meta ? meta.initialGreeting : "Hello! I'm here to assist with dashboard analytics. Select a chart focus to begin.",
      timestamp: new Date(),
    },
  ]
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeTopic, setActiveTopic] = React.useState("Total Revenue")
  const [messages, setMessages] = React.useState<Record<string, Message[]>>({})
  const [isTyping, setIsTyping] = React.useState(false)

  // Lazy initialize messages for activeTopic if not exists
  React.useEffect(() => {
    if (!messages[activeTopic]) {
      setMessages((prev) => ({
        ...prev,
        [activeTopic]: initialMessages(activeTopic),
      }))
    }
  }, [activeTopic, messages])

  const sendMessage = React.useCallback(
    (text: string) => {
      if (!text.trim()) return

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        sender: "user",
        text,
        timestamp: new Date(),
      }

      // Add user message
      setMessages((prev) => ({
        ...prev,
        [activeTopic]: [...(prev[activeTopic] || []), userMsg],
      }))

      // Trigger typing indicator
      setIsTyping(true)

      // Generate mock response after a delay
      setTimeout(() => {
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          sender: "assistant",
          text: getMockAIResponse(activeTopic, text),
          timestamp: new Date(),
        }
        setMessages((prev) => ({
          ...prev,
          [activeTopic]: [...(prev[activeTopic] || []), aiMsg],
        }))
        setIsTyping(false)
      }, 1000)
    },
    [activeTopic]
  )

  const getTopicContext = React.useCallback((topic: string) => {
    return TOPICS_METADATA[topic]?.context || ""
  }, [])

  const value = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      activeTopic,
      setActiveTopic: (topic: string) => {
        setActiveTopic(topic)
        setIsOpen(true)
      },
      messages,
      sendMessage,
      isTyping,
      getTopicContext,
    }),
    [isOpen, activeTopic, messages, sendMessage, isTyping, getTopicContext]
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
