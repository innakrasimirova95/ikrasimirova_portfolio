"use client";

import React, { useState, useEffect } from "react";

interface TypingEffectProps {
  text: string;
  typingSpeed?: number;   // ms entre cada letra al escribir (por defecto 150)
  deletingSpeed?: number; // ms entre cada letra al borrar (por defecto 75)
  pauseTime?: number;     // ms a esperar al terminar de escribir antes de borrar (por defecto 1000)
  fontSize?: string;      // tamaño de fuente CSS opcional, ejemplo: "clamp(1.5rem, 4vw, 3rem)"
}

export function TypingEffect({
  text,
  typingSpeed = 150,
  deletingSpeed = 75,
  pauseTime = 1000,
  fontSize = "clamp(1.5rem, 4vw, 3rem)",
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && index <= text.length) {
      timer = setTimeout(() => {
        setDisplayedText(text.substring(0, index));
        setIndex(index + 1);
      }, typingSpeed);
    } else if (isDeleting && index >= 0) {
      timer = setTimeout(() => {
        setDisplayedText(text.substring(0, index));
        setIndex(index - 1);
      }, deletingSpeed);
    }

    if (index === text.length + 1 && !isDeleting) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    }

    if (index === -1 && isDeleting) {
      setIsDeleting(false);
      setIndex(0);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, text, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <h2
      className="font-mono"
      style={{
        fontSize,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {displayedText}
      <span className="animate-blink cursor">|</span>
      <style jsx>{`
        .cursor {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </h2>
  );
}
