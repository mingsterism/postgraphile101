const path = require("path");
const { Client } = require("pg");
const fs = require("fs");

const indexSchema = fs
  .readFileSync(path.resolve(__dirname, "./index.sql"))
  .toString();

const connectionString =
  "postgres://postgres:mysecretpassword@localhost:5432/postgres";
const client = new Client({ connectionString });
client.connect((err) => {
  if (err) {
    console.log("There was an error at connection: ", err);
  }
});

async function main() {
  try {
    const resp = await client.query(indexSchema).catch((err) => err);
    await client.end();
  } catch (error) {
    console.log("ERROR: ", error);
    throw new Error("Error with sql init", error);
  }
}

main();
