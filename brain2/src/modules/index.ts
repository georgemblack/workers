import type { Module, NodeType, TypeRegistry } from "./types";
import { core } from "./core";
import { tasks } from "./tasks";
import { people } from "./people";

/** Every area of life brain2 knows about, in dashboard tab order. */
export const modules: Module[] = [core, tasks, people];

/**
 * Collects every module's node types into one lookup. Fails at startup if two
 * modules claim the same type or a link points at a type nobody defines.
 */
export function createRegistry(list: Module[]): TypeRegistry & {
  names: string[];
} {
  const types = new Map<string, NodeType>();
  for (const module of list)
    for (const [name, type] of Object.entries(module.types)) {
      if (types.has(name))
        throw new Error(`Node type "${name}" is defined twice`);
      types.set(name, type);
    }
  for (const [name, type] of types)
    for (const [rel, rule] of Object.entries(type.links))
      for (const target of rule.to)
        if (!types.has(target))
          throw new Error(
            `Link "${rel}" on "${name}" points to unknown type "${target}"`,
          );
  return { type: (name) => types.get(name), names: [...types.keys()] };
}

export const registry = createRegistry(modules);
