import React, { Fragment, memo } from 'react';
import Select from 'react-select';

const SingleSelect = (props) => {
const { options, onChange } = props;

  const state = {
    isSearchable: true,
    isClearable: false,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
  }
  
  // const toggleClearable = () => { setState(state => ({ isClearable: !state.isClearable })); }
  // const toggleSearchable = () => { setState(state => ({ isSearchable: !state.isSearchable })); }
  // const toggleDisabled = () => { setState(state => ({ isDisabled: !state.isDisabled })); }
  // const toggleLoading = () => { setState(state => ({ isLoading: !state.isLoading })); }
  // const toggleRtl = () => { setState(state => ({ isRtl: !state.isRtl })); }
    
  const {
    isClearable,
    isSearchable,
    isDisabled,
    isLoading,
    isRtl,
  } = state;

  return (
    <Fragment>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={options[0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={options}
        onChange={onChange}
      />
      {/* <Note Tag="label">
        <Checkbox
          checked={isClearable}
          onChange={this.toggleClearable}
          id="cypress-single__clearable-checkbox"
        />
        Clearable
      </Note>
      <Note Tag="label" style={{ marginLeft: '1em' }}>
        <Checkbox
          checked={isSearchable}
          onChange={this.toggleSearchable}
          id="cypress-single__searchable-checkbox"
        />
        Searchable
      </Note>
      <Note Tag="label" style={{ marginLeft: '1em' }}>
        <Checkbox
          checked={isDisabled}
          onChange={this.toggleDisabled}
          id="cypress-single__disabled-checkbox"
        />
        Disabled
      </Note>
      <Note Tag="label" style={{ marginLeft: '1em' }}>
        <Checkbox
          checked={isLoading}
          onChange={this.toggleLoading}
          id="cypress-single__loading-checkbox"
        />
        Loading
      </Note>
      <Note Tag="label" style={{ marginLeft: '1em' }}>
        <Checkbox
          type="checkbox"
          checked={isRtl}
          onChange={this.toggleRtl}
          id="cypress-single__rtl-checkbox"
        />
        RTL
      </Note> */}
    </Fragment>
  );
    
}
      
export default memo(SingleSelect);