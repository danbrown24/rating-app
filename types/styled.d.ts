import 'styled-components/native'
import { Theme } from 'app/theme'

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme { }
}