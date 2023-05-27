import Main from "../components/main"
import Navbar from "../components/navbar"


export const getStaticProps = async () => {
  let response = await fetch("http://localhost:3000/api/getUsers");
  let userDb = await response.json();
  let userList = [];
  for(let i = 0; i < userDb.length; i++) {
      userList.push(userDb[i].email);
  }
  return { props: { userList } };
};

export default function Home({userList}) {
  return (
    <>
        <Main users={userList}/>
    </>
  )
}
