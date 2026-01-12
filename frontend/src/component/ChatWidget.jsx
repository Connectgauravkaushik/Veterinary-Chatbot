import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useVetChat } from "../customHook/useVetChat";
import {
  X,
  Maximize2,
  Minimize2,
  Send,
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

          {/* RIGHT BUTTONS */}
          <div className="flex items-center gap-1">
            {/* Admin Button */}
            <Link
              to="/admin"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 border border-blue-200 rounded-lg hover:bg-blue-400 transition"
            >
              Admin
            </Link>

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

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4 space-y-6 bg-slate-50 dark:bg-[#0f172a]">
          {state.historyLoading && (
            <div className="flex justify-center py-6 text-sm text-slate-400">
              Loading previous messages...
            </div>
          )}

          {state.messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mb-4">
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
              className={`flex w-full ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-5 py-3.5 text-sm shadow-sm ${
                  m.role === "user"
                    ? "bg-blue-600 text-white rounded-2xl rounded-br-none"
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
          <div className="relative flex items-center shadow-sm rounded-xl bg-slate-100 dark:bg-slate-800">
            <input
              type="text"
              value={state.input}
              onChange={(e) => actions.setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && actions.sendMessage()}
              placeholder="Ask about your pet..."
              className="w-full bg-transparent pl-4 pr-12 py-3.5 text-sm focus:outline-none"
            />
            <button
              onClick={actions.sendMessage}
              disabled={!state.input.trim() || state.loading}
              className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </footer>
      </div>

      {/* FLOATING BUTTON */}
      <button
        onClick={actions.toggleOpen}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center ${
          state.isOpen ? "scale-0" : "scale-100"
        }`}
      >
        <Stethoscope size={28} />
      </button>
    </>
  );
}
