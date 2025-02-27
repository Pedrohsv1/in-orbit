import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorProps {
  message: string;
}

export function ErrorComp({ message }: ErrorProps) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="min-w-[360px] bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-md shadow-md max-w-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 mr-2 flex-shrink-0" />
            <p className="font-medium">Error</p>
          </div>
          <button
            onClick={handleReload}
            className="p-2 flex gap-2 rounded-md items-center hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            aria-label="Reload page"
            type="button"
          >
            <RefreshCw className="h-5 w-5" /> Recarregar
          </button>
        </div>
        <p className="mt-2 text-sm">{message}</p>
      </div>
    </div>
  );
}
