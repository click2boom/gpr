import { createContext } from "svelte";
import type {Context} from './type'
const [getContext, setContext] = createContext<Context>()

export {
  getContext,setContext,  
}

