# Proposed maintenance tasks

## 1) Typo fix task
**Issue found:** README says "Posible values" instead of "Possible values".

**Task:** Fix the typo in `README.md` and scan nearby prose for similar spelling errors.

**Why this matters:** Correct spelling improves perceived quality and helps avoid confusion for first-time users.

---

## 2) Bug fix task
**Issue found:** Numeric comparators can return `NaN` when a cell has no parseable number (for example an empty string or non-numeric content). The current `simpleCompare` logic does not handle `NaN`, which can produce unstable/incorrect ordering.

**Task:** Harden `integer` and `float` sort normalization in `sortable.js` so unparsable values are mapped deterministically (for example to `-Infinity`/`Infinity` or a sentinel), and ensure comparator output is always `-1`, `0`, or `1`.

**Why this matters:** Sorting should be deterministic even with dirty real-world table data.

---

## 3) Comment/documentation discrepancy task
**Issue found:** In `sortable.js`, the date-sort comment says it expects an ISO date format but the example string (`"13 MAR 2006 10:17:02 GMT"`) is not ISO-8601.

**Task:** Update the comment (or implementation docs) to accurately describe the accepted date formats, and prefer an ISO-8601 example if that is the intended contract.

**Why this matters:** Mismatched comments create integration bugs and false expectations.

---

## 4) Test improvement task
**Issue found:** The repository has no automated tests for sort behavior.

**Task:** Add a small automated test suite (for example with a DOM test runner) covering at least: default-sort direction, numeric parsing edge cases, date parsing, and stable behavior with missing cells.

**Why this matters:** Tests will prevent regressions in core sorting behavior and make refactoring safer.
