let getHomePage = (req, res) => {
    return res.render("home", {
        data: { title: "Home page", page: "main" },
    });
};

let getAboutPage = (req, res) => {
    return res.render("about", {
        data: { title: "About page", page: "about" },
    });
};

export default { getHomePage, getAboutPage };
