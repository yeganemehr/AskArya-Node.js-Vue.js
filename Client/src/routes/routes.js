/* eslint-disable prettier/prettier */
import DashboardLayout from 'src/pages/Layouts/Dashboard/DashboardLayout.vue';
import AuthLayout from 'src/pages/Layouts/Auth/AuthLayout.vue';
// Frontend Layout
import FrontendLayout from 'src/pages/Layouts/Frontend/FrontendLayout.vue';
// GeneralViews
import NotFound from 'src/pages/Layouts/NotFound/NotFoundPage.vue';

//////////////////////////////////////////////////////////////////////
///////////////////////////// MY PAGES ///////////////////////////////

const Dashboard = () =>
  import( /* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Dashboard.vue');

const Courses = () =>
  import( /* webpackChunkName: "extra" */ 'src/pages/Courses/Courses.vue');

const SingleLesson = () =>
  import( /* webpackChunkName: "extra" */ 'src/pages/SingleLesson/SingleLesson.vue');

const Quiz = () =>
  import( /* webpackChunkName: "extra" */ 'src/pages/Quiz/Quiz.vue');

const CourseOverview = () =>
  import( /* webpackChunkName: "extra" */ 'src/pages/Admin/CourseOverview.vue');

const Xp = () =>
  import( /* webpackChunkName: "extra" */ 'src/pages/Xp/Xp.vue');

const EpisodeOverview = () =>
  import( /* webpackChunkName: "extra" */ 'src/pages/Admin/EpisodeOverview.vue');

const EditCourse = () =>
  import( /* webpackChunkName: "extra" */ 'src/pages/Admin/EditCourse.vue');

const CreateCourse = () =>
  import( /* webpackChunkName: "extra" */ 'src/pages/Admin/CreateCourse.vue');

const EditEpisode = () =>
  import( /* webpackChunkName: "extra" */ 'src/pages/Admin/EditEpisode.vue');

const CreateEpisode = () =>
  import( /* webpackChunkName: "extra" */ 'src/pages/Admin/CreateEpisode.vue');

const CreateQuiz = () =>
  import( /* webpackChunkName: "extra" */ 'src/pages/Admin/CreateQuiz.vue');

const ManageUsers = () =>
  import( /* webpackChunkName: "extra" */ 'src/pages/Admin/ManageUsers.vue');

//////////////////////////////////////////////////////////////////////
///////////////////////////// FRONTEND PAGES /////////////////////////

const Home = () =>
  import( /* webpackChunkName: "pages" */ 'src/pages/FrontendPages/Home.vue');

const PrivateClasses = () =>
  import( /* webpackChunkName: "pages" */ 'src/pages/FrontendPages/PrivateClasses.vue');

const Meetups = () =>
  import( /* webpackChunkName: "pages" */ 'src/pages/FrontendPages/Meetups.vue');

const Contact = () =>
  import( /* webpackChunkName: "pages" */ 'src/pages/FrontendPages/Contact.vue');

const BlogPost = () =>
  import( /* webpackChunkName: "pages" */ 'src/pages/FrontendPages/Components/Blog/BlogPost/BlogPost.vue');

//////////////////////////////////////////////////////////////////////
////////////////////////////////  PAGES //////////////////////////////

const Login = () =>
  import( /* webpackChunkName: "pages" */ 'src/pages/Login/Login.vue');

const Register = () =>
  import( /* webpackChunkName: "pages" */ 'src/pages/Register/Register.vue');

const Lock = () =>
  import( /* webpackChunkName: "pages" */ 'src/pages/Layouts/Lock/Lock.vue');

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

let frontendpages = {
  path: '/',
  component: FrontendLayout,
  name: 'Frontend',
  children: [{
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/privateclasses',
      name: 'PrivateClasses',
      component: PrivateClasses
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    ,
    {
      path: '/blogpagesample',
      name: 'BlogPageSample',
      component: BlogPageSample
    }
  ]
};


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


let authPages = {
  path: '/',
  component: AuthLayout,
  name: 'Authentication',
  children: [{
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/lock',
      name: 'Lock',
      component: Lock
    }
  ]
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

const routes = [{
    path: '/',
    redirect: '/home',
    name: 'Home'
  },
  frontendpages,
  authPages,

  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
        path: 'dashboard',
        name: 'Dashboard',
        components: {
          default: Dashboard
        }
      },
      {
        path: 'courses',
        name: 'Courses',
        components: {
          default: Courses
        }
      },
      {
        path: 'singlelesson',
        name: 'Single Lesson',
        components: {
          default: SingleLesson
        }
      },
      {
        path: 'quiz',
        name: 'Quiz',
        components: {
          default: Quiz
        }
      },
      {
        path: 'courseoverview',
        name: 'CourseOverview',
        components: {
          default: CourseOverview
        }
      },
      {
        path: 'episodeoverview',
        name: 'EpisodeOverview',
        components: {
          default: EpisodeOverview
        }
      },
      {
        path: 'createcourse',
        name: 'Create Course',
        components: {
          default: CreateCourse
        }
      },
      {
        path: 'editcourse',
        name: 'Edit Course',
        components: {
          default: EditCourse
        }
      },
      {
        path: 'createepisode',
        name: 'Create Episode',
        components: {
          default: CreateEpisode
        }
      },
      {
        path: 'editepisode',
        name: 'Edit Episode',
        components: {
          default: EditEpisode
        }
      },
      {
        path: 'createquiz',
        name: 'Create Quiz',
        components: {
          default: CreateQuiz
        }
      },
      {
        path: 'xp',
        name: 'Xp',
        components: {
          default: Xp
        }
      },
      {
        path: 'manageusers',
        name: 'Manage Users',
        components: {
          default: ManageUsers
        }
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
