import React from 'react';
import './styles.css';
import {CardGroup, OddsCalculator} from 'poker-odds-calculator';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        player1 : '', player2 : '', board : '', player1ev : '', player2ev : '',
        firstPlayerCardImage : '',
        secondCardPlayerFirstImage: '',
        secondCardImage : '',
        firstPlayerCardsSecondCard : false,
        firstPlayerCards: false,
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
    this.onTest = this.onTest.bind(this);
  }
  componentDidMount() {
      const _DECK = 'https://deckofcardsapi.com/api/deck/new/';
      fetch( _DECK )
          .then(response => response.json())
          .then(data => {
              this.setState({deck : data.deck_id})
              const _URL = `https://deckofcardsapi.com/api/deck/${this.state.deck}/draw/?count=52`
              fetch(_URL)
                  .then(response => response.json())
                  .then(data=>{
                      console.log(data)
                      this.setState({cardsAPI : data})
                      console.log(data.cards)
                      this.setState({cardsArr: data.cards })
                  })
          })
      // const _URL = `https://deckofcardsapi.com/api/deck/${this.state.deck}/draw/?count=52`
      // fetch(_URL)
      //     .then(response => response.json())
      //     .then(data=>{
      //         console.log(data)
      //         this.setState({cardsAPI : data})
      //     })
      // console.log(this.state.cardsAPI)


      // const imgUrl = 'https://deckofcardsapi.com/static/img/KH.png';
      // fetch(imgUrl)
      //     .then(response => response.blob())
      //     .then(imageBlob => {
      //         // Then create a local URL for that image and print it
      //         const imageObjectURL = URL.createObjectURL(imageBlob);
      //         console.log(imageObjectURL);
      //         this.setState({imgt : imageObjectURL})
      //     });
  }

    onBoardChange(event) {
      this.setState({ board: event.target.value });
  }
  onOpenFirstHand() {
      this.setState({activeFirstHand : true});
  }
  onOpenSecondHand() {
      this.setState({activeSecondHand : true});
  }
  onFirstPlayerCardSelect(event) {
      if(event.target.title.includes('0') && this.state.player1.length < 4) {
          this.setState({player1: this.state.player1 + event.target.title.replace(/0/gi, 'T')});
      } else {
          if(this.state.player1.length === 0) {
             this.setState({firstPlayerCards : true})
             this.setState({firstPlayerCardImage : event.target.src})
          }
          // if(this.state.player1.length === 2) {
          //     this.setState({secondPlayerCardImage : event.target.src})
          // }
          if (this.state.player1.length === 2) {
              this.setState({activeFirstHand: false, firstPlayerCardsSecondCard : true, secondCardPlayerFirstImage : event.target.src  });
          }
          if (this.state.player1.length < 4) {
              this.setState({player1: this.state.player1 + event.target.title});
          } else this.setState({activeFirstHand: false});
      }
      this.setState({firstPlayerCards : true})
      // this.setState({firstPlayerCardImage : event.target.src})
  }
  onSecondPlayerCardSelect(event) {
      if(event.target.title.includes('0') && this.state.player2.length < 4) {
          this.setState({player2: this.state.player2 + event.target.title.replace(/0/gi, 'T')});
      } else {

          if (this.state.player2.length === 2) {
              this.setState({activeSecondHand: false});
          }
          if (this.state.player2.length < 4) {
              this.setState({player2: this.state.player2 + event.target.title});
          } else this.setState({activeSecondHand: false});
      }
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

      let selectPlayer1FirstCard = <div  className='cards__list'>
          {
              this.state.cardsArr.map(api=>{
                  return(
                      <img className='cards__style'  onClick={this.onFirstPlayerCardSelect} title={api.code} key={api.code} src={api.image}/>
                  )
              })
          }
      </div>;
      let selectPlayer2FirstCard = <div className='cards__list'>
          {
              this.state.cardsArr.map(api=>{
                      return(
                          <>
                              <img className='cards__style'  onClick={this.onSecondPlayerCardSelect} title={api.code} key={api.code} src={api.image}/>
                          </>
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
                                  {this.state.player1}
                                  {this.state.firstPlayerCards ? <img className='card__ico' src={this.state.firstPlayerCardImage} /> : null}
                                  {this.state.firstPlayerCardsSecondCard ? <img className='card__ico' src={this.state.secondCardPlayerFirstImage} /> : null}
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
                                  <img />
                                  { this.state.player2 }
                              </button>
                          </div>
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
              </div>
              <div>
                  { this.state.activeFirstHand ? selectPlayer1FirstCard : null }
              </div>
              <div>
                  { this.state.activeSecondHand ? selectPlayer2FirstCard : null }
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
