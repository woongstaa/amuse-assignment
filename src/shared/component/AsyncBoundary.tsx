interface AsyncBoundaryProps {
  children?: React.ReactNode;
  isLoading: boolean;
  error?: Error | null;
  loadingHeight?: string;
  loadingComponent?: React.ReactNode;
}

export function AsyncBoundary({ children, isLoading, error, loadingHeight = 'h-[80%] sm:h-[85%]', loadingComponent }: AsyncBoundaryProps) {
  if (isLoading && loadingComponent) {
    return <div className={`w-full ${loadingHeight}`}>{loadingComponent}</div>;
  }

  if (error) {
    return <div className={`flex justify-center items-center ${loadingHeight} `}>Error: {error.message}</div>;
  }

  return <>{children}</>;
}
