import React, { useEffect, useMemo, useRef, useState } from "react";
import DownArrow from "../../assets/DropdownArrow.svg";
import CheckMark from "../../assets/CheckBox.svg";
import SearchComponent from "./searchComponent";
import { MultiSelectPropType, OptionType } from "./types";
import { DEFAULT_PLACEHOLDER, Elements } from "./constants";
import { getStyles } from "./utils/utils";
import classes from "./styles.module.scss";
import Chips from "./chips";
import MenuListing from "./menuItems";

const MultiSelect = (props: MultiSelectPropType): JSX.Element => {
  const {
    options,
    showCheckbox = true,
    placeholder = DEFAULT_PLACEHOLDER,
    hideSelected = false,
    styles = {},
    hideSearch = false,
    showChips = true,
    isLoading = false,
    maxHeight = "100%",
    renderLoader = undefined,
    renderEmptyItem = undefined,
    hasError = false,
    helperText = "",
    thresholdForBubble = undefined,
    icons = {},
    onSearch = undefined,
    onItemClick = undefined,
  } = props;

  const { Checked = CheckMark, Search, ChipClose, Arrow } = icons;

  // to show/hide div containing the checkboxes
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [list, setList] = useState<OptionType[]>([]);
  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([]);
  const [showAllChips, setShowAllChips] = useState<boolean>(false);

  // ref for the search input
  const inputRef = useRef<HTMLInputElement>(null);
  //ref for the modal
  const modalRef = useRef<HTMLDivElement>(null);
  // ref for the container having chips,search bar and arrow
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setList(options);
    const filteredIds = options
      .filter((item) => item.checked === true)
      .map((item) => item.id);
    setSelectedIds(filteredIds);
  }, [options]);

  useEffect(() => {
    if (typeof document !== undefined) {
      document.addEventListener("mousedown", onMouseDown);
    }
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [document]);

  const handleSearch = (value: string): void => {
    if (onSearch) {
      onSearch(value);
      return;
    }
    setList(
      options.filter(
        (e) => e.name?.toLowerCase().indexOf(value?.toLowerCase()) !== -1
      )
    );
  };

  const onOptionClick = (id: number | string): void => {
    const itemIndex = selectedIds.findIndex((item) => item === id);
    const updatedList = [...selectedIds];
    if (itemIndex > -1) {
      updatedList.splice(itemIndex, 1);
    } else {
      updatedList.push(id);
    }
    setSelectedIds(updatedList);
    inputRef.current?.focus();
    if (onItemClick) {
      onItemClick(updatedList);
    }
  };

  const onChipClick = (id: string | number): void => {
    const itemIndex = selectedIds.findIndex((item) => item === id);
    const updatedList = [...selectedIds];
    updatedList.splice(itemIndex, 1);
    setSelectedIds(updatedList);
    if (onItemClick) {
      onItemClick(updatedList);
    }
  };

  const triggerModalOpen = (): void => {
    setIsModalVisible(true);
  };

  const onMouseDown = (event: Event): void => {
    if (
      event.target instanceof Node &&
      !modalRef?.current?.contains(event.target) &&
      !searchBarRef?.current?.contains(event.target)
    ) {
      // to close the dropdown modal on clicking outside the modal and the search bar
      setIsModalVisible(false);
      setShowAllChips(false);
      return;
    }
    if (
      event.target instanceof Node &&
      searchBarRef?.current?.contains(event.target) &&
      thresholdForBubble
    ) {
      // to expand the collapsed chips if thresholdForBubble has a value
      setShowAllChips(true);
    }
  };

  const onArrowClick = (): void => {
    setIsModalVisible(!isModalVisible);
  };

  const chips = useMemo(
    () => options?.filter((item) => selectedIds.includes(item.id)),
    [options, selectedIds]
  );

  return (
    <div
      className={classes.container}
      style={getStyles(Elements.Container, styles)}
    >
      <div
        className={`${classes.box} ${hasError && classes.errorBorder}`}
        ref={searchBarRef}
        style={getStyles(Elements.InputBox, styles)}
      >
        <div className={classes.headSection}>
          {showChips && (
            <Chips
              styles={styles}
              list={chips}
              onClick={onChipClick}
              icon={ChipClose}
              thresholdForBubble={thresholdForBubble}
              showAllChips={showAllChips}
            />
          )}
          {!hideSearch && (
            <SearchComponent
              onSearch={handleSearch}
              searchPlaceholder={placeholder}
              styles={styles}
              onFocus={triggerModalOpen}
              ref={inputRef}
              icon={Search}
            />
          )}
          {hideSearch && !selectedIds.length && (
            // same style for the search box is used
            <div style={getStyles(Elements.SearchComponent, styles)}>
              {placeholder}
            </div>
          )}
        </div>
        <button
          type="button"
          className={classes.buttonIcon}
          onClick={onArrowClick}
          id="down-arrow"
        >
          <img
            src={Arrow || DownArrow}
            className={classes.rotation}
            style={{
              transform: `rotate(${isModalVisible ? "180deg" : "0deg"})`,
              ...getStyles(Elements.ArrowIcon, styles),
            }}
          />
        </button>
      </div>
      {!isModalVisible && helperText && (
        <div
          id="helper-text"
          className={hasError ? classes.error : classes.helperText}
          style={getStyles(Elements.HelperText, styles)}
        >
          {helperText}
        </div>
      )}
      {isModalVisible && (
        <div
          className={classes.listContainer}
          ref={modalRef}
          style={{ maxHeight }}
          id="menu-list"
        >
          <MenuListing
            list={list}
            selectedIds={selectedIds}
            hideSelected={hideSelected}
            showCheckbox={showCheckbox}
            icon={Checked}
            isLoading={isLoading}
            renderEmptyItem={renderEmptyItem}
            renderLoader={renderLoader}
            onOptionClick={onOptionClick}
          />
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
