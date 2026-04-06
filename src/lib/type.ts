
interface Project {
  url:string,
  type:UrlType
  author?:string
  name?:string
  file?:string
  branch?:string
  version?:string
}


type UrlType = 'Latest' | 'Specific' | 'Source' |'Unknown'




interface Context {
  project:Project
  projects:Project[]
  proxies:string[]
}
export type {Project,Context,UrlType}