const path = require("path");
const { createSqliteDatabase } = require("./db/sqlite-database");

const root = __dirname;
const backend = String(process.env.DATABASE_BACKEND || "sqlite").trim().toLowerCase();

function createDatabase() {
  if (backend === "sqlite") {
    return createSqliteDatabase({ root });
  }

  if (backend === "supabase") {
    throw new Error([
      "DATABASE_BACKEND=supabase is reserved for the future Supabase adapter.",
      "Keep DATABASE_BACKEND=sqlite until @supabase/supabase-js, Supabase tables, RLS policies, and storage are configured."
    ].join(" "));
  }

  throw new Error(`Unsupported DATABASE_BACKEND "${backend}". Use "sqlite".`);
}

const database = createDatabase();

module.exports = {
  ...database,
  root,
  backend: database.backend || backend,
  adapterPath: path.join(root, "db")
};
