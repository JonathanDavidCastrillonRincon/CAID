import React from "react";

//const Login = React.lazy(() => import('./views/pages/login/Login'));
const Calendar = React.lazy(() =>
  import("./views/viewsUsers/calendar/Calendar")
);
const SharedCalendar = React.lazy(() =>
  import("./views/viewsUsers/sharedCalendar/SharedCalendar")
);
const SendMessage = React.lazy(() =>
  import("./views/viewsUsers/sendMessage/MessageCenter")
);
const Statistics = React.lazy(() =>
  import("./views/viewsUsers/statisticsActivities/Statistics")
);
const EvidenceUpload = React.lazy(() =>
  import("./views/viewsUsers/evidence/EvidenceUpload")
);
const EvidenceSee = React.lazy(() =>
  import("./views/viewsUsers/evidence/EvidenceSee")
);
const Users = React.lazy(() => import("./views/viewsUsers/users/Users"));
const CreateEditUser = React.lazy(() =>
  import("./views/viewsUsers/users/CreateEditUser")
);
const Profile = React.lazy(() => import("./views/viewsUsers/users/Profile"));

const routes = [
  { path: "/calendar", name: "Calendario", component: Calendar },
  { path: "/shared", name: "Calendarios Públicos", component: SharedCalendar },
  { path: "/message", name: "Centro de Mensajes", component: SendMessage },
  {
    path: "/statistics",
    name: "Estadisticas de actividades",
    component: Statistics,
  },
  {
    path: "/evidenceUpload",
    name: "Subir evidencia de actividades",
    component: EvidenceUpload,
    exact: true,
  },
  {
    path: "/evidenceCheck/evidenceSee",
    name: "Ver evidencia de actividades",
    component: EvidenceSee,
  },
  {
    path: "/evidenceUpload/evidenceSee/:id",
    name: "Ver evidencia de actividades",
    component: EvidenceSee,
  },
  { path: "/users", name: "Usuarios", component: Users, exact: true },
  {
    path: "/users/createUser",
    name: "Crear usuario",
    component: CreateEditUser,
  },
  {
    path: "/users/editUser/:id",
    name: "Editar usuario",
    component: CreateEditUser,
  },
  { path: "/profile", name: "Perfil de usuario", component: Profile },
];

export default routes;
