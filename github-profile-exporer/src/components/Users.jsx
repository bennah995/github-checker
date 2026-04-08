import { UserService } from "../api/user.service";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function UserGetter(){
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");

  const {data, isLoading, error} = useQuery({
    queryKey: ['user', username],
    queryFn: () => UserService.getUser(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5
  })

  const {data: repos, isLoading: reposLoading, error: reposError} = useQuery({
    queryKey: ['repos', username],
    queryFn: () => UserService.getUserRepos(username),
    staleTime: 1000 * 60 * 5,
    enabled: !!username
  })

  if(isLoading) return <p>Searching for user...</p>
  if(error) return <p>{error.message}</p>

  if(reposLoading) return <p>Loading repos...</p>
  if(reposError) return<p>{reposError.message}</p>

  return(
    <div>
      <div className="user-Search">
        <input value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p></p>
        <button onClick={() => setUsername(search)}>Search</button>
      </div>
      <p></p>
      <button onClick={() => {setSearch(""); setUsername("");}}>Clear</button>
      
      {/* only runs when there is username is not empty and ony renders when data exists */}
      {data && (
      <div className="user-profile">
        <h2>{data.name}</h2>
        <p>Public repos: {data.public_repos}</p>
      </div>
      )}

      {/* repos display */}
      <h2 style={{color: "green"} }>Repositories: </h2>
      {repos && (
        <div className="user-repos">

          <ol>
            {repos.map((repo) =>(
              <li key={repo.id}>
                <p><strong>{repo.name}</strong></p>
                <p><i>{repo.description}</i></p>
              </li>
            ))}
          </ol>
          
        </div>
      )}
      
    
    
    </div>
  )
}

export default UserGetter;