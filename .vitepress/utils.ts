import fs from "node:fs";
import { resolve } from "node:path";

export function numberToChinese(num: number): string {
  // 基础数字和单位映射
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
  const chineseUnits = [
    "",
    "十",
    "百",
    "千",
    "万",
    "十万",
    "百万",
    "千万",
    "亿",
  ];

  // 处理 0
  if (num === 0) return "零";

  // 处理负数
  if (num < 0) return "负" + numberToChinese(-num);

  // 特殊处理 10
  if (num === 10) return "十";

  // 处理小于 10000 的数字
  function convertSection(n: number): string {
    if (n === 0) return "";

    let result = "";
    let hasZero = false;
    let unitIndex = 0;

    while (n > 0) {
      const digit = n % 10;

      if (digit === 0) {
        hasZero = true;
      } else {
        if (hasZero && result.length > 0) {
          result = "零" + result;
        }
        result = chineseNums[digit] + chineseUnits[unitIndex] + result;
        hasZero = false;
      }

      unitIndex++;
      n = Math.floor(n / 10);
    }

    // 处理 11-19 的特殊情况
    if (result.startsWith("一十")) {
      result = result.substring(1);
    }

    return result;
  }

  return convertSection(num);
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
    .sort((a, b) => Number(a.split("-")[0]) - Number(b.split("-")[0]))
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

export const HOST_NAME = "https://lxfljw.cn";
