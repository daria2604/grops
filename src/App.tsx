import './styles.scss';
import { Header } from '@vkontakte/vkui';
import { Groups } from './components/Groups';
import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import {
  privacyOptions,
  avatarColorOptions,
  hasFriendsOptions,
} from './utils/filterOptions';

export default function App() {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [privacyFilter, setPrivacyFilter] = useState('all');
  const [avatarColorFilter, setAvatarColorFilter] = useState('any');
  const [friendsFilter, setFriendsFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      fetch('./groups.json')
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setGroups(data);
            setFilteredGroups(data);
          } else {
            console.log('Ошибка при выполнении запроса.');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }, []);

  function applyFilters(privacyFilter, avatarColorFilter, friendsFilter) {
    return groups.filter((group) => {
      const passPrivacyFilter =
        privacyFilter === 'all' ||
        (privacyFilter === 'closed' ? group.closed : !group.closed);

      const passAvatarColorFilter =
        avatarColorFilter === 'any' || group.avatar_color === avatarColorFilter;

      const passFriendsFilter =
        friendsFilter === 'all' ||
        (friendsFilter === 'yes' ? group.friends : !group.friends);

      return passPrivacyFilter && passAvatarColorFilter && passFriendsFilter;
    });
  }

  function handleFilter(option, filterBy) {
    let filtered = [];

    if (filterBy === 'privacy') {
      filtered = applyFilters(option, avatarColorFilter, friendsFilter);
      setPrivacyFilter(option);
    } else if (filterBy === 'avatarColor') {
      filtered = applyFilters(privacyFilter, option, friendsFilter);
      setAvatarColorFilter(option);
    } else if (filterBy === 'friends') {
      filtered = applyFilters(privacyFilter, avatarColorFilter, option);
      setFriendsFilter(option);
    }

    setFilteredGroups(filtered);
  }

  return (
    <div className='page'>
      <Header className='groups__heading' mode='primary' size='large'>
        Фильтр
      </Header>
      <Filter
        options={privacyOptions}
        handleChange={(evt) => handleFilter(evt.target.value, 'privacy')}
        filterType={'privacy'}
        filterName={'Приватность'}
      />
      <Filter
        options={avatarColorOptions}
        handleChange={(evt) => handleFilter(evt.target.value, 'avatarColor')}
        filterType={'avatarColor'}
        filterName={'Цвет аватара'}
      />
      <Filter
        options={hasFriendsOptions}
        handleChange={(evt) => handleFilter(evt.target.value, 'friends')}
        filterType={'friends'}
        filterName={'Друзья'}
      />
      <Groups groups={filteredGroups} />
    </div>
  );
}
