import {Component} from 'react';

export default class Name extends Component {

    render() {
      return <div>
        <p>{this.props.text}</p>
      </div>;
    }
}