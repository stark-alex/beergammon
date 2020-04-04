import React from 'react';

export class BeergammonBoard extends React.Component {
   onClickRoll () {
      this.props.moves.rollDice();
   }

   onClick(section, id) {
      if (!this.props.G.dice.every(element => element === null)) {
         this.props.moves.clickCell(section, id);
      }
   }

   pointStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '200px',
      lineHeight: '50px',
      textAlign: 'center',
      position: 'relative',
   };

   bottomTriangle = {
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '0 25px 200px 25px',
      borderColor: 'transparent transparent #DCDCDC transparent',
   };

   bottomTriangleDark = {
      borderColor: 'transparent transparent #808080 transparent',
   }

   topTriangle = {
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '200px 25px 0 25px',
      borderColor: '#DCDCDC transparent transparent transparent',
   };

   topTriangleDark = {
      borderColor: '#808080 transparent transparent transparent',
   };

   bottomPointLight = {...this.pointStyle,...this.bottomTriangle};
   bottomPointDark = {...this.bottomPointLight,...this.bottomTriangleDark};
   topPointLight = {...this.pointStyle,...this.topTriangle};
   topPointDark = {...this.topPointLight,...this.topTriangleDark};

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
      position: "absolute",
      textAlign: "center",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      lineHeight: "40px",
   };

   topPointPiecePosition = {
      left: "-19px",
      top: "-198px",
   }

   bottomPointPiecePosition = {
      left: "-19px",
      top: "160px",
   }

   blackPiece = {
      background: "black",
      color: "white",
   }

   whitePiece = {
      background: "white",
      color: "black",
   }

   blackHomePiecePosition = {
      left: "7px",
      top: "245px",
      background: "black",
      color: "white",
   }

   whiteHomePiecePosition = {
      left: "7px",
      top: "440px",
      background: "white",
      color: "black",
   }

   blackPokeyPiecePosition = {
      left: "393px",
      top: "159px",
      background: "black",
      color: "white",
   }

   whitePokeyPiecePosition = {
      left: "393px",
      top: "213px",
      background: "white",
      color: "black",
   }

   pieceTopRow = {...this.piece,...this.topPointPiecePosition};
   pieceBottomRow = {...this.piece,...this.bottomPointPiecePosition};
   pieceHome = {...this.piece,...this.homePiecePosition};

   getPieceStyle(section, row, color) {
      if (section === "points") {
         if (color === "b") {
            if (row === 0) {
               return {...this.pieceTopRow, ...this.blackPiece};
            } else {
               return {...this.pieceBottomRow, ...this.blackPiece};
            }
         } else if (color === "w") {
            if (row === 0) {
               return {...this.pieceTopRow, ...this.whitePiece};
            } else {
               return {...this.pieceBottomRow, ...this.whitePiece};
            }
         } else {
            return  this.piece;
         }
      } else if (section === "home") {
         if (color === "b") {
            return {...this.piece,...this.blackHomePiecePosition};
         } else if (color === "w") {
            return {...this.piece,...this.whiteHomePiecePosition};
         }
      } else if (section === "pokey") {
         if (color === "b") {
            return {...this.piece,...this.blackPokeyPiecePosition};
         } else if (color === "w") {
            return {...this.piece,...this.whitePokeyPiecePosition};
         }
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

      let rollButton = null
      if (this.props.G.dice.every(element => element === null)) {
         rollButton = <button onClick={() => this.onClickRoll()}>Roll Dice</button>
      } else {
         rollButton = <button onClick={() => this.onClickRoll()} disabled>Roll Dice</button>
      }
      let dice = this.props.G.dice.filter(Boolean).join(", ");

      const columnStyle = {
         float: "left"
      };

      return (
         <div class="row">
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

            {rollButton}: {dice}
            {winner}
         </div>
      )
   }
}