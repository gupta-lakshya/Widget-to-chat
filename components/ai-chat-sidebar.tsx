"use client"

import * as React from "react"
import { useChat } from "@/components/chat-context"
import { Button } from "@/components/ui/button"
import { Sparkles, X, Send, Bot, User, RotateCcw, History, Trash2, Plus, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function AiChatSidebar() {
  const {
    isOpen,
    setIsOpen,
    activeTopic,
    messages,
    sendMessage,
    isTyping,
    getTopicContext,
    clearChat,
    threads,
    activeThreadId,
    createNewThread,
    switchThread,
    deleteThread,
  } = useChat()
  const [input, setInput] = React.useState("")
  const [showThreads, setShowThreads] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, activeTopic, isTyping])

  const handleSend = () => {
    if (!input.trim()) return
    sendMessage(input)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const renderMessageText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const clean = part.slice(2, -2)
        return (
          <strong key={idx} className="font-bold text-zinc-950 dark:text-zinc-50">
            {clean}
          </strong>
        )
      }
      return part
    })
  }

  const activeMessages = messages[activeTopic] || []

  return (
    <div
      className={cn(
        "h-[calc(100vh-var(--header-height))] border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col transition-all duration-300 ease-in-out z-20 shrink-0 relative",
        isOpen ? "w-[380px] opacity-100" : "w-0 opacity-0 pointer-events-none overflow-hidden border-l-0"
      )}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/30 shrink-0 relative">
        <div className="flex flex-col gap-0.5 min-w-0 flex-1 pr-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="p-1 rounded-md bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 shrink-0">
              <Sparkles className="size-3.5" />
            </div>
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 truncate">
              {activeTopic}
            </h3>
          </div>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold pl-6 truncate">
            {getTopicContext(activeTopic)}
          </p>
        </div>
        
        <div className="flex items-center gap-0.5 shrink-0">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setShowThreads(!showThreads)}
            title={showThreads ? "Hide past chats" : `View past chats (${(threads[activeTopic] || []).length})`}
            className={cn(
              "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md",
              showThreads && "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            )}
          >
            <History className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => createNewThread(activeTopic)}
            title="Start new thread"
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md"
          >
            <Plus className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => deleteThread(activeTopic, activeThreadId[activeTopic])}
            title="Delete current conversation"
            className="text-zinc-400 hover:text-red-500 dark:hover:text-red-400 rounded-md"
          >
            <Trash2 className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      {/* Absolute Threads Overlay */}
      {showThreads && (
        <div className="absolute top-[53px] left-0 right-0 bottom-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md z-30 transition-all flex flex-col">
          <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/30 shrink-0">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Previous Conversations
            </span>
            <button
              onClick={() => setShowThreads(false)}
              className="text-[10px] font-bold text-zinc-400 hover:text-zinc-955 dark:hover:text-zinc-100 cursor-pointer"
            >
              Close
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {(threads[activeTopic] || []).map((thread) => {
              const isActive = thread.id === activeThreadId[activeTopic]
              return (
                <div
                  key={thread.id}
                  className={cn(
                    "group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer relative border",
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-850 text-zinc-900 dark:text-zinc-50 border-zinc-205 dark:border-zinc-800"
                      : "text-zinc-600 hover:bg-zinc-100/60 dark:text-zinc-400 dark:hover:bg-zinc-900/60 border-transparent"
                  )}
                  onClick={() => {
                    switchThread(activeTopic, thread.id)
                    setShowThreads(false)
                  }}
                >
                  <div className="flex items-center gap-2 truncate pr-4">
                    {isActive ? (
                      <Check className="size-3.5 text-violet-500 shrink-0" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-650 shrink-0" />
                    )}
                    <span className="truncate">{thread.title}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-medium font-mono">
                      {new Date(thread.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteThread(activeTopic, thread.id)
                      }}
                      title="Delete thread"
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 rounded transition-all cursor-pointer"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
            {(threads[activeTopic] || []).length === 0 && (
              <div className="p-4 text-center text-[10px] text-zinc-400 font-medium">
                No threads found. Click the Plus icon above to begin a new thread.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Message Feed */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-zinc-50/20 dark:bg-zinc-950/20"
      >
        {activeMessages.map((msg) => {
          const isAI = msg.sender === "assistant"
          return (
            <div
              key={msg.id}
              className={cn(
                "flex gap-2.5 max-w-[85%]",
                isAI ? "mr-auto" : "ml-auto flex-row-reverse"
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "size-6 rounded-full flex items-center justify-center shrink-0 border",
                  isAI
                    ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                    : "bg-zinc-900 border-zinc-900 dark:bg-zinc-50 dark:border-zinc-50 text-white dark:text-zinc-900"
                )}
              >
                {isAI ? <Bot className="size-3.5" /> : <User className="size-3.5" />}
              </div>

              {/* Bubble */}
              <div className="flex flex-col gap-1">
                <div
                  className={cn(
                    "text-xs leading-relaxed px-3 py-2 rounded-lg font-medium whitespace-pre-line shadow-2xs",
                    isAI
                      ? "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
                      : "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950"
                  )}
                >
                  {renderMessageText(msg.text)}
                </div>
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 px-1 font-semibold">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          )
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-2.5 mr-auto max-w-[85%]">
            <div className="size-6 rounded-full flex items-center justify-center shrink-0 border bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
              <Bot className="size-3.5" />
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2.5 rounded-lg flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="relative flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30 focus-within:ring-2 focus-within:ring-zinc-900 dark:focus-within:ring-zinc-50 focus-within:border-transparent transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${activeTopic}...`}
            rows={1}
            className="flex-1 max-h-24 min-h-[38px] py-2 px-3 bg-transparent border-0 outline-hidden resize-none text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          />
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-30 disabled:hover:text-zinc-500 shrink-0"
          >
            <Send className="size-3.5" />
          </Button>
        </div>
        <p className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-2 text-center font-medium">
          Press Enter to send. AI model can make mistakes, verify facts.
        </p>
      </div>
    </div>
  )
}
