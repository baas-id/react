import { createRoot } from "react-dom/client";
import { EnrollmentFlow } from "@baas-id/react";

// Your backend opens the session with your API key (see ../express-server) — never put the key in the browser.
function App() {
  return (
    <EnrollmentFlow
      apiUrl="https://api.baaslatam.com"
      openSession={async (signal) => (await fetch("/api/baas/session", { method: "POST", signal })).json()}
      onVerified={(result) =>
        fetch("/api/baas/verified", { method: "POST", body: result.verification_token })}
      onFailed={(reason, detail) => console.warn(reason, detail)}
    />
  );
}

createRoot(document.getElementById("root")!).render(<App />);
