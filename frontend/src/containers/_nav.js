const _nav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Calendario"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Calendario",
    to: "/calendar",
    icon: "cil-calendar",
    permission: ["admin", "teacher", "headofarea", "committee"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Estadisticas de actividades",
    to: "/statistics",
    icon: "cil-chart-pie",
    permission: ["admin"],
  },
  /*{
    _tag: 'CSidebarNavDropdown',
    name: 'Base',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      }
    ],
  }*/
  {
    _tag: "CSidebarNavTitle",
    _children: ["Herramientas"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Centro de Mensajes",
    to: "/message",
    icon: "cil-inbox",
    permission: ["admin", "teacher", "headofarea", "committee"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Calendarios públicos",
    to: "/shared",
    icon: "cil-share-boxed",
    permission: ["admin", "headofarea", "committee"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Subir evidencia",
    to: "/evidenceUpload",
    icon: "cil-chevron-top",
    permission: ["admin", "headofarea", "committee"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "CRUD de usuarios",
    to: "/users",
    icon: "cil-user",
    permission: ["admin"],
  },
];

export default _nav;
