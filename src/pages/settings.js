import { Inter } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ settings }) {
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState(6);
  const [temperature, setTemperature] = useState(0.7);

  useEffect(() => {
    // Load existing settings to states
    const fetchSettings = async () => {
      const currentSettingsResponse = await fetch(`/api/settings`);
      const data = await currentSettingsResponse.json();

      setPrompt(data.prompt);
      setContext(data.context);
      setTemperature(data.temperature);
    };
    fetchSettings();
  }, []);

  const saveSettings = async () => {
    // Save settings
    const response = await fetch(`/api/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }, // TODO
    });

    router.push("/");
  };

  return (
    <main
      className={`flex h-screen justify-center p-12 max-w-5xl mx-auto ${inter.className}`}
    >
      <div className="w-full flex flex-col bg-slate-300 rounded-xl p-4 ring-4 ring-slate-600 shadow-xl relative">
        <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">
          Settings
        </h2>

        <button
          onClick={saveSettings}
          className="inline-block self-end p-1 bg-slate-200 hover:bg-slate-400 rounded absolute"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </button>

        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="prompt" className="text-slate-900">
              Prompt
            </label>
            <input
              type="text"
              id="prompt"
              name="prompt"
              className="p-2 rounded-md bg-slate-200 text-slate-900 outline-none focus:ring-2 ring-slate-600"
              placeholder="Enter your prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="context" className="text-slate-900">
              Context
            </label>
            <input
              type="number"
              id="context"
              name="context"
              className="p-2 rounded-md bg-slate-200 text-slate-900 outline-none focus:ring-2 ring-slate-600"
              placeholder="6"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="temperature" className="text-slate-900">
              Temperature
            </label>
            <input
              type="number"
              id="temperature"
              name="temperature"
              className="p-2 rounded-md bg-slate-200 text-slate-900 outline-none focus:ring-2 ring-slate-600"
              placeholder="0.7"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  // Fetch settings from the API, and return 'data' as prop to the component
  const settings = await fetch(`${process.env.API_URL}/settings`);
  const data = settings.json();

  return {
    props: {
      // settings: "", // for demo
      settings: [{}],
      // TODO
    },
  };
}
