import { useState } from 'react';

import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import {
  SearchBar,
  SearchForm,
  SearchFormInput,
  SearchFormButton,
} from './Searchbar.styled';

export const Searchbar = ({ onQuerySubmit }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleQuerySubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Enter search query!');
      return;
    }

    onQuerySubmit(query);
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleQuerySubmit}>
        <SearchFormButton type="submit">Search</SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleQueryChange}
        />
      </SearchForm>
    </SearchBar>
  );
};

Searchbar.propTypes = {
  onQuerySubmit: PropTypes.func.isRequired,
};
