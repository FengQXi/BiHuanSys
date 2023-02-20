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
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
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
        }]
    },

    {
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
                meta: { title: '问题处理', icon: 'el-icon-pie-chart' }
            }
        ],
    },

    {
        path: '/templateManage',
        name: 'TemplateManage',
        component: Layout,
        redirect: '/templateManage/templateConfig',
        meta: { title: '模板管理', icon: 'el-icon-menu' },
        children: [
            {
                path: 'templateConfig',
                name: 'TemplateConfig',
                component: () => import('@/views/templateMg/templateConfig'),
                meta: { title: '模板配置', icon: 'el-icon-download' }
            },
            {
                path: 'templateDownload',
                name: 'TemplateDownload',
                component: () => import('@/views/templateMg/templateDownload'),
                meta: { title: '模板下载', icon: 'el-icon-download' }
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
                meta: { title: '部门管理', icon: 'el-icon-s-promotion' }
            }
        ]
    },

    // {
    //     path: '/templateMg',
    //     component: Layout,
    //     redirect: '/templateMg/templateConfig',
    //     meta: { title: '模板管理', icon: 'el-icon-menu' },
    //     children: [
    //         {
    //             path: 'templateConfig',
    //             name: 'TemplateConfig',
    //             component: () => import('@/views/templateMg/templateConfig'),
    //             meta: { title: '模板配置', icon: 'el-icon-download' }
    //         },
    //         {
    //             path: 'fileUpload',
    //             name: 'FileUpload',
    //             component: () => import('@/views/templateMg/fileUpload'),
    //             meta: { title: '文件上传', icon: 'el-icon-cloudy' }
    //         },
    //         {
    //             path: 'problemEntry',
    //             name: 'ProbleEntry',
    //             component: () => import('@/views/templateMg/problemEntry'),
    //             meta: { title: '问题录入', icon: 'el-icon-warning-outline' }
    //         }
    //     ]
    // },


    // {
    //     path: '/mabiaoMg',
    //     component: Layout,
    //     redirect: '/mabiaoMg/editConfig',
    //     meta: { title: '码表管理', icon: 'el-icon-setting' },
    //     children: [
    //         {
    //             path: 'editConfig',
    //             name: 'EditConfig',
    //             component: () => import('@/views/mabiaoMg/editConfig'),
    //             meta: { title: '修改码表配置', icon: 'el-icon-edit-outline' }
    //         },
    //         {
    //             path: 'addConfig',
    //             name: 'AddConfig',
    //             component: () => import('@/views/mabiaoMg/addConfig'),
    //             meta: { title: '添加码表配置', icon: 'el-icon-document-add' }
    //         }
    //     ]
    // },

    // {
    //     path: '/chartMg',
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'ChartManagement',
    //             component: () => import('@/views/chartMg'),
    //             meta: { title: '图表管理', icon: 'el-icon-pie-chart' }
    //         }
    //     ]
    // },

    // {
    //     path: '/sysMg',
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
    //             meta: { title: '部门管理', icon: 'el-icon-s-promotion' }
    //         }
    //     ]
    // },

    // 配置样例，以后删除
    // {
    //     path: '/nested',
    //     component: Layout,
    //     redirect: '/nested/menu1',
    //     name: 'Nested',
    //     meta: {
    //         title: 'Nested',
    //         icon: 'nested'
    //     },
    //     children: [
    //         {
    //             path: 'menu1',
    //             component: () => import('@/views/nested/menu1/index'), // Parent router-view
    //             name: 'Menu1',
    //             meta: { title: 'Menu1' },
    //             children: [
    //                 {
    //                     path: 'menu1-1',
    //                     component: () => import('@/views/nested/menu1/menu1-1'),
    //                     name: 'Menu1-1',
    //                     meta: { title: 'Menu1-1' }
    //                 },
    //                 {
    //                     path: 'menu1-2',
    //                     component: () => import('@/views/nested/menu1/menu1-2'),
    //                     name: 'Menu1-2',
    //                     meta: { title: 'Menu1-2' },
    //                     children: [
    //                         {
    //                             path: 'menu1-2-1',
    //                             component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
    //                             name: 'Menu1-2-1',
    //                             meta: { title: 'Menu1-2-1' }
    //                         },
    //                         {
    //                             path: 'menu1-2-2',
    //                             component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
    //                             name: 'Menu1-2-2',
    //                             meta: { title: 'Menu1-2-2' }
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     path: 'menu1-3',
    //                     component: () => import('@/views/nested/menu1/menu1-3'),
    //                     name: 'Menu1-3',
    //                     meta: { title: 'Menu1-3' }
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'menu2',
    //             component: () => import('@/views/nested/menu2/index'),
    //             name: 'Menu2',
    //             meta: { title: 'menu2' }
    //         }
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
    { path: '*', redirect: '/404', hidden: true }
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
