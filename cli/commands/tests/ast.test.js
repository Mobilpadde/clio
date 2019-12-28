const tmp = require("tmp");
const path = require("path");
const commands = require("..");

test("Print AST", async () => {
  const dir = tmp.dirSync();
  await commands._new.createPackage(dir.name);
  const source = path.join(dir.name, "src/main.clio");
  const ast = await commands.ast.printAst(source);
  expect(ast.pop()).toContain("name: clio\n");
  dir.removeCallback();
});
