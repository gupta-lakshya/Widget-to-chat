"use client"

import * as React from "react"
import { TOPICS_METADATA, getMockAIResponse } from "./mock-chat-data"

export interface Message {
  id: string
  sender: "user" | "assistant"
  text: string
  timestamp: Date
}

export interface Thread {
  id: string
  title: string
  messages: Message[]
  createdAt: number
}

interface ChatContextProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  activeTopic: string
  setActiveTopic: (topic: string) => void
  messages: Record<string, Message[]> // Mapping from topic to active thread messages
  threads: Record<string, Thread[]> // Mapping from topic to all its threads
  activeThreadId: Record<string, string> // Mapping from topic to active thread ID
  sendMessage: (text: string) => void
  isTyping: boolean
  getTopicContext: (topic: string) => string
  clearChat: (topic: string) => void
  createNewThread: (topic: string) => void
  switchThread: (topic: string, threadId: string) => void
  deleteThread: (topic: string, threadId: string) => void
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
  const [threads, setThreads] = React.useState<Record<string, Thread[]>>({})
  const [activeThreadId, setActiveThreadId] = React.useState<Record<string, string>>({})
  const [isTyping, setIsTyping] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("widget_chat_threads")
      if (stored) {
        const parsed = JSON.parse(stored)
        setThreads(parsed.threads || {})
        setActiveThreadId(parsed.activeThreadId || {})
      }
    } catch (e) {
      console.error("Failed to load chat history from localStorage", e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save to localStorage when threads or activeThreadId change, once loaded
  React.useEffect(() => {
    if (!isLoaded) return
    try {
      localStorage.setItem("widget_chat_threads", JSON.stringify({ threads, activeThreadId }))
    } catch (e) {
      console.error("Failed to save chat history to localStorage", e)
    }
  }, [threads, activeThreadId, isLoaded])

  const createNewThread = React.useCallback((topic: string) => {
    const newId = `thread-${Date.now()}`
    const newThread: Thread = {
      id: newId,
      title: "New Conversation",
      messages: initialMessages(topic),
      createdAt: Date.now(),
    }
    setThreads((prev) => ({
      ...prev,
      [topic]: [newThread, ...(prev[topic] || [])],
    }))
    setActiveThreadId((prev) => ({
      ...prev,
      [topic]: newId,
    }))
  }, [])

  // Lazy initialize messages for activeTopic if not exists, once loaded
  React.useEffect(() => {
    if (!isLoaded) return
    if (!threads[activeTopic] || threads[activeTopic].length === 0) {
      createNewThread(activeTopic)
    }
  }, [activeTopic, threads, isLoaded, createNewThread])

  const sendMessage = React.useCallback(
    (text: string) => {
      if (!text.trim()) return

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        sender: "user",
        text,
        timestamp: new Date(),
      }

      setThreads((prev) => {
        const topicThreads = prev[activeTopic] || []
        const currentActiveId = activeThreadId[activeTopic]

        return {
          ...prev,
          [activeTopic]: topicThreads.map((thread) => {
            if (thread.id === currentActiveId) {
              const updatedMessages = [...thread.messages, userMsg]
              // If this is the first user message, update thread title to match query
              const userMsgsCount = thread.messages.filter((m) => m.sender === "user").length
              const shouldUpdateTitle = userMsgsCount === 0

              const newTitle = shouldUpdateTitle
                ? text.length > 28
                  ? text.slice(0, 28).trim() + "..."
                  : text.trim()
                : thread.title

              return {
                ...thread,
                title: newTitle,
                messages: updatedMessages,
              }
            }
            return thread
          }),
        }
      })

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

        setThreads((prev) => {
          const topicThreads = prev[activeTopic] || []
          const currentActiveId = activeThreadId[activeTopic]

          return {
            ...prev,
            [activeTopic]: topicThreads.map((thread) => {
              if (thread.id === currentActiveId) {
                return {
                  ...thread,
                  messages: [...thread.messages, aiMsg],
                }
              }
              return thread
            }),
          }
        })
        setIsTyping(false)
      }, 1000)
    },
    [activeTopic, activeThreadId]
  )

  const switchThread = React.useCallback((topic: string, threadId: string) => {
    setActiveThreadId((prev) => ({
      ...prev,
      [topic]: threadId,
    }))
  }, [])

  const deleteThread = React.useCallback((topic: string, threadId: string) => {
    setThreads((prev) => {
      const topicThreads = prev[topic] || []
      const remainingThreads = topicThreads.filter((t) => t.id !== threadId)

      setActiveThreadId((activePrev) => {
        const currentActive = activePrev[topic]
        if (currentActive === threadId) {
          const nextActiveId = remainingThreads.length > 0 ? remainingThreads[0].id : ""
          return {
            ...activePrev,
            [topic]: nextActiveId,
          }
        }
        return activePrev
      })

      return {
        ...prev,
        [topic]: remainingThreads,
      }
    })
  }, [])

  const clearChat = React.useCallback((topic: string) => {
    setThreads((prev) => {
      const topicThreads = prev[topic] || []
      const currentActiveId = activeThreadId[topic]
      return {
        ...prev,
        [topic]: topicThreads.map((thread) => {
          if (thread.id === currentActiveId) {
            return {
              ...thread,
              title: "New Conversation",
              messages: initialMessages(topic),
            }
          }
          return thread
        }),
      }
    })
  }, [activeThreadId])

  const getTopicContext = React.useCallback((topic: string) => {
    return TOPICS_METADATA[topic]?.context || ""
  }, [])

  // Expose messages per topic using the active thread's messages
  const messages = React.useMemo(() => {
    const activeMessagesMap: Record<string, Message[]> = {}
    for (const topic of Object.keys(threads)) {
      const topicThreads = threads[topic] || []
      const activeId = activeThreadId[topic]
      const activeThread = topicThreads.find((t) => t.id === activeId) || topicThreads[0]
      if (activeThread) {
        activeMessagesMap[topic] = activeThread.messages
      }
    }
    return activeMessagesMap
  }, [threads, activeThreadId])

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
      threads,
      activeThreadId,
      sendMessage,
      isTyping,
      getTopicContext,
      clearChat,
      createNewThread,
      switchThread,
      deleteThread,
    }),
    [
      isOpen,
      activeTopic,
      messages,
      threads,
      activeThreadId,
      sendMessage,
      isTyping,
      getTopicContext,
      clearChat,
      createNewThread,
      switchThread,
      deleteThread,
    ]
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
