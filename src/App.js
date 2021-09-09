import React from 'react';
import './styles.css';
import {CardGroup, OddsCalculator} from 'poker-odds-calculator';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        player1 : '', player2 : '', board : '', player1ev : '', player2ev : '',
        // firstPlayerCardImage : '',
        // secondCardPlayerFirstImage: '',
        // firstCardSecondPlayerImage:'',
        // secondCardSecondPlayerImage:'',
        // secondCardImage : '',
        firstPlayerCardsSelect : [],
        secondPlayerCardsSelect: [],
        boardCards:[],
        firstPlayerCardsSecondCard : false,
        firstPlayerCards : false,
        secondPlayerCards : false,
        secondPlayerCardsSecondCard : false,
        boardOpen : false,
        cards : ['As','Ac','Ah','Ad',
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
    this.state.firstPlayerCardsSelect.push({ title : regx, src : event.target.src })
    this.setState({ firstPlayerCardsSelect : this.state.firstPlayerCardsSelect, player1 : this.state.player1 + regx  })
    console.log(this.state.player1)
  }
  onSecondPlayerCardSelect(event) {
    this.state.secondPlayerCardsSelect.push({ title : event.target.title, src : event.target.src })
    this.setState({ secondPlayerCardsSelect : this.state.secondPlayerCardsSelect, player2 : this.state.player2 + event.target.title  })
    console.log(this.state.player2)
  }
  // onFirstPlayerCardSelect(event) {
  //     if(event.target.title.includes('0') && this.state.player1.length < 4) {
  //         this.setState({player1: this.state.player1 + event.target.title.replace(/0/gi, 'T'), firstPlayerCardImage:event.target.src});
  //     } else {
  //         console.log(event.target.src)
  //         if(this.state.player1.length === 0) {
  //            this.setState({firstPlayerCards : true, firstPlayerCardImage : event.target.src});
  //         }
  //         if (this.state.player1.length === 2) {
  //             this.setState({activeFirstHand: false, firstPlayerCardsSecondCard : true, secondCardPlayerFirstImage : event.target.src  });
  //         }
  //         if (this.state.player1.length < 4) {
  //             this.setState({player1: this.state.player1 + event.target.title});
  //         } else this.setState({activeFirstHand: false});
  //     }
  //     this.setState({firstPlayerCards : true})
  //     // this.setState({firstPlayerCardImage : event.target.src})
  // }
  // onSecondPlayerCardSelect(event) {
  //     if(event.target.title.includes('0') && this.state.player2.length < 4) {
  //         this.setState({player2:  event.target.title.replace(/0/gi, 'T'), firstCardSecondPlayerImage : event.target.src});
  //         console.log(this.state.firstCardSecondPlayerImage)
  //     } else {
  //         if(this.state.player2.length === 0) {
  //             this.setState({secondPlayerCards : true, firstCardSecondPlayerImage : event.target.src})
  //         }
  //         if (this.state.player2.length === 2) {
  //             this.setState({activeSecondHand: false, secondPlayerCardsSecondCard : true, secondCardSecondPlayerImage : event.target.src});
  //         }
  //         if (this.state.player2.length < 4) {
  //             this.setState({player2: this.state.player2 + event.target.title});
  //         } else this.setState({activeSecondHand: false});
  //     }
  // }
  onBoardCards(event) {
      this.state.boardCards.push({title : event.target.title , src : event.target.src});
      // this.setState({ boardCards :  {title : event.target.title, src : event.target.src }});
      this.setState({boardCards : this.state.boardCards})
      console.log(this.state.boardCards);
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
                      <img onClick={this.onBoardCards} className='cards__style'   title={api.code} key={idx} src={api.image}/>
                  )
              })
          }
      </div>

      let selectPlayer1FirstCard = <div  className='cards__list'>
          {
              this.state.cardsArr.map((api,idx)=>{
                  return(
                      <img className='cards__style'  onClick={this.onFirstPlayerCardSelect}  title={api.code} key={idx} src={api.image}/>
                  )
              })
          }
      </div>;
      let selectPlayer2FirstCard = <div className='cards__list'>
          {
              this.state.cardsArr.map((api,idx)=>{
                      return(
                          <img className='cards__style'  onClick={this.onSecondPlayerCardSelect}   title={api.code} key={idx} src={api.image}/>
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
                                              <img className='card__ico' title={cards.title} key={idx} src={cards.src} />
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
                                      this.state.secondPlayerCardsSelect.map(cards=>{
                                          return(
                                              <>
                                                  {cards.title}
                                                  <img className='card__ico' title={cards.title} src={cards.src} />
                                              </>
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
                                          <img key={idx}  className='card__ico' title={cards.title}  src={cards.src} />
                                      )
                                  })
                              }
                          </button>
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
               <div>
                   { this.state.boardOpen ? board : null }
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
