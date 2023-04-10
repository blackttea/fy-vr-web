import { proxy } from 'valtio'

const system = proxy({
  load: false,
})

export default system
