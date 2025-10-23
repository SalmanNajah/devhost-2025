"use client";

import { useAuth } from "@/context/AuthContext";
import { useTeam } from "@/context/TeamContext";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import PaymentButton from "@/components/backend/HackathonPaymentButton";
import { ClippedButton } from "@/components/ClippedButton";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function HackathonPaymentClient({ paid }: { paid: boolean }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { team, loading: teamLoading, refreshTeam } = useTeam();

  const isLoading = authLoading || teamLoading;

  // redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/");
    }
  }, [user, authLoading, router]);

  // fetch team info on mount
  useEffect(() => {
    refreshTeam();
  }, [refreshTeam]);

  const { teamId, participant_count } = useMemo(() => {
    if (!team) return { teamId: "", participant_count: 0 };
    const count = Array.isArray(team.members) ? team.members.length : 0;
    return {
      teamId: team.team_id ?? "",
      participant_count: count,
    };
  }, [team]);

  if (isLoading) return <LoadingSpinner />;

  if (!team) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 py-12 text-white">
      <h1 className="font-orbitron text-primary text-3xl tracking-widest uppercase">
        Hackathon Payment
      </h1>

      {/* Back button */}
      <div className="absolute top-6 left-4 z-10 sm:top-10 sm:left-10">
        <ClippedButton
          onClick={() => router.push("/hackathon/dashboard")}
          innerBg="bg-primary"
          textColor="text-black"
        >
          Back
        </ClippedButton>
      </div>

      {team.team_name && (
        <h2 className="font-orbitron text-center text-lg tracking-wide text-white/80 uppercase">
          Team: {team?.team_name}
        </h2>
      )}

      <div className="mt-8 w-full max-w-md">
        {paid ? (
          <ClippedButton
            innerBg="bg-black"
            outerBg="bg-primary"
            textColor="text-primary"
          >
            PAID
          </ClippedButton>
        ) : (
          <PaymentButton
            teamId={teamId}
            participant_count={participant_count}
            disabled={false}
          />
        )}
      </div>
    </div>
  );
}
