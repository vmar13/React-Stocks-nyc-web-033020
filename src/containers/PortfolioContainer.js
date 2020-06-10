import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {

    const { stocks, removeFromPortfolio } = this.props

    return (
      <div>
        <h2>My Portfolio</h2>
          {stocks.map(stock => 
            <Stock key={stock.id} stock={stock} removeFromPortfolio={removeFromPortfolio}/>
              )
          }
      </div>
    );
  }

}

export default PortfolioContainer;
