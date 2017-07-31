require('!style!css!./Navigation.css')

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Swipe
} from '../../services/touchevents'

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

class Navigation extends Component {
  handleAction() {
    if (this.props.index === this.props.items.length-1) {
      if (this.context.router.routes[this.context.router.routes.length -1].path === 'menu') {
        this.context.router.push('/');
      } else {
        this.context.router.goBack();
      }
    }
    this.props.action();  
  }

  read(e) {
    if (e && e.type === 'click') {
      let text = this.props.items[this.props.index].name;
      this.props.read(text);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.read && this.props.index !== nextProps.index) {
      this.props.read(nextProps.items[nextProps.index].name); 
    }
  }

  componentWillMount() {
    this.props.items.push({path: 'back', name: 'Retour'});
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.read(this.props.items[this.props.index].name);
    }, 1800)
    this.swiper = new Swipe(document.body);
    this.swiper.onUp(debounce(() => {
      this.read(false);
      // this.props.read('');
      let newIndex = this.props.index-1;
      if (this.props.index === 0) {
        newIndex = this.props.items.length-1;
      }
      this.props.changeIndex(newIndex);
    }, 250));
    this.swiper.onDown(debounce(() => {
      this.read(false);
      // this.props.read('');
      let newIndex = this.props.index+1;
      if (this.props.index === this.props.items.length-1) {
        newIndex = 0;
      }
      this.props.changeIndex(newIndex);
    }, 250));
    this.swiper.run();

    const nav = document.getElementById('navigation');
    nav.addEventListener('click', this.read.bind(this));

    if (this.props.action) {
      nav.addEventListener('dblclick', this.handleAction.bind(this));
    }
  }

  componentWillUnmount() {
    const nav = document.getElementById('navigation');
    nav.removeEventListener('dblclick', this.handleAction.bind(this));
    nav.removeEventListener('click', this.read.bind(this));

    this.props.items.pop();
    this.swiper.destroy();
  }

  render() {
    const {items, index} = this.props;
    const content = this.props.content || '';

    return (
      <div id="navigation">
        <div className="modal" ref="mainMenu" id="mainMenu">
          <div className="menu">
            <ul className="selectable-list">
              {items ? items.map(function(item, key) {
                const isSelected = (key === index) ? 'selected' : '';
                return (
                  <li key={key} className="selectable-list--item">
                    <a className={isSelected}>{item.name}</a>
                  </li>
                );
              }.bind(this)) : null}
            </ul>

            {content}
          </div>
        </div>
      </div>
    );
  }
}

Navigation.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Navigation