import pool from "../config/connectDB";
import bcrypt from "bcryptjs";

let modelGetAllUser = async () => {
    let [rows, fields] = await pool.query("SELECT * FROM users");
    // trả về kết quả
    return rows;
};

let modelCreateNewUser = async (username, password, fullname, address) => {
    let checkUsername = await getUsername(username);
    if (checkUsername.length > 0) {
        return false;
    }
    let hashPassword = await modelHashPassword(password);
    return await pool.query(
        "INSERT INTO users (username, password, fullname, address) VALUES (?, ?, ?, ?)",
        [username, hashPassword, fullname, address]
    );
};

let getUsername = async (username) => {
    let [rows, fields] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );
    return rows; // Trả về toàn bộ hàng
};

let salt = bcrypt.genSaltSync(10);
let modelHashPassword = async (password) => {
    return await bcrypt.hashSync(password, salt);
};

let modelDeleteUserById = async (id) => {
    return await pool.query("DELETE FROM users WHERE id = ?", [id]);
};

let modelGetUserById = async (id) => {
    let [rows, fields] = await pool.query("SELECT * FROM users WHERE id = ?", [
        id,
    ]);
    return rows[0];
};

let modelUpdateUserById = async (id, fullname, address) => {
    return await pool.query(
        "UPDATE users SET fullname = ?, address = ? WHERE id = ?",
        [fullname, address, id]
    );
};

let modelHandleLogin = async (username, password) => {
    let users = await getUsername(username); // users là một mảng
    if (users.length > 0) {
        let user = users[0]; // Lấy đối tượng người dùng đầu tiên
        let checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
            delete user.password; // Xóa mật khẩu trước khi trả về
            return user; // Trả về thông tin người dùng
        } else {
            return { error: "wrong_password" }; // Trả về thông báo sai mật khẩu
        }
    } else {
        return { error: "user_not_found" }; // Trả về thông báo không có tài khoản
    }
};

export default {
    modelGetAllUser,
    modelCreateNewUser,
    modelDeleteUserById,
    modelGetUserById,
    modelUpdateUserById,
    modelHandleLogin,
};
