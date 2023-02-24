import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true,
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true,
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }],
    },

    // {
    //     path: '/searchProblem',
    //     name: 'SearchManagement',
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'SearchManagement',
    //             component: () => import('@/views/searchProblem'),
    //             meta: { title: '问题查询', icon: 'el-icon-search' }
    //         },
    //     ]
    // },

    // {
    //     path: '/problemEntry',
    //     name: 'ProblemEntry',
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'ProblemEntry',
    //             component: () => import('@/views/problemEntry'),
    //             meta: { title: '问题录入', icon: 'el-icon-warning-outline' }
    //         },
    //     ],
    // },

    // {
    //     path: '/problemSolve',
    //     name: 'ProblemSolve',
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'ProblemSolve',
    //             component: () => import('@/views/problemSolve'),
    //             meta: { title: '问题处理', icon: 'el-icon-edit' }
    //         },
    //     ],
    // },

    // {
    //     path: '/templateManage',
    //     name: 'TemplateManage',
    //     component: Layout,
    //     meta: { title: '模板管理', icon: 'el-icon-menu' },
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'TemplateManage',
    //             component: () => import('@/views/templateMg'),
    //             meta: { title: '模板管理', icon: 'el-icon-menu' },
    //         },
    //     ]
    // },

    // {
    //     path: '/sysMg',
    //     name: 'SysManage',
    //     component: Layout,
    //     redirect: '/sysMg/editConfig',
    //     meta: { title: '系统管理', icon: 'el-icon-cpu' },
    //     children: [
    //         {
    //             path: 'userMg',
    //             name: 'UserManagement',
    //             component: () => import('@/views/sysMg/userMg'),
    //             meta: { title: '用户管理', icon: 'el-icon-user' }
    //         },
    //         {
    //             path: 'roleMg',
    //             name: 'RoleManagement',
    //             component: () => import('@/views/sysMg/roleMg'),
    //             meta: { title: '角色管理', icon: 'el-icon-star-off' }
    //         },
    //         {
    //             path: 'partMg',
    //             name: 'DepartmentManagement',
    //             component: () => import('@/views/sysMg/partMg'),
    //             meta: { title: '部门管理', icon: 'el-icon-office-building' }
    //         },
    //     ]
    // },
    //   {
    //     path: 'external-link',
    //     component: Layout,
    //     children: [
    //       {
    //         path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
    //         meta: { title: 'External Link', icon: 'link' }
    //       }
    //     ]
    //   },

    // 404 page must be placed at the end !!!
    // { path: '*', redirect: '/404', hidden: true }
]

// 异步路由 通过角色筛选
export const asyncRoutes = [{
        path: '/searchProblem',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'SearchManagement',
                component: () => import('@/views/searchProblem'),
                meta: { title: '问题查询', icon: 'el-icon-search' }
            }
        ]
    },
    {
        path: '/problemEntry',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'ProblemEntry',
                component: () => import('@/views/problemEntry'),
                meta: { title: '问题录入', icon: 'el-icon-warning-outline' }
            }
        ],
    },
    {
        path: '/problemSolve',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'ProblemSolve',
                component: () => import('@/views/problemSolve'),
                meta: { title: '问题处理', icon: 'el-icon-edit' }
            }
        ],
    },
    {
        path: '/templateManage',
        component: Layout,
        meta: { title: '模板管理', icon: 'el-icon-menu' },
        children: [
            {
                path: 'index',
                name: 'TemplateManage',
                component: () => import('@/views/templateMg'),
                meta: { title: '模板管理', icon: 'el-icon-menu' },
            }
        ]
    },
    {
        path: '/sysMg',
        name: 'SysManage',
        component: Layout,
        redirect: '/sysMg/editConfig',
        meta: { title: '系统管理', icon: 'el-icon-cpu' },
        children: [
            {
                path: 'userMg',
                name: 'UserManagement',
                component: () => import('@/views/sysMg/userMg'),
                meta: { title: '用户管理', icon: 'el-icon-user' }
            },
            {
                path: 'roleMg',
                name: 'RoleManagement',
                component: () => import('@/views/sysMg/roleMg'),
                meta: { title: '角色管理', icon: 'el-icon-star-off' }
            },
            {
                path: 'partMg',
                name: 'DepartmentManagement',
                component: () => import('@/views/sysMg/partMg'),
                meta: { title: '部门管理', icon: 'el-icon-office-building' }
            },
        ]
}]

export const getAsyncRoutes = () => {
    return asyncRoutes
}
// 任意路由
export const anyRoutes = [
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
