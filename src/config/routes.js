import UserLayout from "@/layouts/UserLayout";
import BasicLayout from "@/layouts/BasicLayout";

import UserLogin from "@/pages/UserLogin";

import OrderList from "@/pages/OrderList";
import Membership from "@/pages/Membership";

import AddMovies from "@/pages/AddMovies";
import NotFound from "@/pages/NotFound";
import Movies from "@/pages/Movies";

import AddCategories from "@/pages/AddCategories";
import Categories from "@/pages/Categories";

import AddNews from "@/pages/AddNews";
import News from "@/pages/News";

import AddScenes from "@/pages/AddScenes";
import Scenes from "@/pages/Scenes";

const routerConfig = [
  {
    path: "/user",
    component: UserLayout,
    children: [
      { path: "/login", component: UserLogin },
      { path: "/", redirect: "/user/login" },
      { component: NotFound }
    ]
  },
  {
    path: "/",
    component: BasicLayout,
    children: [
      { path: "/movies", component: Movies },
      { path: "/add/movies", component: AddMovies },
      { path: "/categories", component: Categories },
      { path: "/add/categories", component: AddCategories },
      { path: "/news", component: News },
      { path: "/add/news", component: AddNews },
      { path: "/scenes", component: Scenes },
      { path: "/add/scenes", component: AddScenes },
      { path: "/order", component: OrderList },
      { path: "/membership", component: Membership },
      { component: NotFound }
    ]
  }
];

export default routerConfig;
