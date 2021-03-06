/* eslint-disable */
import FrontendLayout from 'src/layouts/FrontendLayout.vue';
import NotFound from 'src/layouts/NotFoundPage.vue';

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// FRONTEND PAGES IMPORT ////////////////////////////////////////

const Home = () =>
  import(/* webpackChunkName: "home" */ 'src/pages/FrontendPages/Home.vue');

const NotFoundPage = () =>
  import(
    /* webpackChunkName: "notfound" */
    'src/layouts/NotFoundPage.vue'
  );

let frontendpages = {
  path: '/',
  component: FrontendLayout,
  children: [
    {
      path: '/',
      name: 'Frontend',
      component: Home,
    },

    {
      path: '/articles',
      name: 'Articles',
      component: () =>
        import(
          /* webpackChunkName: "blogs" */ 'src/pages/FrontendPages/Articles.vue'
        ),
    },
    {
      path: '/privateclasses',
      name: 'PrivateClasses',
      component: () =>
        import(
          /* webpackChunkName: "privateclasses" */ 'src/pages/FrontendPages/PrivateClasses.vue'
        ),
    },
    {
      path: 'courses',
      name: 'Courses',
      component: () =>
        import(
          /* webpackChunkName: "courses" */ 'src/pages/Courses/Courses.vue'
        ),
    },

    {
      path: '/quizzes',
      name: 'Quizzes',
      component: () =>
        import(
          /* webpackChunkName: "quizzes" */ 'src/pages/FrontendPages/Quizzes.vue'
        ),
    },

    {
      path: '/contact',
      name: 'Contact',
      component: () =>
        import(
          /* webpackChunkName: "contact" */ 'src/pages/FrontendPages/Contact.vue'
        ),
    },
    {
      path: '/terms',
      name: 'Terms',
      component: () =>
        import(
          /* webpackChunkName: "terms" */ 'src/pages/FrontendPages/Components/Terms/Terms.vue'
        ),
    },
    {
      path: '/article/:slug',
      name: 'SingleArticlesPage',
      component: () =>
        import(
          /* webpackChunkName: "singleblogpage" */ 'src/pages/FrontendPages/SingleArticlePage.vue'
        ),
    },
    {
      path: '/login',
      name: 'Login',
      component: () =>
        import(/* webpackChunkName: "login" */ 'src/pages/AuthPages/Login.vue'),
    },
    {
      path: '/forgotpassword',
      name: 'Forgot Password',
      component: () =>
        import(
          /* webpackChunkName: "forgotpassword" */ 'src/pages/AuthPages/ForgotPassword.vue'
        ),
    },
    {
      path: '/auth/password/reset/:token',
      name: 'Reset Password',
      component: () =>
        import(
          /* webpackChunkName: "resetpassword" */ 'src/pages/AuthPages/ResetPassword.vue'
        ),
    },
    {
      path: '/register',
      name: 'Register',
      component: () =>
        import(
          /* webpackChunkName: "register" */ 'src/pages/AuthPages/Register.vue'
        ),
    },

    {
      path: '/demo-quiz',
      name: 'demo-quiz',
      component: () =>
        import(
          /* webpackChunkName: "register" */ 'src/pages/AdminSection/ManageQuizzes/demo-quiz.vue'
        ),
    },
    // {
    //   path: '/lock',
    //   name: 'Lock',
    //   component: Lock
    // }
  ],
};

const routes = [
  {
    path: '/home',
    redirect: '/',
  },
  frontendpages,

  {
    path: '/',
    component: FrontendLayout,
    redirect: '/dashboard',
    meta: {
      auth: true,
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */
            'src/pages/Dashboard/Dashboard.vue'
          ),
      },

      {
        path: 'courses/payments/verification',
        name: 'Course Pay Verification',

        component: () =>
          import(
            /* webpackChunkName: "verificationpayments" */
            'src/pages/Courses/VerificationPayments.vue'
          ),
      },

      {
        path: 'managementpage',
        name: 'Management Page',
        component: () =>
          import(
            /* webpackChunkName: "managementpage" */
            'src/pages/AdminSection/ManagementPage/ManagementPage.vue'
          ),
      },

      {
        path: 'courseoverview',
        name: 'CourseOverview',
        component: () =>
          import(
            /* webpackChunkName: "courseoverview" */
            'src/pages/AdminSection/ManageCourses/CourseOverview.vue'
          ),
      },

      {
        path: 'quizoverview',
        name: 'QuizOverview',
        component: () =>
          import(
            /* webpackChunkName: "quizoverview" */
            'src/pages/AdminSection/ManageQuizzes/QuizOverview.vue'
          ),
      },

      {
        path: 'episodeoverview',
        name: 'EpisodeOverview',
        component: () =>
          import(
            /* webpackChunkName: "episodeoverview" */
            'src/pages/AdminSection/ManageEpisodes/EpisodeOverview.vue'
          ),
      },

      {
        path: 'manageusers',
        name: 'Manage Users',
        component: () =>
          import(
            /* webpackChunkName: "manageusers" */
            'src/pages/AdminSection/ManageUsers/ManageUsers.vue'
          ),
      },

      {
        path: 'articleoverview',
        name: 'Articles Overview',
        component: () =>
          import(
            /* webpackChunkName: "articleoverview" */
            'src/pages/AdminSection/ManageArticles/ArticleOverview.vue'
          ),
      },

      {
        path: 'commentoverview',
        name: 'Comment Overview',
        component: () =>
          import(
            /* webpackChunkName: "commentoverview" */
            'src/pages/AdminSection/ManageComments/CommentOverview.vue'
          ),
      },

      {
        path: 'ticketoverview',
        name: 'Ticket Overview',
        component: () =>
          import(
            /* webpackChunkName: "ticketoverview" */
            'src/pages/AdminSection/ManageTickets/TicketOverview.vue'
          ),
      },

      {
        path: 'tickets/view/:ticket',
        name: 'Single Ticket',
        component: () =>
          import(
            /* webpackChunkName: "single ticket" */
            'src/pages/Tickets/SingleTicket.vue'
          ),
      },

      {
        path: 'tickets',
        name: 'All Tickets',
        component: () =>
          import(
            /* webpackChunkName: "alltickets" */ 'src/pages/Tickets/AllTickets.vue'
          ),
      },
      {
        path: 'createticket',
        name: 'Create Tickets',
        component: () =>
          import(
            /* webpackChunkName: "createticket" */ 'src/pages/Tickets/CreateTicket.vue'
          ),
      },
    ],
  },
  {
    path: '/',
    component: FrontendLayout,
    children: [
      {
        path: 'courses/:slug',
        name: 'Single Course Guest',
        component: () =>
          import(
            /* webpackChunkName: "singlelesson" */
            'src/pages/Courses/SingleLesson.vue'
          ),
      },

      {
        path: 'courses/:course/unit-:unit',
        name: 'Single Lesson',
        component: () =>
          import(
            /* webpackChunkName: "singlelesson" */
            'src/pages/Courses/SingleLesson.vue'
          ),
      },
    ],
  },
  {
    path: '/',
    component: NotFound,
    children: [
      {
        path: '*',
        components: {
          default: NotFound,
        },
      },
    ],
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

export default routes;
