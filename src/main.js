const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const $logo = $siteList.find(".logo");
const xObject = JSON.parse(x);
function randomRgbColor() {
  //随机生成RGB颜色
  let r = Math.floor(Math.random() * 192);
  let g = Math.floor(Math.random() * 192);
  let b = Math.floor(Math.random() * 192);
  return `rgb(${r},${g},${b})`;
}

const simplifyUrl = (url) => {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(".com", "")
    .replace(".cn", "")
    .replace(".net", "")
    .replace(/\/.*/, "");
};
let hashMap = xObject || [
  {
    logo: "A",
    url: "https://www.acfun.cn",
    background: "rgb(177,12,75)",
  },
  {
    logo: "B",
    url: "https://www.bilibili.com",
    background: "rgb(74,57,140)",
  },
];
let render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(
      `<li>
        <div class="site">
          <div class="logo" style="background: ${node.background};">
          ${node.logo}
          </div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
          </div>
        </div>
    </li>`
    ).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();
$(".add").on("click", () => {
  let url = window.prompt("请问你要添加的网址是：");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
    background: randomRgbColor(),
  });

  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  window.localStorage.setItem("x", string);
};
$(document).on("keypress", (e) => {
  const keyBoard = e.key;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === keyBoard) {
      window.open(hashMap[i].url);
    }
  }
});
