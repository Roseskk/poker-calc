import React from 'react';
import './styles.css';
import {CardGroup, OddsCalculator} from 'poker-odds-calculator';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        player1 : '', player2 : '', board : '', player1ev : '', player2ev : '',
        cards:['As','Ac','Ah','Ad',
            'Ks','Kc','Kh','Kd',
            'Qs','Qc','Qh','Qd',
            'Js','Jc','Jh','Jd',
            'Ts','Tc','Th','Td',
            '9s','9c','9h','9d',
            '8s','8c','8h','8d',
            '7s','7c','7h','7d',
            '6s','6c','6h','6d',
            '5s','5c','5h','5d',
            '4s','4c','4h','4d',
            '3s','3c','3h','3d',
            '2s','2c','2h','2d',],
        active: false
    };
    this.onPlayer1 = this.onPlayer1.bind(this);
    this.onPlayer2 = this.onPlayer2.bind(this);
    this.onBoardChange = this.onBoardChange.bind(this);
    this.evClick = this.evClick.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.selectPlayerFirstCard = this.selectPlayerFirstCard.bind(this);
    this.selectPlayerSecondCard = this.selectPlayerSecondCard.bind(this);
    this.selectSecondFirstCard = this.selectSecondFirstCard.bind(this);
    this.selectSecondSecondCard = this.selectSecondSecondCard.bind(this);
  }
  onPlayer1(event) {
      this.setState({ player1: event.target.value });
  }
  onPlayer2(event) {
      this.setState({ player2: event.target.value });
  }
  onBoardChange(event) {
      this.setState({ board: event.target.value });
  }
  onOpen() {
      this.setState({active : true})
  }
  selectPlayerFirstCard(event) {
      this.setState({player1 : event.target.value})
  }
  selectPlayerSecondCard(event) {
        this.setState({player1 : this.state.player1 + event.target.value})
  }
  selectSecondFirstCard(event) {
        this.setState({player2 : event.target.value})
  }
  selectSecondSecondCard(event) {
        this.setState({player2 : this.state.player2 + event.target.value})
  }
  evClick() {
      const player1 = CardGroup.fromString(this.state.player1);
      const player2 = CardGroup.fromString(this.state.player2);
      const board = CardGroup.fromString(this.state.board);

      const result = OddsCalculator.calculate([player1,player2], board);

      console.log(`Player #1 - ${player1} - ${result.equities[0].getEquity()}%`);
      console.log(`Player #2 - ${player2} - ${result.equities[1].getEquity()}%`);
      this.setState({player1ev: result.equities[0].getEquity() + '%', player2ev : result.equities[1].getEquity() + '%'})
      console.log(result.equities[1].getTiePercentage());
  }
  render() {
      let selectClass = "cards__select";
      selectClass += this.state.active ? "active" : "";

      let selectPlayer1FirstCard = <select  onChange={this.selectPlayerFirstCard} className={selectClass}>
          {
              this.state.cards.map(card=>{
                      return(
                          <>
                          <option value={card}>{card}</option>
                          </>
                      )
                  }
              )
          }
      </select>;
      let selectPlayer1SecondCard = <select  onChange={this.selectPlayerSecondCard}  className={selectClass}>
          {
              this.state.cards.map(card=>{
                      return(
                          <>
                              <option value={card}>{card}</option>
                          </>
                      )
                  }
              )
          }
      </select>
      let selectPlayer2FirstCard = <select onChange={this.selectSecondFirstCard} className={selectClass}>
          {
              this.state.cards.map(card=>{
                      return(
                          <>
                              <option>{card}</option>
                          </>
                      )
                  }
              )
          }
      </select>;
      let selectPlayer2SecondCard = <select onChange={this.selectSecondSecondCard}  className={selectClass}>
          {
              this.state.cards.map(card=>{
                      return(
                          <>
                              <option>{card}</option>
                          </>
                      )
                  }
              )
          }
      </select>
    return(
       <div className='main__container'>
         <p className='title'>Poker calc</p>
              <div className='poker__container'>
                  <div className='data__container'>
                      <label className='data__label'>Player 1</label>
                      <div className='data__mobile'>
                          <div className='cards__wrapper'>
                              <a onClick={this.onOpen} className='cards' href='#'>
                                  {this.state.player1}
                              </a>
                              { this.state.active ? selectPlayer1FirstCard : null }
                              {this.state.active ? selectPlayer1SecondCard : null }
                          </div>
                          {/*<input type='text' onChange={this.onPlayer1} placeholder='Карты первого игрока'/>*/}
                          <label className='data__label ev'>{this.state.player1ev}</label>
                      </div>
                  </div>
                  <div className='data__container' >
                      <label className='data__label'>Player 2</label>
                      <div className='data__mobile'>
                          <div className='cards__wrapper'>
                              <a onClick={this.onOpen} className='cards' href='#'>
                                  {this.state.player2}
                              </a>
                              { this.state.active ? selectPlayer2FirstCard : null }
                              {this.state.active ? selectPlayer2SecondCard : null }
                          </div>
                          {/*<input type='text' onChange={this.onPlayer2} placeholder='Карты второго игрока'/>*/}
                          <label className='data__label ev'>{this.state.player2ev}</label>
                      </div>
                  </div>
                  <div className='data__container'>
                      <label className='data__label'>Board</label>
                      <div className='data__mobile'>
                          <input type='text' onChange={this.onBoardChange} placeholder='Доска'/>
                          <label className='data__label'></label>
                      </div>
                  </div>
                  <button onClick={this.evClick} className='data__ev__button'>EV calc</button>
              </div>
       </div>
    )
  }
}
export default App;
