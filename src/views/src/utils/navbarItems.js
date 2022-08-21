const getNavbarItems = () => {
    return ([{name: "Agencies", path: '/agencies', access: "all", align: "left"},
                    {name: "Stories", path: '/blogs', access: "all", align: "left"},
                    {name: "Volunteer", path: '/volunteer', access: "all", align: "left"},
                    {name: "About Us", path: '/about', access: "all", align: "left"},
                    {name: "Login", path: '/login', access: "public", align: "right"},
                    {name: "Register", path: "/register", access: "public", align: "right"},
                    {name: "My Account", path: "/user", access: "private", align: "right"}]);
}
export default getNavbarItems;