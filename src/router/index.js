import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
let routes = [
    {
        path: '/login',
        component: () => import('../views/login/index.vue')
    }, {
        path: '/content',
        component: () => import('../views/layout/index.vue'),
        children: []
    }
];
const menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
menuList.forEach(menu => {
    routes[1].children.push({
        path: menu.routerPath,
        name: menu.name,
        component: () => import(`../views${menu.routerPath}/index.vue`),
    });
    menu.subMenus && menu.subMenus.forEach(sub => {
        routes[1].children.push({
            path: sub.routerPath,
            name: sub.name,
            component: () => import(`../views${sub.routerPath}/index.vue`),
        });
        sub.subMenus && sub.subMenus.forEach(item => {
            routes[1].children.push({
                path: item.routerPath,
                name: item.name,
                component: () => import(`../views${item.routerPath}/index.vue`),
            })
        })
    })
})
// 根目录重定向菜单中首个目录
routes.push({
    path: '/',
    redirect: '/home'
});

const router = new Router({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    /*{
        let tk = null;
        location.search.replace(/\?/, '').split("&").forEach(item => {
            if (item.includes("tk=")) {
                if (item.split("tk=")[1]) {
                    tk = item.split("tk=")[1]
                }
            }
        });
        if (tk) {
            sessionStorage.setItem('tk', tk);
        } else {
            tk = sessionStorage.getItem('tk');
        }
        if (tk) {
            next()
        } else {
            location.href = "http://10.239.3.3:6880/sso/?clienturl=http://172.21.230.131"
        }
    }*/
    {
        let ssoToken = null;
        location.search.replace(/\?/, '').split("&").forEach(item => {
            if (item.includes("token=")) {
                if (item.split("token=")[1]) {
                    ssoToken = item.split("token=")[1]
                }
            }
        });
        if (ssoToken) {
            sessionStorage.setItem('ssoToken', ssoToken);
        } else {
            ssoToken = sessionStorage.getItem('ssoToken');
        }
        if (ssoToken) {
            next()
        } else {
            location.href = "http://172.20.115.241:9528/#/login?clientId=metadata"
        }
    }
});
export default router
