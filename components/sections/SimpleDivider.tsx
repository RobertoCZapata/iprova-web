export function SimpleDivider() {
  return (
    <div className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-2 h-2 rounded-full bg-secondary" />
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
        </div>
      </div>
    </div>
  );
}
