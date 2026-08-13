// Runnable entry point: violating design first, then the LSP-compliant design.

import { MutableList, ReadOnlyList, appendTags as badAppendTags } from "./list-violation";
import { ArrayList } from "./array-list";
import { FrozenList } from "./frozen-list";
import { appendTags, printTags } from "./tag-service";

export function run(): void {
  console.log("=== Violation ===");
  console.log(`MutableList size after append: ${badAppendTags(new MutableList(), ["urgent", "backend"])}`);
  try {
    console.log(`ReadOnlyList size after append: ${badAppendTags(new ReadOnlyList(["frozen"]), ["urgent"])}`);
  } catch (error: unknown) {
    console.log(`Substitution failed: ${(error as Error).message}`);
  }

  console.log("=== LSP applied ===");
  const editable: ArrayList<string> = new ArrayList<string>();
  console.log(`Writable size after append: ${appendTags(editable, ["urgent", "backend"])}`);
  printTags("Writable", editable);
  printTags("Frozen", new FrozenList<string>(["frozen", "audited"]));
}

run();
