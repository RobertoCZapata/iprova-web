import { trustValues } from "@/lib/data";

export function TrustValuesSection() {
  return (
    <div className="bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-300">
          {trustValues.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="p-4">
                <div className="inline-flex items-center justify-center p-3 bg-primary rounded-full shadow-lg mb-4">
                  <Icon className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-primary uppercase tracking-wider mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

