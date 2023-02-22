const a = [{
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
            meta: { title: '问题处理', icon: 'el-icon-edit' }
        }
    ],
},

{
    path: '/templateManage',
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'TemplateManage',
            component: () => import('@/views/templateMg/templateDownload'),
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
        }
    ]
},]