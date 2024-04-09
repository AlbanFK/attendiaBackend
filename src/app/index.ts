import type { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import organizationRoutes from "./organizations";
import userRoutes from "./users";

// const express = require('express');
// const bodyParser = require('body-parser')

const app = express();

app.use(express.json());
app.use(bodyParser.json());

//usage of routes
app.use(organizationRoutes);
app.use(userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("hello word!");
});

export default app;
