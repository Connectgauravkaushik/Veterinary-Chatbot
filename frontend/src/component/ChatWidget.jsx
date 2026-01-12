import { useEffect, useRef } from "react";
import { useVetChat } from "../customHook/useVetChat";
import {
  X,
  Maximize2,
  Minimize2,
  Send,
  MessageSquare,
  Stethoscope,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Toaster } from "react-hot-toast";

export default function VetChatWidget() {
  const { state, actions } = useVetChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages, state.loading]);

  

  return (
    <>
      <Toaster position="top-center" />

      <div
        className={`
          fixed flex flex-col bg-white dark:bg-slate-900 shadow-2xl overflow-hidden z-[9999]
          transition-[width,height,bottom,right,border-radius,transform,opacity] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom-right
          
          ${
            state.isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-0 translate-y-12 pointer-events-none"
          }

          ${
            state.isFullscreen
              ? "w-[100vw] h-[100vh] bottom-0 right-0 rounded-none border-0"
              : "w-[380px] h-[600px] bottom-6 right-6 rounded-2xl border border-slate-200 dark:border-slate-800"
          }
        `}
      >
        {/* HEADER */}
        <header className="px-5 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-105">
                <Stethoscope className="text-white w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </div>
            <div>
              <h1 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-1.5">
                Vet Assistant
                <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Always here to help
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={actions.toggleFullscreen}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={state.isFullscreen ? "Minimize" : "Maximize"}
            >
              {state.isFullscreen ? (
                <Minimize2 size={18} />
              ) : (
                <Maximize2 size={18} />
              )}
            </button>
            <button
              onClick={actions.toggleOpen}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4 space-y-6 bg-slate-50 dark:bg-[#0f172a] scroll-smooth">
          {state.historyLoading && (
            <div className="flex justify-center py-6">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                <span>Loading previous messages...</span>
              </div>
            </div>
          )}
          {state.messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 animate-fade-in">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mb-4 transform rotate-3">
                <ShieldCheck size={32} className="text-blue-500" />
              </div>
              <h3 className="text-slate-800 dark:text-white font-bold text-lg">
                Hello!
              </h3>
              <p className="text-sm text-slate-500 mt-2 max-w-[240px]">
                I can answer questions about your pet's health, nutrition, and
                behavior.
              </p>
            </div>
          )}

          {state.messages.map((m, i) => (
            <div
              key={i}
              className={`flex w-full 
    ${
      m.role === "user"
        ? "justify-end"
        : m.role === "system"
        ? "justify-center"
        : "justify-start"
    }`}
            >
              <div
                className={`max-w-[85%] px-5 py-3.5 text-sm shadow-sm
      ${
        m.role === "user"
          ? "bg-blue-600 text-white rounded-2xl rounded-br-none"
          : m.role === "system"
          ? "bg-red-100 text-red-700 border border-red-300 rounded-xl"
          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-none"
      }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <footer className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="relative flex items-center shadow-sm rounded-xl bg-slate-100 dark:bg-slate-800 ring-1 ring-transparent focus-within:ring-blue-500/30 focus-within:bg-white dark:focus-within:bg-slate-950 transition-all duration-300">
            <input
              type="text"
              value={state.input}
              onChange={(e) => actions.setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && actions.sendMessage()}
              placeholder="Ask about your pet..."
              className="w-full bg-transparent text-slate-800 dark:text-slate-200 rounded-xl pl-4 pr-12 py-3.5 text-sm focus:outline-none placeholder:text-slate-400"
            />
            <button
              onClick={actions.sendMessage}
              disabled={!state.input.trim() || state.loading}
              className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:scale-90 disabled:bg-slate-400 transition-all duration-200 shadow-sm"
            >
              <Send size={16} />
            </button>
          </div>
        </footer>
      </div>

      {/* FLOATING TRIGGER BUTTON */}
      <button
        onClick={actions.toggleOpen}
        aria-label="Open Chat"
        className={`
          fixed bottom-6 right-6 z-[9990] w-16 h-16 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30
          flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          hover:scale-110 active:scale-95
          ${
            state.isOpen
              ? "scale-0 opacity-0 rotate-90"
              : "scale-100 opacity-100 rotate-0"
          }
        `}
      >
        <Stethoscope size={28} strokeWidth={2.5} />
      </button>
    </>
  );
}
