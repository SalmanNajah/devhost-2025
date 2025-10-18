"use client";

import React from "react";

interface PolicyTemplateProps {
  title: string;
  children: React.ReactNode;
}

export default function PolicyTemplate({ title, children }: PolicyTemplateProps) {
  return (
    <main className="min-h-screen bg-black text-white font-sans px-6 py-10 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-primary text-4xl md:text-5xl font-orbitron font-bold mb-8 text-center tracking-wider">
          {title}
        </h1>
        <section className="space-y-5 text-base md:text-lg leading-relaxed text-white font-light text-justify">
          {children}
        </section>
      </div>
    </main>
);
}