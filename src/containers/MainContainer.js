import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  //VERSION IAN HELPED WITH

  state = {
    stocks: [],
    portfolioStocks: [],
    filteredStocks: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    .then(stocksData => {
      this.setState({
        stocks: stocksData,
        filteredStocks: stocksData.filter(stock => stock.type === 'Tech')
      })
    })
  }

  addToPortfolio = stock => {
    // console.log(stock)
    this.setState({
      portfolioStocks: [
        ...this.state.portfolioStocks,
        stock
      ]
    })
  }

  removeFromPortfolio = stock => {
    // console.log(stock)
    this.setState({
      portfolioStocks: this.state.portfolioStocks.filter(s => s !== stock)
    })
  } 
      // portfolioStocks: this.state.portfolioStocks.filter(s => s === stock ? stock.remove() : null)

  sortStocks = event => {
    let arrayCopy = []

    switch(event) {
      case 'Alphabetically':
        arrayCopy = this.state.stocks.sort((a, b) => a.ticker.toLowerCase().localeCompare(b.ticker))
        break
      case 'Price':
        arrayCopy = this.state.stocks.sort((a, b) => a.price - b.price)
        break  
    }
      this.setState({
        stocks: arrayCopy
      })
  }

  filterStocks = (selection) => {
      this.setState({
        filteredStocks: this.state.stocks.filter(stock => stock.type === selection)
      })
  
  }

  render() {
    // console.log(this.state.stocks)
    return (
      <div>
        <SearchBar sortStocks={this.sortStocks} filterStocks={this.filterStocks}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.filteredStocks} addToPortfolio={this.addToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolioStocks} removeFromPortfolio={this.removeFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
