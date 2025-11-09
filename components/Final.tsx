import Image from "next/image";
import React from "react";
import { ClippedCard } from "./ClippedCard";

export default function Final() {
  return (
    <div className="text-primary flex flex-col bg-black py-12">
      <div className="flex flex-shrink-0 flex-col items-center justify-center px-4 pb-10">
        <h1 className="font-orbitron text-center text-2xl leading-tight font-bold sm:text-3xl md:text-5xl">
          See You Next Time!
        </h1>
      </div>

      <div className="w-full px-2 sm:px-4">
        <ClippedCard>
          <Image
            src="/thanks.jpg"
            alt="banner"
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            priority
          />
        </ClippedCard>
      </div>
    </div>
  );
}
