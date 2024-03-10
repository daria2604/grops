import '@vkontakte/vkui/dist/vkui.css';
import {
  Avatar,
  SimpleCell,
  Group,
  Title,
  MiniInfoCell,
  Button,
} from '@vkontakte/vkui';
import { useState } from 'react';

const GroupItem = ({ group }) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleFriendsOpen() {
    setIsOpen(!isOpen)
  }

  return (
    <Group className='group'>
      <SimpleCell
        before={
          group.avatar_color && (
            <Avatar size={100} src='#' gradientColor={group.avatar_color} />
          )
        }
      >
        <Title level='2' style={{ marginBottom: 8 }}>
          {group.name}
        </Title>
        <MiniInfoCell>
          {group.closed ? 'Закрытая группа' : 'Открытая группа'}
        </MiniInfoCell>
        <MiniInfoCell>{group.members_count} участников</MiniInfoCell>
        {group.friends && (
          <div className='group__friends'>
            <Button appearance='overlay' size='l' onClick={handleFriendsOpen}>
              Друзья
            </Button>

            <ul className='group__friends-list'>
              {group.friends.map((user, index) => (
                <li className={`group__friends-item group__friends-item--${isOpen ? 'opened' : ''}`} key={index}>
                  {user.first_name} {user.last_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </SimpleCell>
    </Group>
  );
};

export default GroupItem;
