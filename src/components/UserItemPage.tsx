import {FC} from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { IUser } from '../types/types';
import { redirect, useParams } from 'react-router';

type UserItemPageParams = {
    id: string;
}

const UserItemPage:FC = () => {
    const [user, setUser] = useState<IUser | null>(null)
    const params = useParams<UserItemPageParams>()
  
    useEffect(() => {
      fetchUser()
    })
  
    async function fetchUser() {
      try {
        const response = await axios.get<IUser>('https://jsonplaceholder.typicode.com/users/' + params.id)
        setUser(response.data)
      } catch (e) {
          alert(e)
      }
    }

    return (
        <div>
            <button onClick={() => redirect('/users')}>Back</button>
            <h1>User Info {user?.name}</h1>
            <div>{user?.email}</div>
            <div>{user?.address.city} {user?.address.street} {user?.address.zipcode}</div>
        </div>
    );
};

export default UserItemPage;