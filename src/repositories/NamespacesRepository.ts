import { Namespace } from "../model/Namespace";

interface ICreateNamespaceDTO {
  name: string;
}

class NamespacesRepository {
  private namespaces: Namespace[];

  constructor() {
    this.namespaces = [];
  }

  create({ name }: ICreateNamespaceDTO): void {
    const namespace = new Namespace();
    Object.assign(namespace, { name });
    this.namespaces.push(namespace);
  }

  list(): Namespace[] {
    return this.namespaces;
  }
}

export { NamespacesRepository };
