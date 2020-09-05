import UserUpdate from "../../components/CRUD/UserUpdate";
import Private from "../../components/Auth/Private";
export default function Update() {
  return (
    <React.Fragment>
      <Private>
        <UserUpdate />
      </Private>
    </React.Fragment>
  );
}
