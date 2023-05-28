import Main from "../components/main"

import useSWR from 'swr';

export default function Home() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, _ } = useSWR('/api/getUsers', fetcher);

  let userDb = data;
  let userList = [];

  if(userDb != undefined) {
    for(let i = 0; i < userDb.length; i++) {
      userList.push(userDb[i].email);
    }
  }
  return (
    <>
        <Main users={userList}/>
    </>
  )
}
