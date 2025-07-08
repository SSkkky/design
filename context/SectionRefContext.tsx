// context/SectionRefContext.tsx
"use client"

import { createContext, useContext, useRef } from "react";

type SectionRefContextType = {
  sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
};

const SectionRefContext = createContext<SectionRefContextType | null>(null);

export const SectionRefProvider = ({ children }: { children: React.ReactNode }) => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  return (
    <SectionRefContext.Provider value={{ sectionRefs }}>
      {children}
    </SectionRefContext.Provider>
  );
};

export const useSectionRefs = () => {
  const context = useContext(SectionRefContext);
  if (!context) throw new Error("SectionRefContext must be used within SectionRefProvider");
  return context;
};
