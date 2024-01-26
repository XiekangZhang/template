# Create Vue/Vuetify project
## Install NVM (https://github.com/nvm-sh/nvm)
- wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
- source ~/.bashrc
- nvm ls-remote
- nvm install <node_version>
- nvm use <node_version>
- nvm uninstall <node_version>
## Install vuetify project --> currently should use a workround
- npm create vue@latest
- cd <project_name>
- npm install
- npm run dev
- npm i vuetify
- add vuetify dependency to main.js

```javascript
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify)
```