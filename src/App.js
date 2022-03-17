import './stylesheets/font-awesome.min.css'
import './stylesheets/AppTheme.css'

import AppCore from './components/Core/AppCore'
import { VERIFIER_LABEL } from './utils/env'

function App() {
  return <AppCore agent={VERIFIER_LABEL} />
}

export default App
