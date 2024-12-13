import { usersRepo } from "helpers/users-repo";

export default handler;

function handler(req, res) {
  switch (req.method) {
    case "GET0":
      return getUserById();
    case "PUT0":
      return updateUser();
    case "DELETE0":
      return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getUserById() {
    const user = usersRepo.getById(req.query.id);
    return res.status(200).json(user);
  }

  function updateUser() {
    try {
      usersRepo.update(req.query.id, req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  function deleteUser() {
    usersRepo.delete(req.query.id);
    return res.status(200).json({});
  }
}
