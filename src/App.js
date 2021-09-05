import React from 'react';
import './styles.css';
import {CardGroup, OddsCalculator} from 'poker-odds-calculator';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = [];
  }
  componentDidMount() {
    const player1Cards = CardGroup.fromString('JhJs');
    const player2Cards = CardGroup.fromString('JdQd');
    const board = CardGroup.fromString('7d9dTsTdJc');

    const result = OddsCalculator.calculate([player1Cards, player2Cards], board);

    console.log(`Player #1 - ${player1Cards} - ${result.equities[0].getEquity()}%`);
    console.log(`Player #2 - ${player2Cards} - ${result.equities[1].getEquity()}%`);

  }

  render() {
    return(
       <div className='main__container'>
         <p className='title'>Poker calc</p>
              <div className='poker__container'>
                  <div className='data__container'>
                      <label className='data__label'>Player 1</label>
                      <input placeholder='Карты первого игрока'/>
                  </div>
                  <div className='data__container' >
                      <label className='data__label'>Player 2</label>
                      <input placeholder='Карты второго игрока'/>
                  </div>
                  <div className='data__container'>
                      <label className='data__label'>Board</label>
                      <input placeholder='Доска'/>
                  </div>
                  <button className='data__ev__button'>EV calc</button>
              </div>
       </div>
    )
  }
}
export default App;
