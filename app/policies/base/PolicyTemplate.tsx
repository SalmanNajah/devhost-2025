"use client";

import React from "react";

interface PolicyTemplateProps {
  title: string;
  children: React.ReactNode;
}

export default function PolicyTemplate({
  title,
  children,
}: PolicyTemplateProps) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black px-6 py-10 font-sans text-white">
      <div className="w-full max-w-3xl">
        <h1 className="text-primary font-orbitron mb-8 text-center text-4xl font-bold tracking-wider md:text-5xl">
          {title}
        </h1>
        <section className="space-y-5 text-justify text-base leading-relaxed font-light text-white md:text-lg">
          {children}
        </section>
      </div>
    </main>
  );
}
