import { proxy } from 'valtio'

const Store = proxy({
  load: false,
})

export default Store
