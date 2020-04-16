import React from 'react';
import colors from '../colors';
import './board.css';

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
         return {...this.blackPiece, ...this.homePokeyPiecePosition};
      } else {
         return {...this.whitePiece, ...this.homePokeyPiecePosition};
      }
   }

   onClick(section, id) {
      if (this.props.G.dice !== null) {
         this.props.moves.clickCell(section, id);
      }
   }

   render() {
      let leftPointsBody = [];
      let rightPointsBody = [];
      for (let i = 0; i < 2; i++) {
         let leftPoints = [];
         let rightPoints = [];
         for (let j = 0; j < 12; j++) {
            const id = 12 * i + j
            if (j < 6) {
               leftPoints.push(
                  <div class="divTableCell" style={this.getPointStyle(i,j)} key={id} onClick={() => this.onClick("points", id)}>
                     {this.getSpotPiece("points", id, i)}
                  </div>
               );
            } else {
               rightPoints.push(
                  <div class="divTableCell" style={this.getPointStyle(i,j)} key={id} onClick={() => this.onClick("points", id)}>
                     {this.getSpotPiece("points", id, i)}
                  </div>
               );
            }
         }
         leftPointsBody.push(<div class="divTableRow" key="0" style={this.rowStyle}>{leftPoints}</div>);
         rightPointsBody.push(<div class="divTableRow" key="1" style={this.rowStyle}>{rightPoints}</div>);
      }

      return (
   <React.Fragment>
      <div style={this.boardStyle}>
      <div style={this.columnStyle} class="column">
         <div class="divTable" id="home">
            <div class="divTableBody">
               <div class="divTableRow" key="home0">
                  <div class="divTableCell" style={this.homeStyle} key="0" onClick={() => this.onClick("home", 0)}>
                     {this.getSpotPiece("home", 0, 0)}
                  </div>
               </div>
               <div class="divTableRow" key="home1">
                  <div class="divTableCell" style={this.homeStyle} key="1" onClick={() => this.onClick("home", 1)}>
                     {this.getSpotPiece("home", 1, 1)}
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
                  <div class="divTableCell" style={this.pokeyStyle} key="0" onClick={() => this.onClick("pokey", 0)}>
                     {this.getSpotPiece("pokey", 0, 0)}
                  </div>
               </div>
               <div class="divTableRow" key="pokey1">
                  <div class="divTableCell" style={this.pokeyStyle} key="1" onClick={() => this.onClick("pokey", 1)}>
                     {this.getSpotPiece("pokey", 1, 1)}
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
