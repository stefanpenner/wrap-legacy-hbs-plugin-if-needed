# wrap-legacy-hbs-plugin-if-needed

This is a module that few should need to use, so if your not sure what this is
you likely dont need to care. It exists to avoid copy/pasting the code between
ember/embroider/ember-cli-htmlbars.

such time as it is not longer needed, or ember provides the helper itself and
all versions of ember which do not have become EOL.

yarn add wrap-legacy-hbs-plugin-if-needed

import wrapLegacyPluginIfNeeded from 'wrap-legacy-hbs-plugin-if-needed';

wrapLegacyPluginIfNeeded(legacyOrModernHbsPlugin)

