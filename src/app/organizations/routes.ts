import express from "express";
import OrganizationController from "./controllers";

const organizationRoutes = express.Router();

organizationRoutes
  .route("/api/v1/organizations")
  .post(OrganizationController.create);

organizationRoutes
  .route("/api/v1/organizations")
  .get(OrganizationController.getOrganizations);

organizationRoutes
  .route("/api/v1/organizations/:id")
  .get(OrganizationController.retrieve);

organizationRoutes
  .route("/api/v1/organizations/:id")
  .patch(OrganizationController.update);

organizationRoutes
  .route("/api/v1/organizations/:id")
  .delete(OrganizationController.delete);

export default organizationRoutes;
