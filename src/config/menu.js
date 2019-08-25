// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  { name: "退出", path: "/user/login", icon: "yonghu", id: "Menu_8t9s4" }
];

const asideMenuConfig = [
  { name: "电影管理", path: "/movies", icon: "menu", id: "Menu_yft2m" },
  { name: "类别管理", path: "/categories", icon: "menu", id: "Menu_8sqd1" },
  { name: "资讯管理", path: "/news", icon: "menu", id: "Menu_yff2m" },
  { name: "场次管理", path: "/scenes", icon: "menu", id: "Menu_ygf2m" },

  //   { name: "添加电影", path: "/add/movies", icon: "publish", id: "Menu_8sqr1" },
  //   {
  //     name: "添加类别",
  //     path: "/add/categories",
  //     icon: "publish",
  //     id: "Menu_8sqx1"
  //   },
  //   { name: "添加资讯", path: "/add/news", icon: "publish", id: "Menu_6dqd1" },
  //   { name: "添加场次", path: "/add/scenes", icon: "publish", id: "Menu_6dyd1" },

  { name: "订单管理", path: "/order", icon: "shopcar", id: "Menu_1npui" },
  { name: "用户管理", path: "/membership", icon: "menu", id: "Menu_6etxk" }
];

export { headerMenuConfig, asideMenuConfig };
