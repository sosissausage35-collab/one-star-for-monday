// One Star for Monday — make.fun entry (program/v1).
//
// Writes a single one-star review of Monday, written as if Monday were a
// restaurant, to /output/entry.txt.
//
// Fully deterministic: the review is one constant line. No input is read,
// no network is touched, nothing random and nothing time-dependent happens,
// so every run writes byte-identical output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The review itself: 23 words, one line, plain text.
// A real diner's complaint — seated at a bad table, a dish gone wrong,
// a bill that stings — aimed squarely at Monday, and at no other day.
const REVIEW =
  "One star. Monday seated me by the draughty door, served lukewarm coffee with a side of dread, then billed me my whole weekend.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// Guard the bounty gate before writing anything.
const words = REVIEW.trim().split(/\s+/);
if (words.length > 25) {
  throw new Error(`review is ${words.length} words, over the 25-word cap`);
}
if (REVIEW.length < 1 || REVIEW.length > 180) {
  throw new Error(`review is ${REVIEW.length} characters, outside the 1-180 gate`);
}
if (/[\r\n]/.test(REVIEW)) {
  throw new Error("review must be a single line");
}

mkdirSync(OUT_DIR, { recursive: true });
// No trailing newline: the file holds exactly the review, nothing else.
writeFileSync(OUT_FILE, REVIEW, "utf8");

// Read it back and confirm the run wrote exactly what was intended.
if (readFileSync(OUT_FILE, "utf8") !== REVIEW) {
  throw new Error("verification failed: /output/entry.txt does not match the review");
}
