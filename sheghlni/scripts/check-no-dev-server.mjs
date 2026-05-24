import http from "node:http";

function isDevServerUp() {
  return new Promise((resolve) => {
    const req = http.get("http://localhost:3000/", { timeout: 2000 }, () => {
      resolve(true);
    });
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
  });
}

if (await isDevServerUp()) {
  console.error("\nBuild blocked: dev server is running on http://localhost:3000/");
  console.error("Stop it first (Ctrl+C in the dev terminal), then run build again.");
  console.error(
    "Running build while dev is up corrupts .next and breaks localhost.\n",
  );
  process.exit(1);
}
