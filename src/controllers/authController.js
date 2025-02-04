const users = [
  { username: "testUser", password: "test123" },
  { username: "admin", password: "admin123" },
];

const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

const changePassword = (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  const userIndex = users.findIndex(
    (u) => u.username === username && u.password === oldPassword
  );

  if (userIndex >= 0) {
    users[userIndex].password = newPassword;
    res.status(200).json({ message: "Password changed successfully" });
  } else {
    res.status(400).json({ message: "Invalid username or old password" });
  }
};

module.exports = { login, changePassword };
