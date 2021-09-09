import React from 'react';
import './styles.css';
import {CardGroup, OddsCalculator} from 'poker-odds-calculator';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        player1 : '', player2 : '', board : '', player1ev : '', player2ev : '',
        firstPlayerCardsSelect : [],
        secondPlayerCardsSelect: [],
        boardCards:[],
        firstPlayerCardsSecondCard : false,
        firstPlayerCards : false,
        secondPlayerCards : false,
        secondPlayerCardsSecondCard : false,
        boardOpen : false,
        activeFirstHand : false,
        activeSecondHand : false,
        cardsAPI: '',
        cardsArr:[],
        deck:''
    };
    this.onBoardChange = this.onBoardChange.bind(this);
    this.evClick = this.evClick.bind(this);
    this.onOpenFirstHand = this.onOpenFirstHand.bind(this);
    this.onOpenSecondHand = this.onOpenSecondHand.bind(this);
    this.onSecondPlayerCardSelect = this.onSecondPlayerCardSelect.bind(this);
    this.onFirstPlayerCardSelect = this.onFirstPlayerCardSelect.bind(this);
    this.onBoardCards = this.onBoardCards.bind(this);
    this.onTest = this.onTest.bind(this);
  }
  componentDidMount() {
      const _DECK = 'https://deckofcardsapi.com/api/deck/new/';
      fetch( _DECK )
          .then(response => response.json())
          .then(data => {
              this.setState({deck : data.deck_id});
              const _URL = `https://deckofcardsapi.com/api/deck/${this.state.deck}/draw/?count=52`
              fetch(_URL)
                  .then(response => response.json())
                  .then(data=>{
                      console.log(data);
                      this.setState({cardsAPI : data});
                      console.log(data.cards);
                      this.setState({cardsArr: data.cards });
                  })
          })
  }

  onBoardChange(event) {
      this.setState({ boardOpen: true });
  }
  onOpenFirstHand() {
      this.setState({activeFirstHand : true});
  }
  onOpenSecondHand() {
      this.setState({activeSecondHand : true});
  }
  onFirstPlayerCardSelect(event) {
    const regx = event.target.title.replace(/0/g,'T');
    // if( this.state.firstPlayerCardsSelect.length < 2 ) {
        this.state.firstPlayerCardsSelect.push({ title : regx, src : event.target.src });
        this.setState({ firstPlayerCardsSelect : this.state.firstPlayerCardsSelect, player1 : this.state.player1 + regx  });
        console.log(this.state.player1);
    // } else this.setState({ activeFirstHand : false });
  }
  onSecondPlayerCardSelect(event) {
    const regx = event.target.title.replace(/0/g,'T');
    this.state.secondPlayerCardsSelect.push({ title : event.target.title, src : event.target.src });
    this.setState({ secondPlayerCardsSelect : this.state.secondPlayerCardsSelect, player2 : this.state.player2 + regx });
    console.log(this.state.player2);
  }

  onBoardCards(event) {
      const regx = event.target.title.replace(/0/g,'T');
      this.state.boardCards.push({title : event.target.title , src : event.target.src});
      this.setState({boardCards : this.state.boardCards, board : this.state.board + regx });
      console.log(this.state.board);
  }
  onTest(event) {
      console.log(event.target.title)
  }
  evClick() {
      const player1 = CardGroup.fromString(this.state.player1);
      const player2 = CardGroup.fromString(this.state.player2);
      const board = CardGroup.fromString(this.state.board);

      const result = OddsCalculator.calculate([player1,player2], board);

      console.log(`Player #1 - ${player1} - ${result.equities[0].getEquity()}%`);
      console.log(`Player #2 - ${player2} - ${result.equities[1].getEquity()}%`);
      this.setState({player1ev: result.equities[0].getEquity() + '%', player2ev : result.equities[1].getEquity() + '%'});
      console.log(result.equities[1].getTiePercentage());
  }
  render() {

      // let selectClass = "cards__select";
      // selectClass += this.state.active ? " active" : "";

      let board = <div className='cards__list'>
          {
              this.state.cardsArr.map((api,idx)=>{
                  return(
                      <img onClick={this.onBoardCards} className='cards__style' alt={api.code}   title={api.code} key={idx} src={api.image}/>
                  )
              })
          }
      </div>

      let selectPlayer1FirstCard = <div  className='cards__list'>
          {
              this.state.cardsArr.map((api,idx)=>{
                  return(
                      <img className='cards__style'  onClick={this.onFirstPlayerCardSelect} alt={api.code}  title={api.code} key={idx} src={api.image}/>
                  )
              })
          }
      </div>;
      let selectPlayer2FirstCard = <div className='cards__list'>
          {
              this.state.cardsArr.map((api,idx)=>{
                      return(
                          <img className='cards__style'  onClick={this.onSecondPlayerCardSelect}  alt={api.code} title={api.code} key={idx} src={api.image}/>
                      )
                  }
              )
          }
      </div>;

    return(
       <div className='main__container'>
         <p className='title'>Poker calc</p>
           <div className='poker__wrapper'>
              <div className='poker__container'>
                  <div className='data__container'>
                      <label className='data__label'>Player 1</label>
                      <div className='data__mobile'>
                          <div className='cards__wrapper'>
                              <button onClick={this.onOpenFirstHand} className='cards' >
                                  {
                                      this.state.firstPlayerCardsSelect.map((cards,idx)=>{
                                          return(
                                              <img className='card__ico' title={cards.title} alt={cards.title} key={idx} src={cards.src} />
                                          )
                                      })
                                  }
                              </button>
                          </div>
                          <label className='data__label ev'>{this.state.player1ev}</label>
                      </div>
                  </div>
                  <div className='data__container' >
                      <label className='data__label'>Player 2</label>
                      <div className='data__mobile'>
                          <div className='cards__wrapper'>
                              <button onClick={this.onOpenSecondHand} className='cards' >
                                  {
                                      this.state.secondPlayerCardsSelect.map((cards,idx)=>{
                                          return(
                                              <img className='card__ico' key={idx} title={cards.title} alt={cards.title} src={cards.src} />
                                          )
                                      })
                                  }
                              </button>
                          </div>
                          <label className='data__label ev'>{this.state.player2ev}</label>
                      </div>
                  </div>
                  <div className='data__container'>
                      <label className='data__label'>Board</label>
                      <div className='data__mobile'>
                          <button  onClick={this.onBoardChange} className='cards' >
                              {
                                  this.state.boardCards.map((cards,idx)=>{
                                      return(
                                          <img key={idx}  className='card__ico' title={cards.title} alt={cards.title}  src={cards.src} />
                                      )
                                  })
                              }
                          </button>
                          <label className='data__label'></label>
                      </div>
                  </div>
              </div>
              <div>
                  {
                      // this.state.firstPlayerCardsSelect.length === 2 && this.state.activeFirstHand === true ? selectPlayer1FirstCard : null
                  }
                  {
                      this.state.activeFirstHand && this.state.player1.length <=2 ? selectPlayer1FirstCard : null
                  }
              </div>
              <div>
                  { this.state.activeSecondHand && this.state.player2.length <= 2 ? selectPlayer2FirstCard : null }
              </div>
               <div>
                   { this.state.boardOpen && this.state.board.length <= 9 ? board : null }
               </div>
           </div>
           <div className='button__ev'>
                <button onClick={this.evClick} className='data__ev__button'>EV calc</button>
           </div>
       </div>
    )
  }
}
export default App;
