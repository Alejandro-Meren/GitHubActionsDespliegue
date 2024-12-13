import { usersRepo } from "helpers/users-repo";

export default handler;

function handler(req, res) {
  switch (req.method) {
    case "GET0":
      return getUsers();
    case "POST0":
      return createUser();
    case "DELETE0":
      return deleteAllUsers();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getUsers() {
    const users = usersRepo.getAll();
    return res.status(200).json(users);
  }

  function createUser() {
    try {
      usersRepo.create(req.body);
      const newUserName = req.body.name;
      return res.status(200).json({ greeting: `Hello ${newUserName}` });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  function deleteAllUsers() {
    usersRepo.deleteAllUsers();
    return res.status(200).json({ message: "All users deleted" });
  }
}
