import {writable,type Writable} from 'svelte/store'
import type { Project } from './type'

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
const parseUrl=(project:Project,latest:boolean=true):string=>
    latest?`https://github.com/${project.author}/${project.name}/releases/latest/download/${project.file}`:
       `https://github.com/${project.author}/${project.name}/releases/download/${project.version}/${project.file}`
    ;
const parseProject = (url: string): Project => {

    const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/releases\/(latest|download\/([^\/]+))\/download\/(.+)$/;
    const match = url.match(regex);
    if (!match)   throw new Error('Invalid GitHub release URL');
    
    const author = match[1];
    const name = match[2];
    const version = match[3] === 'latest' ? 'latest' : match[4];
    const file = match[5];

    return { author, name, version, file };
}

export {LocalStorageWritable,parseProject,download,parseUrl}