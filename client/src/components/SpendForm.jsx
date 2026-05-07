import { useEffect, useState } from "react";

const initialState = {
  tool: "ChatGPT",
  plan: "",
  monthlySpend: "",
  seats: "",
  teamSize: "",
  useCase: "coding",
};

const inputClass =
  "w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20";

const labelClass =
  "mb-2 block text-sm font-medium text-zinc-300";

function CustomSelect({
  label,
  name,
  value,
  options,
  onChange,
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    const selectedValue =
      option.value || option;

    onChange({
      target: {
        name,
        value: selectedValue,
      },
    });

    setOpen(false);
  };

  const selectedLabel =
    options.find(
      (item) =>
        (item.value || item) === value
    )?.label || value;

  return (
    <div className="relative">
      <label className={labelClass}>
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${inputClass} flex items-center justify-between`}
      >
        <span>{selectedLabel}</span>

        <span
          className={`transition duration-200 ${open ? "rotate-180" : ""
            }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950 shadow-2xl">

          <div className="max-h-40 overflow-y-auto">
            {options.map((option) => {
              const optionValue =
                option.value || option;

              const optionLabel =
                option.label || option;

              return (
                <button
                  key={optionValue}
                  type="button"
                  onClick={() =>
                    handleSelect(option)
                  }
                  className={`block w-full px-4 py-3 text-left text-sm transition ${value === optionValue
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "text-zinc-200 hover:bg-zinc-800"
                    }`}
                >
                  {optionLabel}
                </button>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
}

export default function SpendForm() {
  const [formData, setFormData] = useState(() => {
    const savedData =
      localStorage.getItem("auditForm");

    return savedData
      ? JSON.parse(savedData)
      : initialState;
  });

  useEffect(() => {
    localStorage.setItem(
      "auditForm",
      JSON.stringify(formData)
    );
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <section className="min-h-screen bg-zinc-950 px-4 py-6 text-zinc-100 flex items-center justify-center">

      <div className="w-full max-w-4xl">

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-emerald-400">
            Free AI Spend Audit
          </p>

          <h1 className="max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
            Find hidden waste in your AI stack.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">
            Enter your current AI tool spend
            and discover downgrade
            opportunities, pricing mismatches,
            and savings.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-h-[82vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl"
        >

          <div className="mb-6 flex flex-col gap-4 border-b border-zinc-800 pb-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-semibold">
                Tool details
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                Start with one tool. More tools
                support can be added later.
              </p>
            </div>

            <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Auto-saved
            </span>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <CustomSelect
              label="AI Tool"
              name="tool"
              value={formData.tool}
              onChange={handleChange}
              options={[
                "ChatGPT",
                "Claude",
                "Cursor",
                "Gemini",
                "GitHub Copilot",
                "OpenAI API",
                "Anthropic API",
              ]}
            />

            <div>
              <label className={labelClass}>
                Current Plan
              </label>

              <input
                type="text"
                name="plan"
                placeholder="Pro, Team, Business..."
                value={formData.plan}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Monthly Spend
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  $
                </span>

                <input
                  type="number"
                  name="monthlySpend"
                  placeholder="250"
                  value={formData.monthlySpend}
                  onChange={handleChange}
                  className={`${inputClass} pl-8`}
                />

              </div>
            </div>

            <div>
              <label className={labelClass}>
                Seats
              </label>

              <input
                type="number"
                name="seats"
                placeholder="5"
                value={formData.seats}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Team Size
              </label>

              <input
                type="number"
                name="teamSize"
                placeholder="12"
                value={formData.teamSize}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <CustomSelect
              label="Primary Use Case"
              name="useCase"
              value={formData.useCase}
              onChange={handleChange}
              options={[
                {
                  label: "Coding",
                  value: "coding",
                },
                {
                  label: "Writing",
                  value: "writing",
                },
                {
                  label: "Research",
                  value: "research",
                },
                {
                  label: "Mixed",
                  value: "mixed",
                },
              ]}
            />

          </div>

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">

            <p className="text-sm leading-6 text-zinc-400">
              Your progress is automatically
              saved locally, so refreshing the
              page won’t remove your inputs.
            </p>

          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition duration-200 hover:scale-[1.01] hover:bg-emerald-400 active:scale-[0.99]"
          >
            Analyze Spend
          </button>

        </form>
      </div>
    </section>
  );
}