
interface Project {
  author:string
  name:string
  file:string
  version?:string
}
interface Proxy {
  name?:string
  url:string
}
interface Context {
  project:Project
  proxy:Proxy
  projects:Project[]
  proxies:Proxy[]
}
export type {Project,Proxy,Context}