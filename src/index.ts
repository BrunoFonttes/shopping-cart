import express from "express";

const PORT = 3000;

const app = express();

app.use(express.json({ limit: "50kb" }));

app.get("/health", (_req, res) => {
	return res.status(200).send("ok");
});

app.listen(PORT, () => {});
