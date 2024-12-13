import userModel from "../services/UserModel";

let controllerGetAllUser = async (req, res) => {
    let users = await userModel.modelGetAllUser();
    res.render("listUser", {
        data: { title: "List User", page: "listUser", users: users },
    });
};

let controllerCreateNewUser = async (req, res) => {
    let { username, password, fullname, address } = req.body;
    let created = await userModel.modelCreateNewUser(
        username,
        password,
        fullname,
        address
    );
    if (!created) {
        // Nếu không tạo thành công (username đã tồn tại), render lại trang và gửi thông báo
        return res.render("createUser", {
            errorMessage: "Username đã có sẵn.",
            title: "Create User",
        });
    }
    // Nếu tạo thành công, chuyển hướng đến danh sách người dùng
    res.redirect("/list-user");
};

let controllerDeleteUserById = async (req, res) => {
    let { userId } = req.body;
    await userModel.modelDeleteUserById(userId);
    res.redirect("/list-user");
};

let controllerEditUserById = async (req, res) => {
    let { id } = req.params;
    let dataUser = await userModel.modelGetUserById(id);
    res.render("editUser", {
        data: { title: "Edit User", page: "editUser", user: dataUser },
    });
};

let controllerUpdateUserById = async (req, res) => {
    let { id, fullname, address } = req.body;
    await userModel.modelUpdateUserById(id, fullname, address);
    res.redirect("/list-user");
};

let controllerHandleLogin = async (req, res) => {
    let { username, password } = req.body;
    try {
        // Gọi model để kiểm tra thông tin đăng nhập
        let result = await userModel.modelHandleLogin(username, password);
        if (result.error) {
            if (result.error === "wrong_password") {
                return res.render("Auth/login", {
                    title: "Login",
                    errorMessage: "Mật khẩu không chính xác.",
                    username: username, // Giữ lại username
                });
            } else if (result.error === "user_not_found") {
                return res.render("Auth/login", {
                    title: "Login",
                    errorMessage: "Tài khoản không tồn tại.",
                    username: username, // Giữ lại username
                });
            }
        }

        // Nếu đăng nhập thành công, lưu thông tin người dùng vào session
        // req.session.userId = result.id; // Giả sử bạn lưu ID của người dùng

        // Chuyển hướng đến trang chính hoặc trang người dùng
        res.redirect("/list-user"); // Thay đổi đường dẫn tùy ý
    } catch (error) {
        console.error(error);
        res.render("Auth/login", {
            title: "Login",
            errorMessage: "Đã xảy ra lỗi, vui lòng thử lại.",
        });
    }
};

export default {
    controllerGetAllUser,
    controllerCreateNewUser,
    controllerDeleteUserById,
    controllerEditUserById,
    controllerUpdateUserById,
    controllerHandleLogin,
};
