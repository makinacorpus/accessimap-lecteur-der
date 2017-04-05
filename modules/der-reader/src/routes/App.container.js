import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { 
  setMessage, 
  setDerFile, 
  setFilter, 
  setFilesList, 
  setDer, 
  setOption,
  setOptionStorage,
  initConfig,
  isLoading
} from '../store/actions';
import App from './App';

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.appReducer
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setMessage: message => dispatch(setMessage(message)),
    setDerFile: file => dispatch(setDerFile(file)),
    setFilter: filter => dispatch(setFilter(filter)),
    setFilesList: files => dispatch(setFilesList(files)),
    setDer: files => dispatch(setDer(files)),
    setOption: (name, value) => dispatch(setOption(name, value)),
    setOptionFormat: value => dispatch(setOptionStorage('format', value)),
    initConfig: config => dispatch(initConfig(config)),
    isLoading: bool => dispatch(isLoading(bool))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);