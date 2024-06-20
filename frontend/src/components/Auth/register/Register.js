import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../../api';
import './Register.css';
import ControlTab from '../../Auth/ControlTab';

import Nav from '../Nav';
import ButtonPrimary from '../../buttons/ButtonPrimary';
import InputForm from '../../form/InputForm';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: ['signup', 'information', 'verify'],
      currentTab: 0,
      info: {
        username: '',
        password: '',
        confirm: '',
        email: ''
      },
      error: ''
    };

    this.changeInfo = this.changeInfo.bind(this);
    this.signUp = this.signUp.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tabName, next) {
    const { currentTab, tabs } = this.state;
    if (next === 'next') {
      tabName = tabs[(currentTab + 1) % tabs.length];
    }

    const activeBoxTab = document.querySelector(`.box-tab.active`);
    const activeTab = document.querySelector(`.tab.active`);
    const boxTab = document.querySelector(`.box-tab.${tabName}`);
    const tab = document.querySelector(`.tab.${tabName}`);
    
    if (activeBoxTab) activeBoxTab.classList.remove('active');
    if (activeTab) activeTab.classList.remove('active');
    if (boxTab) boxTab.classList.add('active');
    if (tab) tab.classList.add('active');

    this.setState({
      currentTab: tabs.indexOf(tabName)
    });
  }

  changeInfo(prop, val) {
    this.setState(prevState => ({
      info: { ...prevState.info, [prop]: val }
    }));
  }

  async signUp(e) {
    e && e.preventDefault();
    const { username, password, confirm, email } = this.state.info;
    if (password !== confirm) {
      this.setState({ error: 'Passwords do not match' });
      return;
    }
    try {
      const data = await register(username, email, password);
      console.log('Registration successful', data);
      // Handle successful registration (e.g., redirect to login)
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { currentTab, error } = this.state;
    const { username, password, confirm, email } = this.state.info;

    return (
      <div className="Register">
        <Nav />
        <div className="form-container">
          <div className="form-navigate">
            <ControlTab changeTab={this.changeTab}/>
          </div>
          <div className="form-content">
            <form className="boxes" onSubmit={e => this.signUp(e)}>
              <div className="box-tab register active">
                <InputForm
                  tabIndex={1}
                  value={username}
                  onChange={(val) => this.changeInfo('username', val)}
                  label="username"
                  placeholder="quangdatpham" />
                <InputForm
                  tabIndex={2}
                  value={password}
                  onChange={(val) => this.changeInfo('password', val)}
                  label="password"
                  type="password"
                  placeholder="************" />
                <InputForm
                  tabIndex={3}
                  value={confirm}
                  onChange={(val) => this.changeInfo('confirm', val)}
                  label="confirm"
                  type="password"
                  placeholder="************" />
              </div>
              <div className="box-tab information">
                <InputForm
                  tabIndex={4}
                  value={email}
                  onChange={(val) => this.changeInfo('email', val)}
                  label="email"
                  placeholder="quangdat2000.pham@gmail.com" />
              </div>
              <div className="box-tab verify">
                <p>Check your email inbox to verify.</p>
              </div>
            </form>
            {error && <div className="error">{error}</div>}
            <div className="wrap-next-btn">
              {
                (() => {
                  if (currentTab === 1)
                    return <ButtonPrimary handleClick={() => {this.signUp(); this.changeTab(null, 'next')}}>Register</ButtonPrimary>
                  else if (currentTab === 2)
                    return <Link to='/'><ButtonPrimary>Home</ButtonPrimary></Link>
                  else
                    return <ButtonPrimary handleClick={() => this.changeTab(null, 'next')} >Next</ButtonPrimary>
                })()
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
