import {Component} from 'react';
import Name from './Name';
import Price from'./Price';
import Description from './Description';

export default class Product extends Component {

    render() {
      return <div class="product">
        <Name text={this.props.name} />
        <Price text={this.props.price} />
        <Description text={this.props.description} />
      </div>;
    }
}