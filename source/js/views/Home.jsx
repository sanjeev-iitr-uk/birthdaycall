import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
@connect(state => ({
  counter: state.app.get('counter'),
}))
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      input: '',
      data: [],
    };
    this.updateCards = this.updateCards.bind(this);
    this.getBD = this.getBD.bind(this);
  }
  getBD(day) {
    let data = this.state.data || [];
    const UI = data.map((box) => {
      if (box.bucket === day && box.name) {
        return (
          <div style={ {
            flex: '1',
            border: '1px solid green',
            height: '40',
            width: '40',
            backgroundColor: box.color || '#FFE4C4',
          } }
          >{box.name}
          </div>
        );
      }
    });
    return UI;
  }
  updateCards() {
    const year = this.state.year ? (this.state.year).toString() : '';
    const userInput = this.state.input;
    try {
      const input = JSON.parse(userInput);
      const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat',];
      const data = [];
      if (Array.isArray(input) && input.length && year) {
        input.forEach((item) => {
          if (item.name && item.birthdate) {
            const n = (item.name).trim();
            const dateString = (item.birthdate).trim();
            const dateParts = dateString.split('/');
            const birthdate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
            const date = birthdate.getDate();
            const month = birthdate.getMonth();
            const newdate = new Date(year, month, date);
            const bucketIndex = newdate.getDay();
            const bucket = days[bucketIndex];
            const snp = n.indexOf(' ') || 0;
            const fn = n[0] || '';
            const sn = snp ? n[snp + 1] : '';
            const name = `${fn}${sn}`;
            const x = Math.floor(Math.random() * 256);
            const y = Math.floor(Math.random() * 256);
            const z = Math.floor(Math.random() * 256);
            const bgColor = `rgb(${x},${y},${z})`;
            const obj = {
              name: name.toUpperCase(),
              bucket,
              color: bgColor,
            };
            data.push(obj);
          }
        });
        } else {
        let err = '';
        if (!Array.isArray(input)) {
          err = 'Input should be an array !';
        } else if (!input.length) {
          err = 'Input array required !';
        } else {
          err = 'Year field is required !';
        }
        toastr.error(err);
      }
      this.setState({data});
      } catch(error) {
        toastr.error(error);
      }
  }
  render() {
    return (
      <div className='container'>
        <h4 style={ { textAlign: 'center' } }>Birthday Call </h4><hr />
        <div className='row'>
          <div className='col-sm-12'>
            <div className='card-deck'>
              <div className='card' style={ { height: '120px', minWidth: '120px' } }>
                <div className='card-header'>Mon</div>
                <div className='d-flex flex-wrap'>
                  {this.getBD('mon')}
                </div>
              </div>
              <div className='card' style={ { height: '120px', minWidth: '120px' } }>
                <div className='card-header'>Tue</div>
                <div className='d-flex flex-wrap'>
                  {this.getBD('tue')}
                </div>
              </div>
              <div className='card' style={ { height: '120px', minWidth: '120px' } }>
                <div className='card-header'>Wed</div>
                <div className='d-flex flex-wrap'>
                  {this.getBD('wed')}
                </div>
              </div>
              <div className='card' style={ { height: '120px', minWidth: '120px' } }>
                <div className='card-header'>Thu</div>
                <div className='d-flex flex-wrap'>
                  {this.getBD('thu')}
                </div>
              </div>
              <div className='card' style={ { height: '120px', minWidth: '120px' } }>
                <div className='card-header'>Fri</div>
                <div className='d-flex flex-wrap'>
                  {this.getBD('fri')}
                </div>
              </div>
              <div className='card' style={ { height: '120px', minWidth: '120px' } }>
                <div className='card-header'>Sat</div>
                <div className='d-flex flex-wrap'>
                  {this.getBD('sat')}
                </div>
              </div>
              <div className='card' style={ { height: '120px', minWidth: '120px' } }>
                <div className='card-header'>Sun</div>
                <div className='d-flex flex-wrap'>
                  {this.getBD('sun')}
                </div>
              </div>
            </div>
          </div>
        </div><hr />
        <div className='row'>
          <div className='col-sm-8'>
            <textarea
              onChange={ (e) => {
                const value = e.target.value;
                this.setState({ input: value });
              } }
              value={ this.state.input }
              className='form-control'
              rows='20'/>
          </div>
          <div className='col-sm-4'>
            <div className='form-group'>
              <label htmlFor='usr'>Year</label>
              <input
                onChange={ (e) => {
                  const value = e.target.value;
                  this.setState({ year: value });
                } }
                value={ this.state.year }
                type='number'
                className='form-control'
                id='usr' />
            </div>
            <button
              onClick={ () => {
                this.updateCards();
              } }
              value={ this.state.json }
              type='button'
              className='btn btn-primary' >Update </button>
          </div>
        </div>
      </div>
    );
  }
}
