import wrapLegacyPluginIfNeeded, { LegacyPluginClass, LegacyPlugin } from '../index';
import { ASTPlugin, ASTPluginEnvironment } from '@glimmer/syntax';
import { AST, Syntax } from '@glimmer/syntax';

class Legacy implements LegacyPlugin {
  constructor(env: ASTPluginEnvironment) {

  }

  transform(node: AST.Program): AST.Node {
    return {} as AST.Node;
  }

  get syntax() : Syntax {
    return {} as Syntax;
  }
}

const modern = (_: any) => undefined;
const wrapped = wrapLegacyPluginIfNeeded(Legacy);

it('wraps legacy plugins', function() {
  expect(wrapped).not.toBe(Legacy);
});

it('does not double wrap legacy plugins', function() {
  const maybeDoubledWrapped = wrapLegacyPluginIfNeeded(wrapped);
  expect(wrapped).toEqual(maybeDoubledWrapped);
  expect(wrapped).toEqual(maybeDoubledWrapped);
});

it('does not wrap modern plugins', function() {
  const maybeWrapped = wrapLegacyPluginIfNeeded(modern);
  expect(maybeWrapped).toEqual(modern);
});
