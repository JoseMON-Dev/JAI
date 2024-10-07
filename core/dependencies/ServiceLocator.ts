import { Reflect } from "@dx/reflect";
import { MetaData } from "../../config/MetaData.ts";

export class ServiceLocator {
  private static readonly instances: Map<
    string,
    new (...args: unknown[]) => unknown
  > = new Map();

  static register<T>(
    key: string,
    instance: new (...args: unknown[]) => T
  ): void {
    this.instances.set(key, instance);
  }

  static resolve<T>(key: string): T {
    const instance = this.instances.get(key);
    return instance as T;
  }

  private static getAllInstances(): (new (...args: unknown[]) => unknown)[] {
    return Array.from(this.instances.values());
  }

  static getInstancesByTypeIdentifier(typeIdentifier: string): any[] {
    return this.getAllInstances().filter((instance) => {
      const metadata = Reflect.getMetadata(
        MetaData.typeIdentifierKey,
        instance
      );
      if (metadata !== typeIdentifier) return;
      return instance;
    });
  }
}
