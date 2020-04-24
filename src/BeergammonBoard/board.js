import React from 'react';
import colors from '../colors';
import './board.css';

import {
   PLAYER_0_POKEY,
   PLAYER_1_POKEY,
   POKEYS,
   PLAYER_0_HOME,
   PLAYER_1_HOME,
   HOMES,
   PLAYER_0_START,
   PLAYER_1_START,
   STARTS,
 } from "beergammon-game/constants";
 

export class Board extends React.Component {

   boardStyle = {
      whiteSpace: "nowrap",
      minWidth: "700px"
   }

   columnStyle = {
      display: "inline-block",
      background: colors["background"]
   };

   rowStyle = {
      position: 'relative',
   }

   homeStyle = {
      width: '50px',
      height: '200px',
      lineHeight: '50px',
      textAlign: 'center',
      backgroundColor: colors['boardDark'],
   };

   pokeyStyle = {
      width: '50px',
      height: '200px',
      lineHeight: '50px',
      textAlign: 'center',
      backgroundColor: colors['boardDark'],
   };

   pointStyle = {
      width: '50px',
      height: '200px',
      lineHeight: '50px',
      textAlign: 'center',
      position: 'relative',
   };

   bottomTriangleDark = {
      backgroundColor: colors['boardLight'],
      clipPath: "polygon(50% 0, 0 100%, 100% 100%)"
   };

   bottomTriangleLight = {
      backgroundColor: colors['boardDark'],
      clipPath: "polygon(50% 0, 0 100%, 100% 100%)"
   }

   topTriangleDark = {
      backgroundColor: colors['boardLight'],
      clipPath: "polygon(50% 100%, 0 0, 100% 0)"
   };

   topTriangleLight = {
      backgroundColor: colors['boardDark'],
      clipPath: "polygon(50% 100%, 0 0, 100% 0)",
   };

   bottomPointLight = {...this.pointStyle,...this.bottomTriangleLight};
   bottomPointDark = {...this.pointStyle,...this.bottomTriangleDark};
   topPointLight = {...this.pointStyle,...this.topTriangleLight};
   topPointDark = {...this.pointStyle,...this.topTriangleDark};

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
      top: "0px",
   }

   bottomPointPiecePosition = {
      top: "160px",
   }

   homePokeyPiecePosition = {
      top: "80px"
   }

   blackPiece = {
      background: colors["0"],
      color: "white"
   }

   whitePiece = {
      background: colors["1"],
      color: "white",
   }

   blackPiece = {...this.piece,...this.blackPiece};
   whitePiece = {...this.piece,...this.whitePiece};

   pieces = [
      {...this.piece,...this.blackPiece},
      {...this.piece,...this.whitePiece},
   ]

   onClick(id) {
      if (this.props.G.dice !== null) {
         this.props.moves.clickCell(id);
      }
   }

   getSpotPiece(id) {
      let spot = this.props.G.spots[id]
      if (spot.player >= 0) {
         let pieceStyle = null;
         if (STARTS.includes(id) || HOMES.includes(id) || POKEYS.includes(id)) {
            // Home and Pokey's get the same style.
            pieceStyle = {...this.pieces[spot.player], ...this.homePokeyPiecePosition};
         } else if (id < 13) {
            // Top row points
            pieceStyle = {...this.pieces[spot.player], ...this.topPointPiecePosition};
         } else {
            // Bottom row points
            pieceStyle = {...this.pieces[spot.player], ...this.bottomPointPiecePosition};
         }
         return <div style={pieceStyle}>{spot.count}</div>
      }
      return "";
   }

   render() {
      let leftPointsBody = [];
      let rightPointsBody = [];

      let topLeftPoints = [];
      for (let i = 1; i < 7; i++) {
         let pointStyle = i % 2 === 0 ? this.topPointLight : this.topPointDark;
         topLeftPoints.push(
            <div class="divTableCell" style={pointStyle} key={i} onClick={() => this.onClick(i)}>
               {this.getSpotPiece(i)}
            </div>
         );
      }
      leftPointsBody.push(<div class="divTableRow" key="0" style={this.rowStyle}>{topLeftPoints}</div>);

      let topRightPoints = [];
      for (let i = 7; i < 13; i++) {
         let pointStyle = i % 2 === 0 ? this.topPointLight : this.topPointDark;
         topRightPoints.push(
            <div class="divTableCell" style={pointStyle} key={i} onClick={() => this.onClick(i)}>
               {this.getSpotPiece(i)}
            </div>
         );
      }
      rightPointsBody.push(<div class="divTableRow" key="1" style={this.rowStyle}>{topRightPoints}</div>);

      let bottomRightPoints = [];
      for (let i = 18; i > 12; i--) {
         let pointStyle = i % 2 === 0 ? this.bottomPointLight : this.bottomPointDark;
         bottomRightPoints.push(
            <div class="divTableCell" style={pointStyle} key={i} onClick={() => this.onClick(i)}>
               {this.getSpotPiece(i)}
            </div>
         );
      }
      rightPointsBody.push(<div class="divTableRow" key="1" style={this.rowStyle}>{bottomRightPoints}</div>);

      let bottomLeftPoints = [];
      for (let i = 24; i > 18; i--) {
         let pointStyle = i % 2 === 0 ? this.bottomPointLight : this.bottomPointDark;
         bottomLeftPoints.push(
            <div class="divTableCell" style={pointStyle} key={i} onClick={() => this.onClick(i)}>
               {this.getSpotPiece(i)}
            </div>
         );
      }
      leftPointsBody.push(<div class="divTableRow" key="0" style={this.rowStyle}>{bottomLeftPoints}</div>);

      return (
   <React.Fragment>
      <div style={this.boardStyle}>
      <div style={this.columnStyle} class="column">
         <div class="divTable" id="home">
            <div class="divTableBody">
               <div class="divTableRow" key="home0">
                  <div class="divTableCell" style={this.homeStyle} key={PLAYER_0_START} onClick={() => this.onClick(PLAYER_0_START)}>
                     {this.getSpotPiece(PLAYER_0_START)}{this.getSpotPiece(PLAYER_0_HOME)}
                  </div>
               </div>
               <div class="divTableRow" key="home1">
                  <div class="divTableCell" style={this.homeStyle} key={PLAYER_1_START} onClick={() => this.onClick(PLAYER_1_START)}>
                     {this.getSpotPiece(PLAYER_1_START)}{this.getSpotPiece(PLAYER_1_HOME)}
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div style={this.columnStyle} class="column">
         <div class="divTable" id="leftBoard">
            <div class="divTableBody">{leftPointsBody}</div>
         </div>
      </div>
      <div style={this.columnStyle} class="column">
         <div class="divTable" id="pokey">
            <div class="divTableBody">
               <div class="divTableRow" key="pokey0">
                  <div class="divTableCell" style={this.pokeyStyle} key={PLAYER_0_POKEY} onClick={() => this.onClick(PLAYER_0_POKEY)}>
                     {this.getSpotPiece(PLAYER_0_POKEY)}
                  </div>
               </div>
               <div class="divTableRow" key="pokey1">
                  <div class="divTableCell" style={this.pokeyStyle} key={PLAYER_1_POKEY} onClick={() => this.onClick(PLAYER_1_POKEY)}>
                     {this.getSpotPiece(PLAYER_1_POKEY)}
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div style={this.columnStyle} class="column">
         <div class="divTable" id="rightBoard">
            <div class="divTableBody">{rightPointsBody}</div>
         </div>
      </div>
   </div>
</React.Fragment>
      )
   }

}
