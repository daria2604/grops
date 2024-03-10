import '@vkontakte/vkui/dist/vkui.css';
import GroupItem from './Group';
import { Title } from '@vkontakte/vkui';

export const Groups = ({ groups }) => {
  return (
    <section className='groups'>
      <ul className='groups__list'>
        {groups.map((group) => (
          <li className='groups__item' key={group.id}>
            <GroupItem group={group} />
          </li>
        ))}
        {groups.length === 0 && (
          <Title level='3' style={{ marginTop: 16 }}>
            Нет групп
          </Title>
        )}
      </ul>
    </section>
  );
};
