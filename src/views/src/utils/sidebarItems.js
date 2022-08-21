const getSidebarItems= () => {
    return(
        [
            {name: "FAQs", path: "/faqs", access: "all", type: "other", user: ["admin", "client", "consultant", "manager"]},
            {name: "Contact Us", path: "/contact", access: "all", type: "other", user: ["client", "consultant", "manager"]},
            {name: "Dashboard", path: "/user/dashboard", access: "private", type: "personal", user: ["admin", "client", "consultant", "manager"]},
            {name: "My Blogs", path: "/user/myblogs", access: "private", type: "personal", user: ["admin", "client", "consultant", "manager"]},
            {name: "Donate", path: "/donate", access: "private", type: "business", user: ["client",]},
            {name: "Orphans", path: "/orphans", access: "private", type: "business", user: ["admin", "consultant", "manager"]},
            {name: "Adopt", path: "/adopt", access: "private", type: "business", user: ["client"]},
            {name: "Statistics", path: "/stats", access: "private", type: "business", user: ["client"]},
            {name: "Transactions", path: "/transactions", access: "private", type: "business", user: ["admin", "manager"]},
            {name: "Proceedings", path: "/proceedings", access: "private", type: "business", user: ["admin", "consultant", "manager"]},
            {name: "My Organization", path: "/meorganization", access: "private", type: "business", user: ["consultant", "manager"]},
            {name: "Events", path: "/volunteeringEvents", access: "private", type: "business", user: ["admin", "manager", "client"]},
            {name: "Managers", path: "/managers", access: "private", type: "business", user: ["admin"]},
            {name: "Organizations", path: "/organizations", access: "private", type: "business", user: ["admin"]},
            {name: "Consultants", path: "/consultants", access: "private", type: "business", user: ["admin", "manager"]},
            {name: "Clients", path: "/clients", access: "private", type: "business", user: ["admin", "manager", "consultant"]},
        ]
    );
};

export default getSidebarItems;