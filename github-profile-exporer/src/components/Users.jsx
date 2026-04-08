import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { UserService } from "../api/user.service";
import { useState } from "react";

function UserGetter(){
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  // const [data, isLoading, error] = useQuery({
  //   queryKey: ['user', username],
  //   queryFn: () => UserService.getUser(username),
  //   staleTime: 1000 * 60 * 5,
  //   enabled: !!username
  // })

  const { data, isLoading, error } = useQuery({
    queryKey: ['user', username],
    queryFn: () => UserService.getUser(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5
  })


  if(isLoading) return <p>Searching for user...</p>
  if(error) return <p>{error.message}</p>

  return(
    <div>
      <div className="user-Search">
        <input value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setUsername(search)}>Search</button>
      </div>
      
      {/* only runs when there is username is not empty and ony renders when data exists */}
      {data && (
      <div className="user-profile">
        <h2>{data.name}</h2>
        <p>Public repos: {data.public_repos}</p>
      </div>
      )}
      
    
    
    </div>
  )
}

export default UserGetter;