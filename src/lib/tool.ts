import {writable,type Writable} from 'svelte/store'
import type { Project,UrlType } from './type'

const LocalStorageWritable = <T>(key:string,value:T):Writable<T>=>{
    const s:Writable<T>= writable<T>(value)
    const v = localStorage.getItem(key)
     if (v) {
        try {  s.set(JSON.parse(v) as T)  } 
        finally { }
    }
    s.subscribe((v:T)=>{
      localStorage.setItem(key,JSON.stringify(v))
    })
    return s
  }
// 可以使用 window.open 打开 popup 窗口，也可以用 <iframe> 在页面内嵌页面。
// 下面是 popup 窗口的方式（window.open）：
const download = (url: string) => {
    console.log(`Downloading: ${url}`);
    window.open(url, '_blank', 'width=200,height=200,noopener,noreferrer');
}
const isUrl = (text: string): boolean => {
  try {
    const url = new URL(text);
    switch (url.protocol) {
      case 'http:':
        return true
      case 'https:':
        return true
      default:
        return false
    } 
  } catch {return false;}
  
}
const parseUrlType = (url: string): UrlType => {
  // Source: .../archive/refs/heads/{branch}.zip
  if (/\/archive\/refs\/heads\/[^\/]+\.zip$/.test(url))
    return 'Source'
  // Latest: .../releases/latest/download/{file}
  if (/\/releases\/latest\/download\/[^\/]+$/.test(url))
    return 'Latest'
  // Specific: .../releases/download/{version}/{file}
  if (/\/releases\/download\/[^\/]+\/[^\/]+$/.test(url))
    return 'Specific'
  return 'Unknown'
}

const parseProject = (url: string): Project => {
  const type: UrlType = parseUrlType(url)
  const project:Project = {url,type}
  // Extract owner and repo from the URL
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/)
  if (match) {
    project.author=match[1]
    project.name =match[2]
  }

  switch (type) {
    case 'Source': {
      // .../archive/refs/heads/{branch}.zip
      const branchMatch = url.match(/archive\/refs\/heads\/([^\/]+)\.zip$/)
      if (branchMatch)  project.branch = branchMatch[1]
      break
    }
    case 'Latest': {
      // .../releases/latest/download/{file}
      const fileMatch = url.match(/releases\/latest\/download\/([^\/]+)$/)
      if (fileMatch) project.file = fileMatch[1]
      break
    }
    case 'Specific': {
      // .../releases/download/{version}/{file}
      const specificMatch = url.match(/releases\/download\/([^\/]+)\/([^\/]+)$/)
      if (specificMatch) {
        project.version = specificMatch[1]
        project.file = specificMatch[2]
      }
      break
    }
    default:
      break
  }

  return project
}


export {LocalStorageWritable,download,parseUrlType,parseProject,isUrl}