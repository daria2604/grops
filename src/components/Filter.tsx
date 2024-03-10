import { FormItem, FormLayoutGroup, Select } from '@vkontakte/vkui';

const Filter = ({ options, handleChange, filterType, filterName }) => {
  return (
    <div className={`filter filter--${filterType}`}>
      <FormLayoutGroup mode='horizontal'>
        <FormItem
          top={filterName}
          htmlFor={`filter-select-${filterType}`}
          style={{ flexGrow: 0.2, flexShrink: 1 }}
        >
          <Select
            id={`filter-select-${filterType}`}
            placeholder='Не выбран'
            options={options}
            onChange={handleChange}
          />
        </FormItem>
      </FormLayoutGroup>
    </div>
  );
};

export default Filter;
