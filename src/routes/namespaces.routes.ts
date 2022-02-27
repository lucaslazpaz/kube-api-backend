import * as k8s from "@kubernetes/client-node";
import { Router } from "express";

import { NamespacesRepository } from "../repositories/NamespacesRepository";

const namespacesRoutes = Router();
const namespacesRepository = new NamespacesRepository();

namespacesRoutes.post("/", async (request, response) => {
  const { name } = request.body;
  namespacesRepository.create({ name });
  return response.status(201).send();
});

namespacesRoutes.get("/", async (request, response) => {
  const namespacesK8s = [];
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  // const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
  const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);

  const servicesRes = await coreV1Api.listNamespace();
  // const deploymentsRes = await appsV1Api.listNamespacedDeployment("default");
  // eslint-disable-next-line no-restricted-syntax
  for (const namespace of servicesRes.body.items) {
    namespacesK8s.push({
      uid: namespace.metadata.uid,
      name: namespace.metadata.name,
      selfLink: namespace.metadata.selfLink,
      creationTimestamp: new Date(namespace.metadata.creationTimestamp),
    });
  }
  const all = namespacesRepository.list();
  return response.json(all);
});

export { namespacesRoutes };
