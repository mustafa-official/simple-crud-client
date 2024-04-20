import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUser] = useState(loadedUsers);
  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("Delete successfully");
          const remaining = users.filter((user) => user._id !== id);
          setUser(remaining);
        } else {
          alert("Can't Delete");
        }
      });
  };
  return (
    <div>
      <h3>User: {users.length}</h3>
      {users.map((user, idx) => (
        <p key={user._id}>
          {idx + 1}. {user.name} Email: {user.email}
          <Link to={`/update/${user._id}`}><button>Update</button></Link>
          <button onClick={() => handleDelete(user._id)}>X</button>
        </p>
      ))}
    </div>
  );
};

export default Users;
