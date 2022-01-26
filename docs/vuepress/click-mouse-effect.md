# 鼠标特效

1. 在 `.vuepress/public/` 目录下创建 scripts 目录
2. 在 `.vuepress/public/scripts/` 目录下创建 click-mouse-effect.js 脚本

```js
var a_idx = 0;

function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
jQuery(document).ready(function ($) {
  $("body").click(function (e) {
    var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信",
      "友善");
    var $i = $("<span/>").text(a[a_idx]);
    a_idx = (a_idx + 1) % a.length;
    var x = e.pageX,
      y = e.pageY;
    $i.css({
      "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
      "top": y - 20,
      "left": x,
      "position": "absolute",
      "font-weight": "bold",
      "color": `rgb(${getRandom(255,0)},${getRandom(255,0)},${getRandom(255,0)})`,
      "user-select": 'none',
      "cursor": 'default'
    });
    $("body").append($i);
    $i.animate({
        "top": y - 180,
        "opacity": 0
      },
      1500,
      function () {
        $i.remove();
      });
  });
});
```

3. 修改 `.vuepress/config.js` 引入 jQuery 和 `click-mouse-effect.js`

```js
{
  head: [
    ['script', {
      src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js',
    }], // 引入 jQuery
    ['script', {
      src: '/scripts/click-mouse-effect.js',
    }], // 引入 click-mouse-effect.js
  ],
}
```
