# drizzle-repro

This reproduction needs Bun 1.1.7 and Node 20 installed on your system.

To install dependencies:

```bash
bun install
```

`db.sqlite` file is included in the repo along with some data. Run these two commands below to see how the results differ.

To run a test query with Bun + `bun:sqlite`:

```bash
bun run query:bun
```

To run a test query with Node + `better-sqlite3`:

```bash
bun run query:bs3
```

This project was created using `bun init` in bun v1.1.7. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
