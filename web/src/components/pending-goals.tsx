import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPendingGoals } from "../http/get-pending-goals";
import { createGoalCompletion } from "../http/create-goal-completion";
import { useState } from "react";

export const PendingGoals = () => {
  const queryClient = useQueryClient();
  const [loadingGoalId, setLoadingGoalId] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60,
  });

  if (!data) {
    return null;
  }

  async function handleCompletionGoal(goalId: string) {
    setLoadingGoalId(goalId); // Disable the clicked button
    try {
      await createGoalCompletion(goalId);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["summary"] }),
        queryClient.invalidateQueries({ queryKey: ["pending-goals"] }),
      ]);
    } catch (error) {
      console.error("Failed to complete goal:", error);
      // Handle error (show toast, etc.)
    } finally {
      setLoadingGoalId(null); // Re-enable the button
    }
  }

  return (
    <div className="flex flex-wrap  gap-3">
      {data.pendingGoals.map((goal) => {
        return (
          <OutlineButton
            key={goal.id}
            className="relative"
            disabled={
              goal.desiredWeeklyFrequency <= goal.completionCount ||
              loadingGoalId === goal.id
            }
            onClick={() => handleCompletionGoal(goal.id)}
          >
            <div className="size-4 flex justify-center items-center bg-violet-500/30 absolute right-[-5px] top-[-5px] rounded-sm text-xs">
              {goal.desiredWeeklyFrequency - goal.completionCount}
            </div>
            {loadingGoalId === goal.id ? (
              <Spinner className="size-4" /> // Add your spinner component
            ) : (
              <Plus className="size-4" />
            )}
            {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
};

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={`animate-spin ${className}`}>
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
}
