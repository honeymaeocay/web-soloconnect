import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import { isAuthenticated } from '@/utils/supabase' // add getuserinformation if needed
import ForbiddenView from '@/views/errors/ForbiddenView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Auth Pages
    {
      path: '/',
      name: 'home'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },

    // System Pages
    {
    path: '/system/dashboard',
    name: 'dashboard',
    component: DashboardView,
    },

    // Error Pages
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView,
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFoundView,
    }
  ],
})

router.beforeEach(async (to) => {
  const isLoggedIn = await isAuthenticated()
  // const userMetadata = await getUserInformation()

  // const isAdmin = userMetadata.is_admin === 'true'

  //Redirect to appropriate page if accessing home route
  if (to.name === 'home') {
    return isLoggedIn ? { name: 'dashboard' } : { name: "login" }
  }

  //Check if the user is logged in
  if (isLoggedIn && (to.name === 'login' || to.name === 'register')){
    //redict the user to the dashboard page
    return { name: 'dashboard'}
  }

  // // Check if the user is logged in and not admin
  // if (isLoggedIn && !isAdmin) {
  //   // Check if the user is going to forbidden pages
  //   if (to.name.startsWith('system/users')) {
  //     return { name: 'forbidden'}
  //   }
  // }

  // If not logged in and going to system pages
  if (!isLoggedIn && to.path.startsWith('/system/dashboard')) {
    //redirect the user to the login page
    return { name: 'login'}
  }
  // Redirect to 404 not found if the route does not exist
  if (router.resolve(to).matched.length === 0){
    return { name: 'not-found'}
  }
})
export default router
