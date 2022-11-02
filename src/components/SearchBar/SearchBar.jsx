import { useDispatch, useSelector } from "react-redux";
import { getSearchValue } from "../../redux/githubUsers/githubUsersSelector";
import { changeSearch } from "../../redux/githubUsers/githubUsersSlice";
import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";

export const SearchBar = () => {
  const query = useSelector(getSearchValue);
  const dispatch = useDispatch();

  return (
    <StyledInput
      minLength={2}
      debounceTimeout={300}
      name="search"
      value={query}
      onChange={(e) => dispatch(changeSearch(e.target.value.trim()))}
      placeholder="input to search Github users"
    />
  );
};

const StyledInput = styled(DebounceInput)`
  width: 338px;
  border-radius: ${(p) => p.theme.radii.normal};
  margin-bottom: ${(p) => p.theme.space[3]}px;
  outline: none;
  font-feature-settings: "tnum", "tnum";
  background-color: ${(p) => p.theme.colors.white};
  border: ${(p) => p.theme.borders.normal} ${(p) => p.theme.colors.shade};
  color: ${(p) => p.theme.colors.primary};
  font-size: ${(p) => p.theme.fontSizes.s};
  font-variant: tabular-nums;
  line-height: ${(p) => p.theme.lineHeights.body};
  padding: ${(p) => p.theme.space[0]}px ${(p) => p.theme.space[2]}px;
  transition: all 0.3s;
  &:hover,
  &:focus,
  &:active {
    border-color: ${(p) => p.theme.colors.hover};
    border-right-width: 1px;
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
    outline: 0;
  }
`;
