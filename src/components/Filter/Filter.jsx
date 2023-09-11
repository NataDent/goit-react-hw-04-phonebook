import { FilterForm } from './Filter.styled';

export const Filter = ({ onChange }) => {
  return (
    <FilterForm>
      <label>Find contacts by name:</label>
      <input
        type="text"
        name="find"
        onChange={e => onChange(e.currentTarget.value)}
      />
    </FilterForm>
  );
};
