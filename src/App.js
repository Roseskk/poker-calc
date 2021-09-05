import React from 'react';
import './styles.css';
import {CardGroup, OddsCalculator} from 'poker-odds-calculator';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {player1 : '', player2 : '', board : '', player1ev : '', player2ev : ''};
    this.onPlayer1 = this.onPlayer1.bind(this);
    this.onPlayer2 = this.onPlayer2.bind(this);
    this.onBoardChange = this.onBoardChange.bind(this);
    this.evClick = this.evClick.bind(this);
  }
  onPlayer1(event) {
      this.setState({player1: event.target.value });
  }
  onPlayer2(event) {
      this.setState({player2: event.target.value });
  }
  onBoardChange(event) {
      this.setState({board: event.target.value });
  }
  evClick() {
      const player1 = CardGroup.fromString(this.state.player1);
      const player2 = CardGroup.fromString(this.state.player2);
      const board = CardGroup.fromString(this.state.board);

      const result = OddsCalculator.calculate([player1,player2], board);

      console.log(`Player #1 - ${player1} - ${result.equities[0].getEquity()}%`);
      console.log(`Player #2 - ${player2} - ${result.equities[1].getEquity()}%`);
      this.setState({player1ev: result.equities[0].getEquity() + '%', player2ev : result.equities[1].getEquity() + '%'})
      console.log(this.state.player1)
      console.log(this.state.player2)
      console.log(this.state.board)
  }
  render() {
    return(
       <div className='main__container'>
         <p className='title'>Poker calc</p>
              <div className='poker__container'>
                  <div className='data__container'>
                      <label className='data__label'>Player 1</label>
                      <input type='text' onChange={this.onPlayer1} placeholder='Карты первого игрока'/>
                      <label className='data__label ev'>{this.state.player1ev}</label>
                  </div>
                  <div className='data__container' >
                      <label className='data__label'>Player 2</label>
                      <input type='text' onChange={this.onPlayer2} placeholder='Карты второго игрока'/>
                      <label className='data__label ev'>{this.state.player2ev}</label>
                  </div>
                  <div className='data__container'>
                      <label className='data__label'>Board</label>
                      <input type='text' onChange={this.onBoardChange} placeholder='Доска'/>
                      <label className='data__label'></label>
                  </div>
                  <button onClick={this.evClick} className='data__ev__button'>EV calc</button>
              </div>
       </div>
    )
  }
}
export default App;
