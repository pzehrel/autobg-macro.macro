import type { CracoConfig } from '@craco/types'
import { resolve } from 'path'

const cracoConfig: CracoConfig = {
  webpack: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
}

export default cracoConfig
