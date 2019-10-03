import { ASTPlugin, ASTPluginEnvironment } from '@glimmer/syntax';
import { AST, Syntax } from '@glimmer/syntax';

type APluginFunc = (env: ASTPluginEnvironment) => ASTPlugin | undefined;

type PluginFunc = APluginFunc & {
  __raw?: LegacyPluginClass | undefined;
};

export interface LegacyPlugin {
  transform(node: AST.Program): AST.Node;
  syntax: Syntax;
}
export type LegacyPluginClass = new (env: ASTPluginEnvironment) => LegacyPlugin;

export default function wrapLegacyPluginIfNeeded(_plugin: PluginFunc | LegacyPluginClass): PluginFunc {
  let plugin = _plugin;
  if (_plugin.prototype && _plugin.prototype.transform) {
    const pluginFunc: PluginFunc = (env: ASTPluginEnvironment): ASTPlugin => {
      let pluginInstantiated = false;

      return {
        name: _plugin.constructor && _plugin.constructor.name,

        visitor: {
          Program(node: AST.Program): AST.Node | void {
            if (!pluginInstantiated) {
              pluginInstantiated = true;
              const plugin = new (_plugin as LegacyPluginClass)(env);

              plugin.syntax = env.syntax;

              return plugin.transform(node);
            }
          },
        },
      };
    };

    pluginFunc.__raw = _plugin as LegacyPluginClass;
    plugin = pluginFunc;
  }

  return plugin as PluginFunc;
}
