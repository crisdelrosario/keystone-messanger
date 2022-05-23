import loader from "./loader";

const cmd = (process.argv.slice(2))[0] || "start";

if (cmd === "start") {
  loader.start();
} else {
  console.log("Error: Invalid command-line request");
  process.exit(1);
}
