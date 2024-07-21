import fs from "node:fs";
import { resolve } from "node:path";

export function numberToChinese(num) {
  const chineseNums = [
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
  ];
  const chineseUnits = ["", "十", "百", "千"];
  if (num === 0) {
    return chineseNums[0];
  }
  let chineseStr = "";
  let unitIndex = 0;
  while (num > 0) {
    const digit = num % 10;
    if (digit !== 0) {
      // 处理非零数字
      chineseStr = chineseNums[digit] + chineseUnits[unitIndex] + chineseStr;
    } else if (chineseStr.charAt(0) !== chineseNums[0]) {
      // 处理连续的零，只保留一个零
      chineseStr = chineseNums[0] + chineseStr;
    }
    num = Math.floor(num / 10);
    unitIndex++;
  }
  return chineseStr;
}

export function initSideBar() {
  function noStartsWith(...args) {
    return function (name) {
      return !name.startsWith(...args);
    };
  }

  function removeExt(name) {
    return name.replace(/\.[^.]+$/, "");
  }

  function sortDir(a, b) {
    const splitSybol = ".";
    const aindex = Number(a.split(splitSybol)[0]);
    const bindex = Number(b.split(splitSybol)[0]);
    if (isNaN(aindex)) return 1;
    return aindex - bindex;
  }

  function readDir(dir, path, rootPath) {
    const isDir = fs.statSync(path).isDirectory();
    const text = removeExt(dir);
    // 资源文件夹不显示
    if (/^assets|image[s]|img[s]/.test(dir)) return null;
    if (isDir) {
      const dirs = fs.readdirSync(path).filter(noStartsWith("."));

      return {
        text,
        collapsed: true,
        items: dirs.sort(sortDir).map((name) => {
          return readDir(name, resolve(path, name), `${rootPath}/${dir}`);
        }),
      };
    }
    if (!dir.endsWith(".md")) return null;
    return {
      text,
      link: `/${rootPath}/${dir}`,
    };
  }

  const root = resolve(__dirname, "../pages");
  const rootDirs = fs.readdirSync(root).filter(noStartsWith("."));

  const sidebar = rootDirs
    .map((dir) => {
      return readDir(dir, resolve(root, dir), `pages`);
    })
    .map((item) => {
      item.text = item.text.replace(
        /^(\d+)-/,
        (_, p1) => `${numberToChinese(p1)}、`
      );
      return item;
    });
  return sidebar;
}

export const HOST_NAME = "https://lxfljw.github.io";
