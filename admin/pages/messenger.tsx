import React, { useState } from 'react';
import { useMessanger } from '../lib/hooks/messenger';
import { PageContainer } from '@keystone-6/core/admin-ui/components';
import { Button } from '@keystone-ui/button';
import { useKeystone } from '@keystone-6/core/admin-ui/context';
import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo';
import { AuthenticatedItem } from '@keystone-6/core/types';

const getAuthenticatedItem = (authenticatedItem: AuthenticatedItem) => {
  if (authenticatedItem && authenticatedItem.state === "authenticated") {
    return authenticatedItem.id
  }

  return "";
}

const getUsers = () => {
  return useQuery(gql`
    query users {
      users {
        id
        name
        email
      }
    }
  `)
}

export default function Messenger() {
  const [message, setMessage] = useState<string>();
  const [user, setUser] = useState<string | undefined>(undefined);
  const keystone = useKeystone();
  const [messages, sendMessage, loadMore] = useMessanger(getAuthenticatedItem(keystone.authenticatedItem));

  const { data: usersData, loading } = getUsers();

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  }

  const onSend = () => {
    if (user && message) {
      sendMessage(user, message)
    }
  }

  const onSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value);
  }

  const styles = {
    messages: {
      listStyleType: "none",
      display: 'block'
    },

    card: {
      width: '100%',
      display: 'block'
    },
    
    message: {
      width: '100%',
      marginTop: '20px',
      marginBottom: '12px'
    },

    textfield: {
      border: '1px solid #E0E0E0',
      borderRadius: '6px'
    },

    actions: {
      marginTop: '10px',
      display: 'block'
    },

    container: {
      display: 'block'
    },

    users: {
      display: 'block'
    },

    select: {
      border: '1px solid #E0E0E0',
      padding: '4px',
      borderRadius: '6px',
      width: '300px'
    }
  }

  return (
    <PageContainer header="Messenger">
      <h3>This is a demo messenger using socket.io</h3>
      <div style={styles.card}>
        <div style={styles.users}>
          <select name="user" style={styles.select} onChange={onSelectUser}>
            {!loading && usersData.users.map((user: any) => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
        </div>
        <div style={styles.message}>
          <textarea style={styles.textfield} name="message" rows={8} cols={60} onChange={onChange}></textarea>
        </div>
        <div style={styles.actions}>
          <Button tone="passive" weight="bold" size="small" onClick={onSend}>Send</Button>
        </div>
        <div style={styles.container}>
          <ul style={styles.messages}>
            {messages.map((message: string) => {
              return (
                <li>{message}</li>
              )
            })}
          </ul>
        </div>
      </div>
    </PageContainer> 
  )
}
