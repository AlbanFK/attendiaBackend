import type { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";

// const express = require('express');
// const bodyParser = require('body-parser')

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello word!");
});

export default app;
