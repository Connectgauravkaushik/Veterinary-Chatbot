import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { sendChat, getHistory } from "../services/api";

export const useVetChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const getSessionId = useCallback(() => {
    let id = localStorage.getItem("vet_session_id");
    if (!id) {
      id = "sess_" + Date.now();
      localStorage.setItem("vet_session_id", id);
    }
    return id;
  }, []);

  const sessionId = getSessionId();


  useEffect(() => {
    if (!isOpen) return;

    setHistoryLoading(true);
    getHistory(sessionId)
      .then((data) => {
        if (data?.messages?.length) {
          setMessages(data.messages);
        }
      })
      .catch(() => {
        // silent fail for history
      })
      .finally(() => setHistoryLoading(false));
  }, [isOpen, sessionId]);

  const toggleOpen = () => setIsOpen((p) => !p);
  const toggleFullscreen = () => setIsFullscreen((p) => !p);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const text = input;
    setInput("");
    setMessages((p) => [...p, { role: "user", text }]);
    setLoading(true);

    try {
      const data = await sendChat({ sessionId, message: text });
      setMessages((p) => [...p, { role: "bot", text: data.reply }]);
    } catch (err) {
      const msg = err.message || "Connection failed";
      toast.error(msg);
      setMessages((p) => [...p, { role: "system", text: msg }]);
    } finally {
      setLoading(false);
    }
  };

  return {
    state: { isOpen, isFullscreen, input, messages, loading, historyLoading },
    actions: { setInput, toggleOpen, toggleFullscreen, sendMessage },
  };
};
