import { FEATURES } from "@/constants";

export default function Features() {
  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto lg:text-center">
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Manage Your Finances Effortlessly
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          Start tracking your expenses and gain control over your spending. Our
          tool makes it quick and easy to categorize and analyze your expenses.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {FEATURES.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
