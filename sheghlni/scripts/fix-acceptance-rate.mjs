import fs from "fs";

const path = "src/lib/mock/data.ts";
let s = fs.readFileSync(path, "utf8");

s = s.replace(
  /responseRatePct: (\d+),\n    completedJobsCount/g,
  (_, rate) =>
    `responseRatePct: ${rate},\n    acceptanceRatePct: ${Math.max(80, Number(rate) - 4)},\n    completedJobsCount`,
);

fs.writeFileSync(path, s);
console.log("acceptanceRatePct added");
