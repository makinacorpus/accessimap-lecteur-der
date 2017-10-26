require('!style!css!./Navigation.css')

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Touch from '../../services/touch'
import Swipe from '../../services/swipe'
import debounce from '../../services/debounce';

class Navigation extends Component {
  handleAction = () => {
    if (this.props.index === this.props.items.length-1) {
      const router = this.context.router;
      if (router.routes[router.routes.length -1].path === 'menu') {
        router.push('/');
      } else {
        router.goBack();
      }
    }
    this.props.action();  
  }

  /**
   * Read the current item (defined by index)
   */
  read() {
    if (this.props.items[this.props.index]) {
      let text = this.props.items[this.props.index].name;
      this.props.read(text);
    } else {
      console.warn(`Item n°${this.props.index} doesn't exist`);
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
    if (this.props.items[this.props.index] 
        && this.context.router.location.pathname !== '/') {
      this.props.read(this.props.items[this.props.index].name);
    }

    // configure the swipe object
    this.swiper = new Swipe(document.body);
    this.swiper.onUp(() => {
      let newIndex = this.props.index-1;
      if (this.props.index === 0) {
        newIndex = this.props.items.length-1;
      }
      this.props.changeIndex(newIndex);
    });
    this.swiper.onDown(() => {
      let newIndex = this.props.index+1;
      if (this.props.index === this.props.items.length-1) {
        newIndex = 0;
      }
      this.props.changeIndex(newIndex);
    });
    this.swiper.run();

    // configure the touch object
    this.touchEvent = new Touch(document.body)
    this.touchEvent.onTap(this.read.bind(this))
    this.touchEvent.onDoubleTap(this.handleAction)
    this.touchEvent.run()
  }

  componentWillUnmount() {
    this.touchEvent.destroy()

    this.props.items.pop();
    this.swiper.destroy();
  }

  onChange = (e) => {
    if (this.refs.inputfile) {
      let file = this.refs.inputfile.files[0]
      if (file !== undefined) {
        this.props.actions.changeDerFile(file);
        this.props.actions.changeFilter(null);
      } else {
        this.props.options.message('Aucun fichier seléctionné', 'error')
      }
    }
  }

  render() {
    const {items, index} = this.props;
    const content = this.props.content || '';

    return (
      <div id="navigation">
        <div className="modal" ref="mainMenu" id="mainMenu">
          <div className="menu">
            <ul className="selectable-list">
              {
                items &&
                items.map((item, key) => {
                  const isSelected = (key === index) ? 'selected' : '';
                  return (
                    <li key={key} className="selectable-list--item">
                      {
                        item.type === 'file' &&
                        <label className={isSelected} ref="labelfile">
                        <input
                          ref="inputfile"
                          id="file"
                          type="file"
                          className="inputfile"
                          onChange={this.onChange}
                        />
                        {item.name}
                        </label>
                      }
                      {
                        item.type !== 'file' &&
                        <a className={isSelected}>{item.name}</a>
                      }
                    </li>
                  );
                })
              }
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