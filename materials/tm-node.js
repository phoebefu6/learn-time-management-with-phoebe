// Node runner: loads assets/tm-live.js exactly as the browser does and prints the canon as JSON.
// Compare with: python3 materials/tm_reference.py --json
const path = require("path");
const repo = process.argv[2] || path.join(__dirname, "..");
const api = require(path.join(path.resolve(repo), "assets/tm-live.js"));
process.stdout.write(JSON.stringify(api.canon(), null, 1));
