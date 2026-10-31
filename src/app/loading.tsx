export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-[#0a0f1a] via-[#121a2e] to-[#0a0f1a]">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 animate-pulse">
          <div className="h-8 w-48 bg-white/10 rounded-full mx-auto" />
          <div className="h-14 w-[80%] bg-white/10 rounded-2xl mx-auto" />
          <div className="h-14 w-[60%] bg-white/10 rounded-2xl mx-auto" />
          <div className="h-6 w-[50%] bg-white/8 rounded-xl mx-auto" />
          <div className="h-14 w-80 bg-white/10 rounded-2xl mx-auto mt-8" />
          <div className="flex gap-4 justify-center mt-6">
            <div className="h-12 w-40 bg-white/10 rounded-xl" />
            <div className="h-12 w-40 bg-white/10 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Tools grid skeleton */}
      <div className="max-w-5xl mx-auto px-4 py-20 space-y-8 animate-pulse">
        <div className="text-center space-y-3">
          <div className="h-5 w-32 bg-surface-border rounded-full mx-auto" />
          <div className="h-9 w-64 bg-surface-border rounded-xl mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="neu-card p-6 space-y-4">
              <div className="w-12 h-12 bg-surface-border rounded-xl" />
              <div className="h-5 w-3/4 bg-surface-border rounded-lg" />
              <div className="h-4 w-full bg-surface-border/60 rounded-lg" />
              <div className="h-4 w-2/3 bg-surface-border/40 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
