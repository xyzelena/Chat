import { createContext, useMemo } from 'react';
import filter from 'leo-profanity';

export const FilterBadWordsContext = createContext({});

export const BadWordsProvider = ({ children }) => {
  const cleanBadWords = useMemo(
    () => (text) => {
      filter.loadDictionary('ru');
      const cleanRuText = filter.clean(text);

      filter.loadDictionary('en');
      const cleanText = filter.clean(cleanRuText);
      return cleanText;
    },
    [],
  );

  const contextValue = useMemo(() => ({ cleanBadWords }), [cleanBadWords]);

  return (
    <FilterBadWordsContext.Provider value={contextValue}>
      {children}
    </FilterBadWordsContext.Provider>
  );
};
