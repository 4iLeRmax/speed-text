export const TextSettingsSkeleton = () => {
  return (
    <div className="w-full h-9 bg-neutral-900 rounded-md flex items-center gap-2 px-5 py-2 ">
      <div className="w-11 h-5 bg-neutral-600 rounded-md animate-pulse"></div>
      <div className="w-6 h-5 bg-neutral-600 rounded-md animate-pulse"></div>
      <div className="w-6 h-5 bg-neutral-600 rounded-md animate-pulse"></div>
      <div className="w-6 h-5 bg-neutral-600 rounded-md animate-pulse"></div>
      <div className="w-6 h-5 bg-neutral-600 rounded-md animate-pulse"></div>
    </div>
  );
};
export const CountOfWordsSkeleton = () => {
  return (
    <div className="w-2/3 mb-5">
      <div className="flex justify-start w-14 h-8 rounded-md bg-neutral-600 animate-pulse"></div>
    </div>
  );
};

export const SentenceSkeleton = () => {
  return (
    <div className="flex flex-col w-2/3 gap-2">
      <div className="h-7 w-full rounded-md bg-neutral-600 animate-pulse"></div>
      <div className="h-7 w-full rounded-md bg-neutral-600 animate-pulse"></div>
      <div className="h-7 w-3/5 rounded-md bg-neutral-600 animate-pulse"></div>
    </div>
  );
};

export const RestartButtonSkeleton = () => {
  return (
    <div className="w-5 h-5 rounded-md bg-neutral-600 mt-5 animate-pulse"></div>
  );
};
export const SpeedTextSkeleton = () => {
  return (
    <div className="bg-neutral-800 w-screen h-screen p-10 relative">
      <TextSettingsSkeleton />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-1 items-center">
        <CountOfWordsSkeleton />
        <SentenceSkeleton />
        <RestartButtonSkeleton />
      </div>
    </div>
  );
};
