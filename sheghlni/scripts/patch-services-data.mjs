import fs from "fs";

const path = "src/lib/mock/services-data.ts";
let s = fs.readFileSync(path, "utf8");

const categoryMap = {
  "cat-cm-photography": "cat-creative-media-photography",
  "cat-home-electrical": "cat-home-services-electrical",
  "cat-pc-fitness": "cat-personal-care-wellness-personal-training-fitness",
  "cat-pc-nutrition": "cat-personal-care-wellness-nutrition-coaching",
  "cat-home-cleaning": "cat-home-services-cleaning",
  "cat-cm-design": "cat-creative-media-graphic-design",
  "cat-pet-grooming": "cat-pet-services-grooming",
  "cat-pet-walking": "cat-pet-services-dog-walking",
  "cat-ed-academic": "cat-education-tutoring-academic-tutoring",
  "cat-ed-testprep": "cat-education-tutoring-test-prep",
  "cat-home-painting": "cat-home-services-painting",
  "cat-pc-hair": "cat-personal-care-wellness-hair",
  "cat-home-handyman": "cat-home-services-carpentry-handyman",
  "cat-ev-planning": "cat-events-event-planning-coordination",
  "cat-tech-repair": "cat-tech-it-computer-phone-repair",
  "cat-tech-smart": "cat-home-services-smart-home-installation",
  "cat-auto-detail": "cat-auto-detailing",
  "cat-biz-accounting": "cat-business-professional-bookkeeping-accounting",
  "cat-errands-assistant": "cat-errands-lifestyle-errand-runner",
  "cat-errands-shopping": "cat-errands-lifestyle-personal-shopper",
  "cat-home-plumbing": "cat-home-services-plumbing",
  "cat-ed-music": "cat-education-tutoring-music-lessons",
  "cat-cm-video": "cat-creative-media-videography",
  "cat-pc-massage": "cat-personal-care-wellness-massage-therapy",
  "cat-home-hvac": "cat-home-services-hvac",
  "cat-ev-dj": "cat-creative-media-music",
  "cat-tech-web": "cat-creative-media-web-app-design-development",
  "cat-pet-sitting": "cat-pet-services-pet-sitting-boarding",
  "cat-errands-chef": "cat-events-catering-private-chefs",
};

for (const [oldId, newId] of Object.entries(categoryMap)) {
  s = s.replaceAll(`categoryId: "${oldId}"`, `categoryId: "${newId}"`);
}

s = s.replaceAll('pricingUnit: "flat"', 'pricingUnit: "project"');
s = s.replaceAll('pricingUnit: "sqft"', 'pricingUnit: "project"');
s = s.replaceAll('pricingUnit: "day"', 'pricingUnit: "visit"');

if (!s.includes("active: true")) {
  s = s.replace(
    /(currency: "USD",\n    durationMinutes: [^\n]+,\n)(  \},)/g,
    '$1    active: true,\n$2',
  );
}

fs.writeFileSync(path, s);
console.log("services-data.ts patched");
