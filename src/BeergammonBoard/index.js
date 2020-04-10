import React from 'react';

export class BeergammonBoard extends React.Component {

   // Control Panel
   getControls() {
      let button = null;

      if (this.props.ctx.phase === 'rollForNumbers') {
         button = <button onClick={() =>this.onRollForNumber()}>Roll for Numbers</button>
      } else if (this.props.ctx.phase === 'startGame') {
         button = <button onClick={() =>this.onRollForStart()}>Roll to Start</button>
      } else {
         if (this.props.isActive && this.props.G.dice.every(element => element === null)) {
            button = <button onClick={() => this.onClickRoll()}>Roll Dice</button>
         } else {
            button = <button onClick={() => this.onClickRoll()} disabled>Roll Dice</button>
         }
      }

      let dice = this.props.G.dice.filter(Boolean).join(", ");

      return ( 
         <div>
            {button}:{dice}
         </div>
      )
   }

   // Board

   onRollForNumber() {
      this.props.moves.rollForNumbers();
   }

   onRollForStart () {
      this.props.moves.rollForStart();
   }

   onClickRoll () {
      this.props.moves.rollDice();
   }

   onClick(section, id) {
      if (!this.props.G.dice.every(element => element === null)) {
         this.props.moves.clickCell(section, id);
      }
   }

   pointStyle = {
      width: '50px',
      height: '200px',
      lineHeight: '50px',
      textAlign: 'center',
      position: 'relative',
   };

   bottomTriangleDark = {
      backgroundColor: '#808080',
      clipPath: "polygon(50% 0, 0 100%, 100% 100%)"
   };

   bottomTriangleLight = {
      backgroundColor: '#DCDCDC',
      clipPath: "polygon(50% 0, 0 100%, 100% 100%)"
   }

   topTriangleDark = {
      backgroundColor: '#808080',
      clipPath: "polygon(50% 100%, 0 0, 100% 0)"
   };

   topTriangleLight = {
      backgroundColor: '#DCDCDC',
      clipPath: "polygon(50% 100%, 0 0, 100% 0)"
   };

   bottomPointLight = {...this.pointStyle,...this.bottomTriangleLight};
   bottomPointDark = {...this.pointStyle,...this.bottomTriangleDark};
   topPointLight = {...this.pointStyle,...this.topTriangleLight};
   topPointDark = {...this.pointStyle,...this.topTriangleDark};

   getPointStyle(i,j) {
      if (i === 0) {
         if (j % 2 === 0) {
            return this.topPointLight;
         } else {
            return this.topPointDark;
         }
      } else {
         if (j % 2 === 0) {
            return this.bottomPointDark;
         } else {
            return this.bottomPointLight;
         }
      }
   }

   piece = {
      position: "relative",
      textAlign: "center",
      borderRadius: "50%",
      left: "4px",
      top: "0px",
      width: "40px",
      height: "40px",
      lineHeight: "40px",
   };

   topPointPiecePosition = {
      top: "-80px",
   }

   bottomPointPiecePosition = {
      top: "80px",
   }

   blackPiece = {
      background: "black",
      color: "white",
   }

   whitePiece = {
      background: "white",
      color: "black",
   }

   blackPiece = {...this.piece,...this.blackPiece};
   whitePiece = {...this.piece,...this.whitePiece};

   getPieceStyle(section, row, color) {
      if (section === "points") {
         if (color === "b") {
            if (row === 0) {
               return {...this.blackPiece,...this.topPointPiecePosition};
            } else {
               return {...this.blackPiece, ...this.bottomPointPiecePosition};
            }
         } else if (color === "w") {
            if (row === 0) {
               return {...this.whitePiece, ...this.topPointPiecePosition};
            } else {
               return {...this.whitePiece, ...this.bottomPointPiecePosition};
            }
         } 
      } else if (color === "b") {
         return this.blackPiece;
      } else {
         return this.whitePiece;
      }
      
   }

   getSpotPiece(section, id, row) {
      let sectionArray = [];
      if (section === "points") {
         sectionArray = this.props.G.points;
      } else if (section === "home") {
         sectionArray = this.props.G.home;
      } else if (section === "pokey") {
         sectionArray = this.props.G.pokey;
      }
      let spot = sectionArray[id]
      if (spot) return <div style={this.getPieceStyle(section,row,spot.color)}>{spot.count}</div>
      return "";
   }

   render() {

      let winner = '';
      if (this.props.ctx.gameover) {
         winner = 
            this.props.ctx.gameover.winner !== undefined ? (
               <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
            ) : (
               <div id="winner">Draw!</div>
            );
      }

      const homeStyle = {
         border: '1px solid #555',
         width: '50px',
         height: '200px',
         lineHeight: '50px',
         textAlign: 'center',
         backgroundColor: '#D3D3D3',
      };

      const pokeyStyle = {
         border: '1px solid #555',
         width: '50px',
         height: '50px',
         lineHeight: '50px',
         textAlign: 'center',
         backgroundColor: '#D3D3D3',
      };

      const rowStyle = {
         position: 'relative',
      }

      let leftPointsBody = [];
      let rightPointsBody = [];
      for (let i = 0; i < 2; i++) {
         let leftPoints = [];
         let rightPoints = [];
         for (let j = 0; j < 12; j++) {
            const id = 12 * i + j
            if (j < 6) {
               leftPoints.push(
                  <td style={this.getPointStyle(i,j)} key={id} onClick={() => this.onClick("points", id)}>
                     {this.getSpotPiece("points", id, i)}
                  </td>
               );
            } else {
               rightPoints.push(
                  <td style={this.getPointStyle(i,j)} key={id} onClick={() => this.onClick("points", id)}>
                     {this.getSpotPiece("points", id, i)}
                  </td>
               );
            }
         }
         leftPointsBody.push(<tr key="0" style={rowStyle}>{leftPoints}</tr>);
         rightPointsBody.push(<tr key="1" style={rowStyle}>{rightPoints}</tr>);
      }

      const columnStyle = {
         float: "left"
      };

      let controlPanel = this.getControls();

      let player1Info = <p>Player 1 number: {this.props.G.numbers[0]}</p>
      let player2Info = <p>Player 2 number: {this.props.G.numbers[1]}</p>
      let socials = <p>Socials: {this.props.G.socials.filter(Boolean).join(", ")}</p>


      return (
         <div class="row">
            {controlPanel}
            {player1Info}
            {player2Info}
            {socials}
            <div style={columnStyle} class="column">
               <table id="home">
                  <tbody>
                     <tr key="home0">
                        <td style={homeStyle} key="0" onClick={() => this.onClick("home", 0)}>
                           {this.getSpotPiece("home", 0, 0)}
                        </td>
                     </tr>
                     <tr key="home1">
                        <td style={homeStyle} key="1" onClick={() => this.onClick("home", 1)}>
                           {this.getSpotPiece("home", 1, 1)}
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div style={columnStyle} class="column">
               <table id="leftBoard">
                  <tbody>{leftPointsBody}</tbody>
               </table>
            </div>
            <div style={columnStyle} class="column">
               <table id="pokey">
                  <tbody>
                     <tr key="pokey0">
                        <td style={pokeyStyle} key="0" onClick={() => this.onClick("pokey", 0)}>
                           {this.getSpotPiece("pokey", 0, 0)}
                        </td>
                     </tr>
                     <tr key="pokey1">
                        <td style={pokeyStyle} key="1" onClick={() => this.onClick("pokey", 1)}>
                           {this.getSpotPiece("pokey", 1, 1)}
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div style={columnStyle} class="column">
               <table id="rightBoard">
                  <tbody>{rightPointsBody}</tbody>
               </table>
            </div>

            {winner}
         </div>
      )
   }
}