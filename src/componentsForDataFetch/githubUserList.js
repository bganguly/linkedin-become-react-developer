import { useState, useEffect } from "react";
import GithubUser from "./githubUser";

const GithubUserList = () => {
  // initialise view with default 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let getData = () => {
    setLoading(true)
    fetch(`https://api.github.com/users`)
    .then((response) => response.json())
    .then(setData)
    .then(() => setLoading (false))
    .catch(setError)
  }

  // useffect is the combination of componentdidmount/willunmount etc
  // and guaranteed to run _after_ render
  useEffect(() => {
    getData()
  },[])

  if (loading) return <h1> Loading.. </h1>
  if (error) return <pre> {JSON.stringify(error,null,2)}</pre>
  if (!data || data.length < 1) return <p> No users </p>

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          <GithubUser user={user}/>
        </li>
      ))
      }
    </ul>
  )

}

export default GithubUserList;